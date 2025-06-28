const express = require('express');
const mongoose = require('mongoose');
const attendanceRoutes = require('./routes/attendanceRoute');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use('/api/attendance', attendanceRoutes);

mongoose.connect('mongodb://localhost:27017/face_attendance')
  .then(() => {
    app.listen(4000, () => console.log('Node.js API running on http://localhost:4000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
