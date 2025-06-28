import React , { useRef , useState} from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { FaUser, FaSignOutAlt, FaLock, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from "../ContextAuth";


const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: 'user',
};

const UploadFaceDataTeacher = () => {
    const webcamRef = useRef(null);
      const [formData, setFormData] = useState({
        userId: '',
        name: '',
        Department: '',
        Email: '',
        Subject: '',
      });
      const [status, setStatus] = useState('');
      const [loading, setLoading] = useState(false);
      const [capturedImage, setCapturedImage] = useState(null);

      const { user, upcoming } = useAuth();
      
        if (upcoming) return <p>Loading...</p>;

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

    const allFilled = Object.values(formData).every(val => val.trim() !== '');
    if (!allFilled) {
      setStatus('Please fill all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/Teacher/registerteacher', {
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
    <div className="d-flex">

      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: '220px',
          height: '100vh',
          position: 'fixed',
          top: '0',
          left: '0',
          overflowX: 'hidden',
          zIndex: '1000'
        }}
      >
        <h4 className="mb-4">Teacher Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/teacher">Dashboard</Link>
          </li>
          <li>
            <Link className='nav-link text-white' to="/teacher/uploaddata">Upload Data</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/teacher/mark">Mark Attendance</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/teacher/View">View Attendance</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/teacher/settings">Settings</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '220px', width: '100%' }}>
        
        {/* Topbar */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{ background: '#fff', position: 'sticky', top: '0', zIndex: '999' }}>
          
          {/* Title */}
          <h3 className="mb-0">Dashboard</h3>

          {/* Notifications and Profile */}
          <div className="d-flex align-items-center gap-3">
            <FaBell size={20} style={{ cursor: 'pointer' }} />

            {/* Profile Button Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                  width="35"
                  height="35"
                  style={{ borderRadius: '50%' }}
                />
                <span style={{ fontWeight: 'bold' }}>{user?.name || 'Teacher'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="profileDropdown">
                <li className="px-3 py-2 text-center">
                  <FaUser size={20} className="me-2" />
                  <strong>{user?.name}</strong>
                  <p className="small text-muted mb-0">{user?.department || 'Department'}</p>
                  <p className="small text-muted mb-0">{user?.college || 'College Name'}</p>
                  <hr />
                </li>
                <li><Link className="dropdown-item" to="/teacher/profile"><FaUser className="me-2" /> Profile</Link></li>
                <li><Link className="dropdown-item" to="/teacher/reset-password"><FaLock className="me-2" /> Reset Password</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item text-danger" to="/logout"><FaSignOutAlt className="me-2" /> Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actual Page Content */}
        <div className="p-4" style={{ minHeight: '90vh', background: '#f0f2f5' }}>
          <div className="col-md-10 p-5">
                    <div className="card shadow-lg rounded" style={{ backgroundColor: 'white' }}>
                      <div className="card-body">
                        <h3 className="text-center mb-4 text-primary">Upload Teacher Data</h3>
                        <div className="row">
                          <div className="col-md-6 text-center">
          
                            {/* Webcam Frame */}
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
                                <input type="text" className="form-control" name="Department" onChange={handleChange} />
                                <label>Department</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input type="email" className="form-control" name="Email" onChange={handleChange} />
                                <label>Email</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="Subject" onChange={handleChange} />
                                <label>Subject</label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
        </div>

      </div>
    </div>
  );
};


export default UploadFaceDataTeacher;