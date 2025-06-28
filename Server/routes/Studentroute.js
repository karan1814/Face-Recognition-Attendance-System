const express = require("express");
const passport = require('passport');
const router = express.Router();

const {registerstudent , getAttendance} = require("../Controller/StudentController.js");
const Student = require("../models/Student.js");

//get Full User Info for Frontend
router.get("/", async (req , res)=>{
    if(!req.isAuthenticated()){
        return res.status(401).json({ success: false, message: "Not Logged IN" });
    }

    try{
        const userId = req.user.userId;
        if(userId >=1001 && userId <=5000){
            const user = await Student.findOne({ userId });
            res.json({ success : true, user});
        }
    }catch(err){
        res.status(500).json({success: false, message: 'server Error' });
    }
})
router.post("/registerstudent", registerstudent);
router.get("/getAttendance/:id", getAttendance);

module.exports = router;