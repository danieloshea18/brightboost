// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Check role if required
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  // Render the protected component
  return <>{element}</>;
};

export default ProtectedRoute;
