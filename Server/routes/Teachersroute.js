const express = require('express');
const router = express.Router();

const { getTeacherDashboard , markattendance, Viewattendance } = require('../Controller/Teachercontroller.js');

router.get('/:id', getTeacherDashboard);
router.post('/markattendance', markattendance);
router.get("/attendance" , Viewattendance)

module.exports = router;