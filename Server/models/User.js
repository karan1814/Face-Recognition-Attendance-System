const mongoose  = require('mongoose');
const passportLocalMongoose =  require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    email :String,
    userId : Number,
    role: {
        type: String,
        enum : ['student', 'teacher']
    }
});

UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model('User' , UserSchema);