import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 400,
  height: 300,
  facingMode: 'user',
};

const UploadFaceData = () => {
  const webcamRef = useRef(null);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    RollNo: '',
    Department: '',
    Email: '',
    Section: '',
    Year: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setStatus('Image Captured! Now click Final Submit.');
    } else {
      setStatus('Unable to capture image.');
    }
  };

  const handleFinalSubmit = async () => {
    if (!capturedImage) {
      setStatus('Please capture an image first.');
      return;
    }

    // Check if all fields are filled
    const allFilled = Object.values(formData).every(val => val.trim() !== '');
    if (!allFilled) {
      setStatus('Please fill all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/Student/registerstudent', {
        ...formData,
        image: capturedImage,
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
        setStatus('Face data and details uploaded successfully!');
        setCapturedImage(null);
      } else {
        setStatus('Failed to process data.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-4">
          <h4 className="mb-4">Student Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/student">Dashboard</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/student/uploaddata">Upload Data</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/student/Viewattendance">Attendance History</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#settings">Settings</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-5">
          <div className="card shadow-lg rounded" style={{ backgroundColor: 'white' }}>
            <div className="card-body">
              <h3 className="text-center mb-4 text-primary">Upload Student Data</h3>
              <div className="row">
                <div className="col-md-6 text-center">

                  {/* Webcam Frame with Colorful Border */}
                  <div style={{
                    border: '5px solid',
                    borderImageSlice: 1,
                    borderWidth: '5px',
                    borderImageSource: 'linear-gradient(45deg, #00f2fe, #4facfe)',
                    borderRadius: '20px',
                    width: '400px',
                    height: '300px',
                    margin: '0 auto 20px',
                  }}>
                    {capturedImage ? (
                      <img
                        src={capturedImage}
                        alt="Captured"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  {/* Buttons */}
                  {!capturedImage ? (
                    <button
                      onClick={captureImage}
                      className="btn btn-outline-primary mt-2"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Capture Photo'}
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalSubmit}
                      className="btn btn-success mt-2"
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Final Submit'}
                    </button>
                  )}
                  {status && <p className="mt-2 text-info">{status}</p>}
                </div>

                {/* Form Section */}
                <div className="col-md-6">
                  <form className="p-3">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" name="userId" onChange={handleChange} />
                      <label>User ID</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" name="name" onChange={handleChange} />
                      <label>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" name="RollNo" onChange={handleChange} />
                      <label>Roll No</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" name="Department" onChange={handleChange} />
                      <label>Department</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" name="Email" onChange={handleChange} />
                      <label>Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" name="Section" onChange={handleChange} />
                      <label>Section</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" name="Year" onChange={handleChange} />
                      <label>Year</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadFaceData;
