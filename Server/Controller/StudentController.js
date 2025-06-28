const axios = require('axios')
const Student = require('../models/Student');

const registerstudent = async(req , res)=>{
    try{
        const {userId, name, RollNo , Department, Email, Section, Year ,image } = req.body;
        console.log(req.body);

        // Send images to Python API for encoding
        const response = await axios.post('http://127.0.0.1:5000/upload-face', {
           image
        });

        if(!response.data.success){
            return res.status(400).json({ success : false, message: response.data.message })
        }
        
        const { encodings , faceMeshVector} = response.data;
        
        // Find existing student or create new one
        const updatedStudent = await Student.findOneAndUpdate(
            { userId }, // find by userId
            {
                $set: {
                userId,
                name,
                RollNo,
                Department,
                Email,
                Section,
                Year,
                encodings,
                faceMeshVector,
                },
            },
            { new: true, upsert: true } // return updated doc or create if not found
        );
        console.log(updatedStudent);
        res.status(200).json( { success: true, updatedStudent});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error in registering student"});
    }
};

const getAttendance = async(req , res)=>{
    try{
        const student = await student.findById(req.params.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json({ attendance : student.attendance});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error in getting the Attendance"});
    }
}

module.exports = {registerstudent , getAttendance};