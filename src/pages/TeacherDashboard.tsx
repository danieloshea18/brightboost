
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Teacher Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
          <p className="text-gray-600">
            Welcome to your teacher dashboard. This is where you'll manage your classes and students.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
