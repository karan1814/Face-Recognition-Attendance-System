import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteTeacher = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'Teacher' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteTeacher;
