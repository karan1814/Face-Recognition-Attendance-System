const express = require('express');
const router = express.Router();
const { markAttendance } = require('../Controller/attendanceController.js');

router.post('/mark', markAttendance);

module.exports = router;
