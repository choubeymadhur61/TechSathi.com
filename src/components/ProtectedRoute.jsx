import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. Check if the 'token' exists in local storage
  const token = localStorage.getItem('token');

  // 2. If NO token, redirect to Login and show a message
  if (!token) {
    alert("Please login or register yourself first to access the dashboard!");
    return <Navigate to="/" replace />;
  }

  // 3. If token exists, show the requested page (Dashboard)
  return children;
};

export default ProtectedRoute;