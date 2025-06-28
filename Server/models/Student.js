const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose =  require('passport-local-mongoose');


const studentSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'Student',
        required: true
    },
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    RollNo :{
        type:Number
    },
    Year:{
        type:Number,
    },
    Section:{
        type:String,
    },
    Department:{
        type:String,
    },
    encodings:{
        type:[[Number]],//Array of arrays of numbers
    },
    faceMeshVector:{
        type: [[Number]],
    },
    attendance: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            status:{
                type: String,
                enum: ['Present', 'Absent']
            }
        }
    ]
});

studentSchema.plugin(passportLocalMongoose, { usernameField : 'userId' });

module.exports = mongoose.model('Student', studentSchema);