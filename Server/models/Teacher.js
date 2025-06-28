const mongoose = require('mongoose');
const Student = require('./Student');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const teacherSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "Teacher",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    encodings:{
        type:[[Number]],//Array of arrays of numbers
        required:true
    },
    faceMeshVector:{
        type: [[Number]],
        required:true
    },
    Department: {
        type: String,
    },
    teaherID: {
        type:Number,
    },
    Students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

teacherSchema.plugin(passportLocalMongoose, { usernameField : 'userId' });

module.exports = mongoose.model('Teacher', teacherSchema);