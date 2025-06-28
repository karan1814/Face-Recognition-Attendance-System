import React from 'react';
import { FaUser, FaSignOutAlt, FaLock, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from "../ContextAuth";

const StudentViewAttendance = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading user data...</p>;

  const attendanceRecords = user?.attendance || [];

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
        <h4 className="mb-4">Student Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/student">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/student/uploaddata">Upload Data</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/student/ViewattStudent">Attendance History</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/student/settings">Settings</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '220px', width: '100%' }}>

        {/* Topbar */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{ background: '#fff', position: 'sticky', top: '0', zIndex: '999' }}>
          <h3 className="mb-0">Attendance History</h3>

          {/* Notifications and Profile */}
          <div className="d-flex align-items-center gap-3">
            <FaBell size={20} style={{ cursor: 'pointer' }} />

            {/* Profile Dropdown */}
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
                <span style={{ fontWeight: 'bold' }}>{user?.name || 'Student'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="profileDropdown">
                <li className="px-3 py-2 text-center">
                  <FaUser size={20} className="me-2" />
                  <strong>{user?.name}</strong>
                  <p className="small text-muted mb-0">{user?.course || 'Course Details'}</p>
                  <p className="small text-muted mb-0">{user?.college || 'College Name'}</p>
                  <hr />
                </li>
                <li><Link className="dropdown-item" to="/student/profile"><FaUser className="me-2" /> Profile</Link></li>
                <li><Link className="dropdown-item" to="/student/reset-password"><FaLock className="me-2" /> Reset Password</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item text-danger" to="/logout"><FaSignOutAlt className="me-2" /> Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="p-4" style={{ minHeight: '90vh', background: '#f0f2f5' }}>
          <h4 className="mb-4">Hello {user?.name || 'Student'}, here’s your attendance 📚</h4>

          <div className="table-responsive shadow rounded-4 p-3 bg-white">
            {attendanceRecords.length === 0 ? (
              <p className="text-center text-muted">No attendance records found.</p>
            ) : (
              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, index) => {
                    const dateObj = new Date(record.date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }); 
                    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                    return (
                      <tr key={index}>
                        <td>{formattedDate}</td>
                        <td>{formattedTime}</td>
                        <td>
                          <span className={`badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentViewAttendance;

