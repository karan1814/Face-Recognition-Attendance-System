import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaFaceSmile } from 'react-icons/fa6';
import Navbar from './Landing_page/navbar';
import Footer from './Landing_page/Footer';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    Email: '',
    userId: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = activeTab === 'login' ? '/login' : '/signup';

    try {
      const res = await fetch(`http://localhost:5000/auth${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        const text = await res.text();
        throw new Error( text || 'Invalid server response');
      }
  

      if (data.success) {
        localStorage.setItem('user',JSON.stringify(data.user));
        alert(`${activeTab} successful!`);
        console.log(data);
        if( data.user.role === "student"){
          navigate('/student/uploaddata');
        }else{
          navigate('/teacher');
        }
      } else {
        alert(data.message || 'Something went wrong.');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <form className="card p-4 shadow rounded-4" style={{ width: '400px' }} onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="d-flex border-bottom mb-3">
            <button
              type="button"
              className={`btn flex-fill ${activeTab === 'login' ? 'fw-bold text-dark border-bottom border-3 border-dark' : 'text-muted'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`btn flex-fill ${activeTab === 'signup' ? 'fw-bold text-dark border-bottom border-3 border-dark' : 'text-muted'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <>
              <h4 className="text-center mb-1">Login</h4>
              <p className="text-center text-muted">Sign in to your account</p>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><FaIdCard /></span>
                  <input type="text" name="userId" className="form-control" placeholder="userID" onChange={handleChange} required />
                </div>
              </div>

              {/* Role (Student/Teacher) */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <select
                  name="role"
                  className="form-select"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
            </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                </div>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">Log in</button>
              </div>

              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" />
                <span className="px-2 text-muted">or</span>
                <hr className="flex-grow-1" />
              </div>

              <div className="d-grid mb-3">
                <a href="/login/face">
                  <button type="button" className="btn btn-outline-secondary">
                    <FaFaceSmile className="me-2" />
                    Login with Face Recognition
                  </button>
                </a>
              </div>

              <div className="text-center">
                <span>Don't have an account? </span>
                <a href="#" className="text-primary" onClick={() => setActiveTab('signup')}>Sign up</a>
              </div>
            </>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <>
            <h4 className="text-center mb-1">Sign Up</h4>
            <p className="text-center text-muted">Create your new account</p>
          
            {/* Full Name */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          
            {/* Role (Student/Teacher) */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <select
                  name="role"
                  className="form-select"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
            </div>
          
            {/* 4-digit ID */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaIdCard /></span>
                <input
                  type="number"
                  name="userId"
                  className="form-control"
                  placeholder="4-digit ID"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          
            {/* Email */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input
                  type="email"
                  name="Email"
                  className="form-control"
                  placeholder="Email address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          
            {/* Password */}
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          
            {/* Submit Button */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success">
                Create Account
              </button>
            </div>
          
            {/* Switch to Login */}
            <div className="text-center">
              <span>Already have an account? </span>
              <a href="#" className="text-primary" onClick={() => setActiveTab('login')}>
                Login
              </a>
            </div>
          </>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
