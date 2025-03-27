
// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import TeacherSignup from './pages/TeacherSignup';
import StudentLogin from './pages/StudentLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/teacher/login" element={<Login />} />
        <Route path="/teacher/signup" element={<TeacherSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />
        
        {/* Protected routes */}
        <Route 
          path="/teacher/dashboard" 
          element={
            <ProtectedRoute 
              element={<TeacherDashboard />} 
              requiredRole="teacher" 
            />
          } 
        />
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute 
              element={<StudentDashboard />} 
              requiredRole="student" 
            />
          } 
        />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
