const mongoose = require('mongoose');
const { create } = require('./Student');
const Schema = mongoose.Schema;

const attendanceSchema = new mongoose.Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    name:{
        type: String,
        required:true
    },
    rollNo: {
        type: Number,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    },
    markedBy:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        default: null
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;