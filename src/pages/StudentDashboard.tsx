
// src/pages/StudentDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  name: string;
  grade: string;
  teacher: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Math 101', grade: 'B+', teacher: 'Dr. Smith' },
    { id: '2', name: 'Science 202', grade: 'A-', teacher: 'Prof. Johnson' }
  ]);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', title: 'Math Homework', dueDate: '2025-04-05', status: 'pending' },
    { id: '2', title: 'Science Project', dueDate: '2025-04-15', status: 'completed' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name || 'Student'}</span>
            <button
              onClick={handleLogout}
              className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-800 transition-colors"
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
              <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
              {courses.length === 0 ? (
                <p className="text-gray-500">No courses found.</p>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border-b pb-3">
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-gray-600">Teacher: {course.teacher}</p>
                      <p className="text-sm text-gray-600">Grade: {course.grade}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Assignments</h2>
              {assignments.length === 0 ? (
                <p className="text-gray-500">No assignments found.</p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border-b pb-3">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                      <span 
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          assignment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
