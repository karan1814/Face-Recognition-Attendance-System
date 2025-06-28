const sendtopython = require('../utils/sendtopy.js');
const Student = require('../models/Student.js');
const Attendance = require('../models/Attendance.js');

const markAttendance = async(req, res) => {
    try{
        const { image} = req.body;

        const students = await Student.find({});
        const knownEncodings = students.map((student)=>({
            id : student._id,
            name : student.name,
            encodings : student.encodings,
        }));

        const { matches } = await sendtopy(image , knownEncodings);

        const AttendanceRecords = matches.map((student) => ({
            studentId: student.id,
            name: student.name,
            date: new Date().toISOString().split('T')[0],
            status: 'Present',
        }));

        await Attendance.insertmany(AttendanceRecords);

        res.json({ Success: true , marked : AttendanceRecords });
    }catch(err){
        console.error("Error in marking attendance: ", err.message);
        res.status(500).json({ Success: false, error: "Error in marking attendance" });
    }
};

module.exports = { markAttendance };