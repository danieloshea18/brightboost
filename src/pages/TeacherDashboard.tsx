
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const TeacherDashboard = () => {
  // Get teacher data from localStorage (if available)
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : { name: 'Teacher' };
  
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-brightbots-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brightbots-purple">
            Welcome, {userData.name}!
          </h1>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-brightbots-purple"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
        
        {/* Dashboard content - placeholder for now */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-brightbots-blue">Your Classes</h2>
            <p className="text-gray-600">No classes created yet.</p>
            <Button className="mt-4 bg-brightbots-pink hover:bg-brightbots-pink/90">
              Create New Class
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-brightbots-blue">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full bg-brightbots-green hover:bg-brightbots-green/90">
                Create Activity
              </Button>
              <Button className="w-full bg-brightbots-purple hover:bg-brightbots-purple/90">
                View Reports
              </Button>
              <Button className="w-full bg-brightbots-blue hover:bg-brightbots-blue/90">
                Manage Students
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a placeholder dashboard. Features coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
