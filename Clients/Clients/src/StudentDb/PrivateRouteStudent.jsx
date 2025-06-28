import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteStudent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'student' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteStudent;
