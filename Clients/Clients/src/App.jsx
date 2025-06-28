import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Login";
import Landingpage from './Landing_page/Landingpage';
import UploadFaceData from './StudentDb/Uploaddata';
import TeacherMain from './TeachersDB/Teachermain';
import MarkAttendance from './TeachersDB/Markattendance';
import TeacherViewAttendance from './TeachersDB/Viewattendance';
import LoginWithFace from './LoginwithFace';
import StudentDashboard from './StudentDb/studentDB';


import PrivateRouteStudent from './StudentDb/PrivateRouteStudent';
import PrivateRouteTeacher from './TeachersDB/PrivateRouteTeacher';

import { AuthProvider } from './ContextAuth';
import UploadFaceDataTeacher from './TeachersDB/uploaddata';
import StudentViewAttendance from './StudentDb/ViewAttStudent';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/face" element={<LoginWithFace />} />

        {/* Student Protected Routes */}
        <Route element={<PrivateRouteStudent />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/Viewattendance" element={<StudentViewAttendance />} />
          <Route path="/student/uploaddata" element={<UploadFaceData />} />
        </Route>

        {/* Teacher Protected Routes */}
        <Route element={<PrivateRouteTeacher />}>
          <Route path="/teacher" element={<TeacherMain />} />
          <Route path="/teacher/uploaddata" element={<UploadFaceDataTeacher />}/>
          <Route path="/teacher/mark" element={<MarkAttendance />} />
          <Route path="/teacher/view" element={<TeacherViewAttendance />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
