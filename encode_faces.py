from flask import Flask, request , jsonify
from flask_cors import CORS
import face_recognition
import numpy as np
import base64
from pymongo import MongoClient
import mediapipe as mp
import io
from PIL import Image
import cv2

app = Flask(__name__)
CORS(app)

mp_face_mesh = mp.solutions.face_mesh

#mongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["FaceTrackDB"]
students_collection = db["students"]
teachers_collection = db["teachers"]

@app.route('/upload-face', methods=['POST'])
def upload_face():
    try:
        data = request.get_json()
        image_data = data['image']
        image_bytes = base64.b64decode(image_data.split(',')[1])
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Encode face using face_recognition
        face_locations = face_recognition.face_locations(rgb_img)
        face_encodings = face_recognition.face_encodings(rgb_img, face_locations)

        if not face_encodings:
            return jsonify({'success': False, 'message': 'No face detected'}), 400

        # Get MediaPipe landmarks
        with mp_face_mesh.FaceMesh(static_image_mode=True) as face_mesh:
            results = face_mesh.process(rgb_img)
            if not results.multi_face_landmarks:
                return jsonify({'success': False, 'message': 'No face landmarks found'}), 400

            landmarks = results.multi_face_landmarks[0]
            face_mesh_vector = [
                [float(lm.x), float(lm.y), float(lm.z)] for lm in landmarks.landmark
            ]

        return jsonify({
            'success': True,
            'encodings': face_encodings[0].tolist(),
            'faceMeshVector': face_mesh_vector
        })

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'error': str(e)}), 500

# def decode_image(image_base64):
#     img_data = base64.b64decode(image_base64.split(',')[1])
#     np_arr = np.frombuffer(img_data, np.uint8)
#     img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
#     return img

# @app.route('/encode', methods=['POST'])
# def encode_faces():
#     try:
#         data = request.get_json()
#         encodings = []

#         for key in ['front', 'left', 'right']:
#             image = decode_image(data[key])
#             face_enc = face_recognition.face_encodings(image)
#             if face_enc:
#                 encodings.append(face_enc[0].tolist())

#         return jsonify({ 'encodings': encodings })
#     except Exception as e:
#         return jsonify({ 'error': str(e) }), 500


def decode_base64_image(base64_string):
    # Remove the header if present
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    image_data = base64.b64decode(base64_string)
    np_arr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return image



# facelogin 
def get_all_encodings():
    users = []

     #Load from both students and teacher
    for user in students_collection.find():
        if user.get("encodings") and len(user["encodings"]) > 0:
            users.append({
            "role": "student",
            "id": user["userId"],
            "name": user["name"],
            "encoding": np.array(user["encodings"][0]),
            "faceMeshVector": user.get("faceMeshVector")
        })

    for user in teachers_collection.find():
        if user.get("encodings") and len(user["encodings"]) > 0:
            users.append({
            "role": "teacher",
            "id": user["userId"],
            "name": user["name"],
            "encoding": np.array(user["encodings"][0]),
            "faceMeshVector": user.get("faceMeshVector")
        })

    return users

@app.route('/verify-face', methods=['POST'])
def verify_face():
    data = request.get_json()

    if 'image' not in data:
        return jsonify({"error": "Image not provided"}), 400

    image_data = data['image']
    image_data = image_data.split(',')[-1]  # Remove base64 prefix if present
    image_bytes = base64.b64decode(image_data)
  ## Convert toPIL and then to numpy array
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    np_image = np.array(image)

    uploaded_encodings = face_recognition.face_encodings(np_image)

    if not uploaded_encodings:
        return jsonify({"error": "No face detected"}), 400

    uploaded_encoding = uploaded_encodings[0]

    # Get faceMeshVector for uploaded image
    rgb_img = cv2.cvtColor(np_image, cv2.COLOR_RGB2BGR)
    with mp.solutions.face_mesh.FaceMesh(static_image_mode=True) as face_mesh:
        results = face_mesh.process(np_image)
        if not results.multi_face_landmarks:
            return jsonify({"error": "No face landmarks found"}), 400

        landmarks = results.multi_face_landmarks[0]
        uploaded_vector = np.array([[lm.x, lm.y, lm.z] for lm in landmarks.landmark])

    known_users = get_all_encodings()
    known_encodings = [user["encoding"] for user in known_users]

    matches = face_recognition.compare_faces(known_encodings, uploaded_encoding)
    face_distances = face_recognition.face_distance(known_encodings, uploaded_encoding)

    if True in matches:
        best_match_index = np.argmin(face_distances)
        matched_user = known_users[best_match_index]
        return jsonify({
            "matched": True,
            "id": matched_user["id"],
            "role": matched_user["role"],
            "name": matched_user["name"]
        })

    # Fallback using faceMeshVector
    def mesh_distance(vec1, vec2):
        return np.mean(np.linalg.norm(np.array(vec1) - np.array(vec2), axis=1))

    best_distance = float('inf')
    best_user = None
    for user in known_users:
        if user["faceMeshVector"]:
            distance = mesh_distance(uploaded_vector, user["faceMeshVector"])
            if distance < best_distance:
                best_distance = distance
                best_user = user

    if best_user and best_distance < 0.03:  # Threshold can be tuned
        return jsonify({
            "matched": True,
            "id": best_user["id"],
            "role": best_user["role"],
            "name": best_user["name"]
        })

    return jsonify({"matched": False}), 404



@app.route('/mark-attendance', methods=['POST'])
def mark_attendance():
    data = request.get_json()
    image_data = data['image']
    image = decode_base64_image(image_data)
    rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    unknown_encodings = face_recognition.face_encodings(rgb_img)
    students = list(students_collection.find())
    present_students = []

    def mesh_distance(vec1, vec2):
        return np.mean(np.linalg.norm(np.array(vec1) - np.array(vec2), axis=1))

    # Get face mesh vector for the whole image
    with mp.solutions.face_mesh.FaceMesh(static_image_mode=True) as face_mesh:
        results = face_mesh.process(rgb_img)
        mesh_vectors = []
        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                mesh_vectors.append([[lm.x, lm.y, lm.z] for lm in face_landmarks.landmark])

    for i, unknown_encoding in enumerate(unknown_encodings):
        for student in students:
            for known_encoding in student['encodings']:
                known_encoding = np.array(known_encoding)
                if face_recognition.compare_faces([known_encoding], unknown_encoding)[0]:
                    present_students.append({
                        'name': student['name'],
                        'rollNo': student['RollNo']
                    })
                    break

    # If no one matched by encoding, try mesh vector fallback
    if not present_students and mesh_vectors:
        for mesh_vector in mesh_vectors:
            for student in students:
                if 'faceMeshVector' in student:
                    dist = mesh_distance(mesh_vector, student['faceMeshVector'])
                    if dist < 0.03:
                        present_students.append({
                            'name': student['name'],
                            'rollNo': student['RollNo']
                        })
                        break

    return jsonify({ 'success': True, 'presentStudents': present_students })

if __name__ == '__main__':
    app.run(port=5000)
