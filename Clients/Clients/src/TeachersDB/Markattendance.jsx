import React, { useRef , useState} from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { FaUser, FaSignOutAlt, FaLock, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from "../ContextAuth";
import { Card } from 'react-bootstrap';

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  const captureAndSend = async () => {
    setStatus('Capturing frame...');
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      const response = await axios.post('http://localhost:5000/api/teacher/markattendance', {
        image: imageSrc,
      });

      if (response.data.success) {
        setPresentStudents(response.data.presentStudents);
        setStatus('Attendance marked successfully!');
      } else {
        setStatus('No faces recognized.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error marking attendance');
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
          <h3 className="mb-0">DashBoard</h3>

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
          <h2>Welcome, {user?.name || 'Teacher'} 👋</h2>

          {/* Main Section */}
                  <div className="row">
                    <div className="col-12 mb-4">
                      <h3>Mark Attendance</h3>
                      <div className="d-flex flex-column align-items-center">
                        <Webcam
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={640}
                          height={480}
                          audio={false}
                          className="rounded shadow"
                        />
                        <button className="btn btn-primary mt-3" onClick={captureAndSend}>
                          Capture Frame
                        </button>
                        <p className="mt-2">{status}</p>
                      </div>
                    </div>
          
                    {/* Present Students */}
                    {presentStudents.length > 0 && (
                      <div className="col-12 mt-4">
                        <h4>Present Students</h4>
                        <table className="table table-striped table-hover mt-3">
                          <thead className="table-primary">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Roll No</th>
                            </tr>
                          </thead>
                          <tbody>
                            {presentStudents.map((student, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.rollNo}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
        </div>

      </div>
    </div>
  );
};


export default MarkAttendance;