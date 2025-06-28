const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose_url = "mongodb://127.0.0.1:27017/FaceTrackDB";

const StudentRoute = require('./routes/Studentroute.js');
const TeacherRoute = require('./routes/Teachersroute.js');
const faceRoute = require("./routes/face.js");
const router = require('./routes/auth.js');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
dotenv.config();

main()
.then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(mongoose_url);
}

const sessionoption = {
    secret: "karanrathoreserver",
    resave: false,
    saveUninitialized: false,
    cookie : {
      secure: false,
      expires:Date.now() +7*24*60*60*1000,
      maxAge : 7*24*60*60*1000,
      httpOnly : true
  },
}


app.use(express.json({limit: '20mb' })); //Increase limit to 10mb or more
app.use(express.urlencoded({extended: true , limit: '20mb'}));
app.use(session(sessionoption));
app.use(passport.initialize());
app.use(passport.session());

passport.use('student-local', Student.createStrategy());
passport.use('teacher-local', Teacher.createStrategy());

passport.serializeUser((user, done)=>{
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (obj, done) => {
  try {
    let user;
    if (obj.role === 'student') {
      user = await Student.findById(obj.id);
    } else {
      user = await Teacher.findById(obj.id);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Enable CORS with credentials
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/auth', router);// autherization routes
//the student route is used to register the student and get the attendance of the student for the website of our project
app.use("/api/Student", StudentRoute);
//the teacher route is used to register the teacher and get the attendance of the teacher
app.use("/api/Teacher", TeacherRoute);

app.get("/",(req , res )=>{
    res.send("Server is running");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

