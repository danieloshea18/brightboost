
// src/pages/StudentDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GameBackground from '../components/GameBackground';
import BrightBoostRobot from '../components/BrightBoostRobot';

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
    <GameBackground>
      <div className="min-h-screen flex flex-col relative z-10">
        <nav className="bg-brightboost-lightblue text-brightboost-navy p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BrightBoostRobot size="sm" className="w-10 h-10" />
              <h1 className="text-xl font-bold">Bright Boost</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="badge-level bg-brightboost-yellow">Student</span>
              <span>Welcome, {user?.name || 'Student'}</span>
              <button
                onClick={handleLogout}
                className="bg-brightboost-blue px-3 py-1 rounded-lg hover:bg-brightboost-blue/80 transition-colors text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4 flex-grow">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-brightboost-navy">Student Dashboard</h2>
              <div className="flex gap-2 mt-2">
                <span className="badge badge-points">Level: 4</span>
                <span className="badge badge-points">XP: 720/1000</span>
              </div>
            </div>
            <div className="progress-bar bg-gray-200 h-6 w-full md:w-64 rounded-full overflow-hidden">
              <div className="bg-brightboost-blue h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="game-card">
                <div className="bg-brightboost-yellow text-brightboost-navy p-4 rounded-t-xl">
                  <h2 className="text-xl font-semibold">Your Courses</h2>
                </div>
                <div className="p-4">
                  {courses.length === 0 ? (
                    <p className="text-gray-500">No courses found.</p>
                  ) : (
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div key={course.id} className="border-b pb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <h3 className="font-medium text-brightboost-navy">{course.name}</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">Teacher: {course.teacher}</p>
                            <span className="badge badge-achievement">Grade: {course.grade}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="game-button mt-4 w-full">Explore Courses</button>
                </div>
              </div>

              <div className="game-card">
                <div className="bg-brightboost-blue text-white p-4 rounded-t-xl">
                  <h2 className="text-xl font-semibold">Assignments</h2>
                </div>
                <div className="p-4">
                  {assignments.length === 0 ? (
                    <p className="text-gray-500">No assignments found.</p>
                  ) : (
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="border-b pb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <h3 className="font-medium text-brightboost-navy">{assignment.title}</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                            <span 
                              className={`badge ${
                                assignment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {assignment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="game-button mt-4 w-full">View All Assignments</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </GameBackground>
  );
};

export default StudentDashboard;
