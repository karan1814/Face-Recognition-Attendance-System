import React from 'react';
import { FaUser, FaSignOutAlt, FaLock, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from "../ContextAuth";
import { Card } from 'react-bootstrap';

const TeacherMain = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

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
            <Link className="nav-link text-white" to="/teacher/uploaddata">Mark Attendance</Link>
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
          <h2>Welcome, {user?.name || 'Teacher'} 👋</h2>
          <p>Your dashboard summary goes here...</p>

          {/* Profile Image and Details */}
          <div className="text-center my-4">
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: '#ddd',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#555'
              }}
            >
              Profile Image
            </div>

            <Card className="shadow p-4 rounded-4 mt-4">
              <h4 className="mb-3">Teacher Details</h4>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>ID:</strong> {user?.userId}</p>
              <p><strong>Role:</strong> {user?.role}</p>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};


export default TeacherMain;