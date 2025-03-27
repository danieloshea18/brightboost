
// src/pages/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-yellow-200 opacity-60 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-200 opacity-50 animate-float-delay"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-cyan-200 opacity-60 animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-pink-200 opacity-60 animate-float-slow"></div>
      </div>
      
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl backdrop-blur-sm w-full max-w-md z-10 border border-blue-100">
        <h1 className="text-3xl font-bold text-center mb-3 text-indigo-800">Playful Peer Platform</h1>
        <p className="text-indigo-600 text-center mb-8">
          A platform for teachers and students to connect and learn together.
        </p>

        {isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-center text-indigo-700">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
            </p>
            <div className="flex justify-center">
              <Link
                to={user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors w-full text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Link
                to="/teacher/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Teacher Login
              </Link>
              <Link
                to="/teacher/signup"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Teacher Signup
              </Link>
              <Link
                to="/student/login"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Student Login
              </Link>
              <Link
                to="/student/signup"
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Student Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
