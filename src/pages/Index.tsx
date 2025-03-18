
import React from 'react';
import { GraduationCap, Users } from 'lucide-react';
import UserSelectionButton from '@/components/UserSelectionButton';
import Cloud from '@/components/Cloud';
import Robot from '@/components/Robot';

const Index = () => {
  return (
    <div className="min-h-screen bg-brightbots-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background clouds */}
      <Cloud className="top-10 left-10" />
      <Cloud className="top-20 right-20" />
      <Cloud className="bottom-10 left-1/4" />
      <Cloud className="bottom-20 right-10" />
      
      {/* Logo and Title */}
      <div className="mb-8 text-center">
        <Robot className="mx-auto mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-brightbots-purple">
          Bright Bots
        </h1>
        <p className="text-xl md:text-2xl text-brightbots-blue font-rounded animate-bounce-slight">
          Let's learn and play!
        </p>
      </div>
      
      {/* User Selection Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mt-8 items-center">
        <UserSelectionButton 
          text="I am a Teacher" 
          to="/teacher-login"
          bgColor="bg-brightbots-purple"
          icon={<GraduationCap size={32} />}
        />
        
        <UserSelectionButton 
          text="I am a Student" 
          to="/student-login"
          bgColor="bg-brightbots-pink"
          icon={<Users size={32} />}
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-4 w-full flex justify-center">
        <div className="text-brightbots-green text-lg font-rounded">
          Fun learning for K-2 students
        </div>
      </div>
    </div>
  );
};

export default Index;
