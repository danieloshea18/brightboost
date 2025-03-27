
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GameBackground from '../components/GameBackground';
import BrightBoostRobot from '../components/BrightBoostRobot';

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
    <GameBackground>
      <div className="min-h-screen flex flex-col relative z-10">
        <nav className="bg-brightboost-navy text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BrightBoostRobot size="sm" className="w-10 h-10" />
              <h1 className="text-xl font-bold">Bright Boost</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="badge-level">Teacher</span>
              <span>Welcome, {user?.name || 'Teacher'}</span>
              <button
                onClick={handleLogout}
                className="bg-brightboost-blue px-3 py-1 rounded-lg hover:bg-brightboost-blue/80 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4 flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brightboost-navy">Teacher Dashboard</h2>
            <span className="badge badge-points">XP: 1250</span>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="game-card">
                <div className="bg-brightboost-blue text-white p-4 rounded-t-xl">
                  <h2 className="text-xl font-semibold">Your Classes</h2>
                </div>
                <div className="p-4">
                  {classes.length === 0 ? (
                    <p className="text-gray-500">No classes found.</p>
                  ) : (
                    <div className="space-y-4">
                      {classes.map((cls) => (
                        <div key={cls.id} className="border-b pb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <h3 className="font-medium text-brightboost-navy">{cls.name}</h3>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Students: {cls.students}</p>
                            <p className="text-sm text-gray-600">Schedule: {cls.schedule}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="game-button mt-4 w-full">Add New Class</button>
                </div>
              </div>

              <div className="game-card">
                <div className="bg-brightboost-lightblue text-brightboost-navy p-4 rounded-t-xl">
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
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                            <div>
                              <span className="badge-achievement">
                                {assignment.submissions} Submissions
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="game-button mt-4 w-full">Create Assignment</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </GameBackground>
  );
};

export default TeacherDashboard;
