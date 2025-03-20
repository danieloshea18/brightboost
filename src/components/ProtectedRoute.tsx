// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const token = localStorage.getItem('authToken');
  const userDataString = localStorage.getItem('userData');
  
  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/teacher/login" replace />;
  }
  
  // If role checking is required
  if (requiredRole && userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      if (userData.role !== requiredRole) {
        // Redirect based on role
        if (userData.role === 'teacher') {
          return <Navigate to="/teacher/dashboard" replace />;
        } else if (userData.role === 'student') {
          return <Navigate to="/student/dashboard" replace />;
        } else {
          // Unknown role, logout and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          return <Navigate to="/teacher/login" replace />;
        }
      }
    } catch (error) {
      // Invalid user data, logout and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      return <Navigate to="/teacher/login" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
