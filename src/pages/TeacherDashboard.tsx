
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Class {
  id: string;
  name: string;
  students: number;
  schedule: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submissions: number;
}

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Math 101', students: 25, schedule: 'MWF 10:00 AM' },
    { id: '2', name: 'Science 202', students: 30, schedule: 'TTh 2:00 PM' }
  ]);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', title: 'Algebra Quiz', dueDate: '2025-04-10', submissions: 15 },
    { id: '2', title: 'Science Project', dueDate: '2025-04-20', submissions: 8 }
  ]);

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
                      <p className="text-sm text-gray-600">Students: {cls.students}</p>
                      <p className="text-sm text-gray-600">Schedule: {cls.schedule}</p>
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
                      <p className="text-sm text-gray-600">Submissions: {assignment.submissions}</p>
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

export default TeacherDashboard;
