
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Award, BookOpen, Gamepad2 } from 'lucide-react';

const StudentDashboard = () => {
  // Get student name from localStorage if available
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : { name: 'Student' };
  
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-brightbots-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brightbots-pink">
            Hi, {userData.name}!
          </h1>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-brightbots-pink"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
        
        {/* Main content area */}
        <div className="space-y-6">
          {/* Learning activities grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ActivityCard 
              title="Math Adventure" 
              icon={<Award className="h-8 w-8 text-brightbots-purple" />}
              color="bg-brightbots-purple/10"
            />
            <ActivityCard 
              title="Reading Quest" 
              icon={<BookOpen className="h-8 w-8 text-brightbots-blue" />}
              color="bg-brightbots-blue/10"
            />
            <ActivityCard 
              title="Science Game" 
              icon={<Gamepad2 className="h-8 w-8 text-brightbots-green" />}
              color="bg-brightbots-green/10"
            />
          </div>
          
          {/* Progress section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-brightbots-blue">
              Your Progress
            </h2>
            <div className="h-20 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Your learning progress will appear here!</p>
            </div>
          </div>
          
          {/* Rewards section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-brightbots-pink">
              Your Rewards
            </h2>
            <div className="flex justify-center gap-4">
              <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
                <span className="text-gray-400">?</span>
              </div>
              <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
                <span className="text-gray-400">?</span>
              </div>
              <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
                <span className="text-gray-400">?</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a placeholder dashboard. More fun activities coming soon!</p>
        </div>
      </div>
    </div>
  );
};

// Helper component for activity cards
const ActivityCard = ({ title, icon, color }) => (
  <div className={`p-6 rounded-xl ${color} cursor-pointer hover:shadow-md transition-shadow`}>
    <div className="flex flex-col items-center text-center gap-3">
      {icon}
      <h3 className="font-bold">{title}</h3>
      <Button variant="outline" size="sm">
        Start
      </Button>
    </div>
  </div>
);

export default StudentDashboard;
