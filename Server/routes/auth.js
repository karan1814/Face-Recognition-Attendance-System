const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher')
const axios = require('axios');


// Signup route
router.post('/signup', async (req, res) => {
  const { name, Email, password, userId , role} = req.body;
  console.log(req.body);

  try {
    if (role === 'student') {
      const newStudent = new Student({ ...req.body, role });
      await Student.register(newStudent, password);
      res.status(201).json({ success: true, message: 'Student registered' });
    } else if (role === 'Teacher') {
      const newTeacher = new Teacher({ ...req.body, role });
      await Teacher.register(newTeacher, password);
      res.status(201).json({ success: true, message: 'Teacher registered' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid role' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
  }
});

router.post('/login', (req, res, next) => {
  const { role } = req.body;
  const strategy = role === 'student' ? 'student-local' : 'teacher-local';

  passport.authenticate(strategy, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ success: false, message: info?.message || 'Login failed' });
    }

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Login error' });

      res.status(200).json({ success: true, message: 'Logged in successfully', user });
    });
  })(req, res, next);
});

// Face login route
router.post('/login-face', async (req, res, next) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ success: false, message: 'Image required' });
  }

  try {
    const response = await axios.post('http://127.0.0.1:5000/verify-face', { image });

    if (response.data.matched) {
      const { id, role } = response.data;

      console.log(id);

      // Find user based on role
      const Model = role === 'student' ? require('../models/Student') : require('../models/Teacher');
      const user = await Model.findOne({ userId: id });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Manually log the user in
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ success: false, message: 'Server error during login' });
        }

        console.log("User logged in via face recognition:", user);

        // // Important: Attach `role` to user object in response
        // const safeUser = {
        //   id: user._id,
        //   name: user.name,
        //   email: user.email,
        //   role: role, // This is used on frontend to redirect and protect routes
        // };

        return res.json({
          success: true,
          user: user,
          message: 'Face login successful'
        });
      });

    } else {
      return res.status(401).json({ success: false, message: 'Face not recognized' });
    }

  } catch (error) {
    console.error('Face login error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//// Get Full User Info for Frontend
router.get('/me', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }

  try {
    const userId = req.user.userId || req.user.userId;
    const user = await Student.findOne({ userId }) || await Teacher.findOne({ userId });

    console.log("this is the user we are sending to the frontend"+user);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// router.post('/logout', (req, res) => {
//   req.logout(err => {
//     if (err) return res.status(500).json({ success: false, message: 'Logout failed' });
//     res.json({ success: true, message: 'Logged out successfully' });
//   });
// });

// Logout Route
router.get('/logout', (req, res) => {
  req.logout(function(err) {
      if (err) { 
          console.error('Logout Error:', err);
          return res.status(500).json({ success: false, message: 'Logout failed' });
      }
      req.session.destroy(); // destroy session data
      console.log("Session destroyed");
      res.clearCookie('connect.sid'); // clear the session cookie
      res.json({ success: true, message: 'Logged out successfully' });
  });
});

module.exports = router;