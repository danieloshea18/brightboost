// src/pages/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Playful Peer Platform</h1>
        <p className="text-gray-600 text-center mb-8">
          A platform for teachers and students to connect and learn together.
        </p>

        {isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-center">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
            </p>
            <div className="flex justify-center">
              <Link
                to={user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full text-center"
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
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
              >
                Teacher Login
              </Link>
              <Link
                to="/teacher/signup"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-center"
              >
                Teacher Signup
              </Link>
              <Link
                to="/student/login"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-center"
              >
                Student Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
