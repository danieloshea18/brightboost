// src/pages/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../services/api';

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
  const api = useApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await api.get('/api/student/dashboard');
        setCourses(data.courses || []);
        setAssignments(data.assignments || []);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [api]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name}</span>
            <button
              onClick={logout}
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
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
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
