<div className="container-fluid">
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
        <div className="col-md-10 p-4">
          <h2>Welcome,{user?.name}!</h2>
          <p className="text-muted">Here's your attendance overview and recent activity.</p>

          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="card text-center border-primary">
                <div className="card-body">
                  <h5 className="card-title">Total Days</h5>
                  <h3 className="text-primary">120</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center border-success">
                <div className="card-body">
                  <h5 className="card-title">Present</h5>
                  <h3 className="text-success">112</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center border-danger">
                <div className="card-body">
                  <h5 className="card-title">Absent</h5>
                  <h3 className="text-danger">8</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="mt-5">
            <h4>Recent Attendance</h4>
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>April 15, 2025</td>
                  <td><span className="badge bg-success">Present</span></td>
                  <td>08:52 AM</td>
                  <td>05:30 PM</td>
                </tr>
                <tr>
                  <td>April 14, 2025</td>
                  <td><span className="badge bg-danger">Absent</span></td>
                  <td>--</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td>April 13, 2025</td>
                  <td><span className="badge bg-success">Present</span></td>
                  <td>08:49 AM</td>
                  <td>05:28 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const captureAndUpload = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) {
      setStatus('Unable to capture image.');
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
        image: imageSrc,
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
        setStatus('Face data and details uploaded successfully!');
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
    <div className="container-fluid">
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
              <a className="nav-link text-white" href="/student/ViewattStudent">Attendance History</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#settings">Settings</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h3 className="mb-4">Upload Student Data</h3>
                <div className="row">
                  <div className="col-md-6">
                    <Webcam
                      audio={false}
                      height={300}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={400}
                      videoConstraints={videoConstraints}
                      className="mb-3"
                    />
                    <button
                      onClick={captureAndUpload}
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Capture & Upload'}
                    </button>
                    {status && <p className="mt-2 text-info">{status}</p>}
                  </div>
          
                  <div className="col-md-6">
                    <form>
                      <div className="mb-3">
                        <label>UserId</label>
                        <input type="text" className="form-control" name="userId" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label>Roll No</label>
                        <input type="text" className="form-control" name="RollNo" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label>Department</label>
                        <input type="text" className="form-control" name="Department" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" name="Email" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label>Section</label>
                        <input type="text" className="form-control" name="Section" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label>Year</label>
                        <input type="text" className="form-control" name="Year" onChange={handleChange} />
                      </div>
                    </form>
                  </div>
               </div>
        </div>
      </div>
    </div>
  )
};

export default UploadFaceData;


import React from "react";
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from "../ContextAuth";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) return <p>Loading...</p>

  const handleLogout = async () =>{
    await logout();
    navigate('/');
  }

  return (
    <Container fluid className="p-0">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white min-vh-100 p-3 d-flex flex-column justify-content-between">
          <div>
            <h4 className="mb-4">Dashboard</h4>
            <div className="d-flex flex-column gap-3">
              <Button variant="primary" className="text-start" onClick={() => navigate('/student/uploaddata')}>
                Upload 
              </Button>
              <Button variant="primary" className="text-start" onClick={() => navigate('/student/Viewattendance')}>
                View Attendance
              </Button>
            </div>
          </div>

          {/* Admin Dropdown */}
          <Dropdown drop="up" className="align-self-start mt-4">
            <Dropdown.Toggle variant="light" id="dropdown-admin" className="w-100 text-start">
              👤 Admin
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              <Dropdown.Item onClick={() => alert("Settings clicked!")}>Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h2>Welcome, {user?.name}!</h2>

          {/* Profile Image */}
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
          </div>

          {/* Student Details */}
          <Card className="shadow p-4 rounded-4">
            <h4 className="mb-3">Student Details</h4>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.Email}</p>
            <p><strong>ID:</strong> {user?.userId}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;


import React from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../ContextAuth";


const TeacherMain = () => {
  const { user, loading } = useAuth();
  console.log(user);
  
  if (loading) return <p>Loading...</p>

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="mb-4">FaceTrack</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-people me-2"></i> Users
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/mark">
              <i className="bi bi-calendar-check me-2"></i> Mark Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/view">
              <i className="bi bi-eye me-2"></i> View Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-bar-chart me-2"></i> Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-gear me-2"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Face Recognition Attendance Management</h2>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle me-2 fs-4"></i> Admin
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="bg-primary text-white text-center p-3 rounded">
              <h5>Present</h5>
              <h2>25</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white text-center p-3 rounded">
              <h5>Absent</h5>
              <h2>5</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white text-center p-3 rounded">
              <h5>Late</h5>
              <h2>3</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="border rounded p-3 text-center">
              <h5>Real-Time Face Recognition</h5>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Detected Face" className="img-fluid rounded mb-2" />
              <h6>Detected</h6>
              <strong>{user?.name}</strong>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded p-3">
              <h5>Today's Attendance</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check-In</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>April 24, 2024</td>
                    <td>08:45 AM</td>
                  </tr>
                  <tr>
                    <td>April 24, 2024</td>
                    <td>08:55 AM</td>
                  </tr>
                  <tr>
                    <td>April 24, 2024</td>
                    <td>Absent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded p-3">
              <h5>Attendance Analytics</h5>
              <img src="https://img.icons8.com/ios-filled/500/combo-chart.png" alt="Graph" className="img-fluid" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5>Today's Attendance</h5>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Check-in Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ann Smith</td>
                <td>April 24, 2024</td>
                <td>Present</td>
              </tr>
              <tr>
                <td>David Johnso</td>
                <td>April 24, 2024</td>
                <td>08:55 AM</td>
              </tr>
              <tr>
                <td>James Brown</td>
                <td>April 24, 2024</td>
                <td>Absent</td>
              </tr>
              <tr>
                <td>Emily White</td>
                <td>April 24, 2024</td>
                <td>Late</td>
              </tr>
              <tr>
                <td>Michael Lee</td>
                <td>April 24, 2024</td>
                <td>Late</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherMain;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherViewAttendance = () => {
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/attendance');
        if (res.data.success) {
          setStats(res.data.stats);
          setRecords(res.data.records);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="d-flex">

      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="mb-4">FaceTrack</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-people me-2"></i> Users
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/mark">
              <i className="bi bi-calendar-check me-2"></i> Mark Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/view">
              <i className="bi bi-eye me-2"></i> View Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-bar-chart me-2"></i> Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="teacher">
              <i className="bi bi-gear me-2"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      <div className='container-fluid p-4'>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Face Recognition Attendance Management</h2>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle me-2 fs-4"></i> Admin
          </div>
        </div>

        <div className='row'>
          <h2>View Attendance</h2>

          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Students</h5>
                  <p className="card-text">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Present</h5>
                  <p className="card-text">{stats.present}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-danger mb-3">
               <div className="card-body">
                  <h5 className="card-title">Absent</h5>
                  <p className="card-text">{stats.absent}</p>
                </div>
              </div>
            </div>
          </div>

          <h4 className="mt-4">Student Records</h4>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, idx) => (
              <tr key={idx}>
                <td>{record.rollNo}</td>
                <td>{record.name}</td>
                <td className={record.status === 'Present' ? 'text-success' : 'text-danger'}>
                  {record.status}
                </td>
                <td>{record.date}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default TeacherViewAttendance;

// src/pages/teacher/ViewAttendance.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teacher/viewattendance');
        setAttendanceRecords(response.data.records || []);
      } catch (err) {
        console.error('Error fetching attendance records:', err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="mb-4">FaceTrack</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/users">
              <i className="bi bi-people me-2"></i> Users
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/mark">
              <i className="bi bi-calendar-check me-2"></i> Mark Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/view">
              <i className="bi bi-eye me-2"></i> View Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/reports">
              <i className="bi bi-bar-chart me-2"></i> Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/teacher/settings">
              <i className="bi bi-gear me-2"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Face Recognition Attendance Management</h2>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle me-2 fs-4"></i> Admin
          </div>
        </div>

        {/* Attendance Table */}
        <div className="row">
          <div className="col-12">
            <h3>View Attendance Records</h3>
            {attendanceRecords.length > 0 ? (
              <table className="table table-striped table-hover mt-4">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.studentName}</td>
                      <td>{record.rollNo}</td>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>
                        <span className="badge bg-success">Present</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-3">No attendance records available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;

// src/pages/teacher/MarkAttendance.jsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);

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
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="mb-4">FaceTrack</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/users">
              <i className="bi bi-people me-2"></i> Users
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/mark">
              <i className="bi bi-calendar-check me-2"></i> Mark Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/view">
              <i className="bi bi-eye me-2"></i> View Attendance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/teacher/reports">
              <i className="bi bi-bar-chart me-2"></i> Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/teacher/settings">
              <i className="bi bi-gear me-2"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Face Recognition Attendance Management</h2>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle me-2 fs-4"></i> Admin
          </div>
        </div>

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
  );
};

export default MarkAttendance;


// src/pages/teacher/UploadFaceDataTeacher.jsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

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
    <div className="container-fluid" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-4">
          <h4 className="mb-4">Teacher Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/teacher">Dashboard</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/teacher/uploaddata">Upload Data</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/teacher/mark">Mark Attendance</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/teacher/view">View Attendance</a>
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
  );
};

export default UploadFaceDataTeacher;
