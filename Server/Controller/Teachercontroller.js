const Teacher = require('../models/Teacher.js');
const Student = require('../models/Student.js');
const Attendance = require('../models/Attendance.js');

const axios = require('axios');

const getTeacherDashboard  = async(req , res)=>{
    try{
        const teacher = await Teacher.findById(req.params.id);
        if(!teacher){
            return res.status(404).json({message:"Teacher not found"});
        }
        res.status(200).json(teaher);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error in getting the Teacher Data"});
    }
};


const markattendance = async (req, res) => {
  const { image } = req.body;
  const today =  new Date().toISOString().slice(0, 10);

  try {
    const response = await axios.post('http://127.0.0.1:5000/mark-attendance', { image });

    if (response.data.success) {
      const presentStudents = response.data.presentStudents;
      console.log(presentStudents);

      for (const s of presentStudents) {
        // Fetch student by RollNo
        const student = await Student.findOne({ RollNo: s.rollNo });

        if (!student) {
          console.warn(`Student with RollNo ${s.rollNo} not found.`);
          continue;
        }

        //saving the attendance in student model
        const alreadyMarked = student.attendance.find(
          entry => entry.date === today
        );
        if(alreadyMarked) {
          continue;
        }

        student.attendance.push({
          date: new Date(),
          status: 'Present'
        });

        await student.save();


        // Save attendance
        await Attendance.create({
          student: student._id,
          name: student.name,
          rollNo: student.RollNo, // use _id again for rollNo as per schema
          date: new Date(),
          status: 'Present',
          markedBy: req.user?._id || null // optionally, pass logged-in teacher ID
        });
      }

      res.json({ success: true, presentStudents });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Error marking attendance' });
  }
};

const Viewattendance  = async(req , res) =>{
  try{
    const today = new Date().toISOString().slice(0,10);
    const all = await Attendance.find({date: today });

    //count total , present , absent 
    const total = all.length;
    const present = all.filter(a => a.status === 'Present').length;
    const absent = total - present;

    res.json({
      success: true,
      stats : {total, present , absent},
      records : all
    });
  }catch(err){
    console.error(err);
    res.status(500).json({ success : false, error: 'Server error' });
  }
};

module.exports  = {getTeacherDashboard , markattendance , Viewattendance};