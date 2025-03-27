// src/pages/TeacherDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  grade: string;
}

interface Class {
  id: string;
  name: string;
  students: number;
}

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Student 1', grade: 'A' },
    { id: '2', name: 'Student 2', grade: 'B' },
    { id: '3', name: 'Student 3', grade: 'C' }
  ]);
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Math 101', students: 25 },
    { id: '2', name: 'Science 202', students: 18 }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Teacher Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name || 'Teacher'}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Classes</h2>
              {classes.length === 0 ? (
                <p className="text-gray-500">No classes found.</p>
              ) : (
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="border-b pb-3">
                      <h3 className="font-medium">{cls.name}</h3>
                      <p className="text-sm text-gray-600">{cls.students} students</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Students</h2>
              {students.length === 0 ? (
                <p className="text-gray-500">No students found.</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Name</th>
                      <th className="text-left pb-2">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="py-2">{student.name}</td>
                        <td className="py-2">{student.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
