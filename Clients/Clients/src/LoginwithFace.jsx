import React, { useRef ,useState  } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam"
import axios from "axios"

export default function LoginWithFace(){
    const webcamRef = useRef(null);
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
  
    const captureAndLogin = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setStatus('Detecting...');
  
      try {
        const response = await axios.post('http://localhost:5000/auth/login-face', {
          image: imageSrc
        },{
          headers:{
            'Content-Type': 'application/json',
          },withCredentials:true
        });
  
        if (response.data.success) {
          setStatus(`Welcome, ${response.data.user.name}`);
          console.log(response.data.user)
          if( response.data.user.role === "student"){
            navigate('/student');
          }else{
            navigate('/teacher');
          }
        } else {
          setStatus('Face not recognized. Please try again.');
        }
      } catch (err) {
        setStatus('Error during face login');
        }
      }

    return (
        <div className="container mt-4">
            <h2>Login With Face</h2>
            <Webcam
             ref={webcamRef}
             audio={false}
             screenshotFormat="image/jpej"
             width={480}
             height={360}
            />
            <button className="btn btn-primary mt-3" onClick={captureAndLogin}>Login</button>
            <p className="mt-2">{status}</p>
        </div>
    );
};



