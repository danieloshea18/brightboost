
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Cloud from '@/components/Cloud';
import { Button } from '@/components/ui/button';

const TeacherLogin = () => {
  return (
    <div className="min-h-screen bg-brightbots-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Clouds in background */}
      <Cloud className="top-10 left-10" />
      <Cloud className="bottom-20 right-5" />
      <Cloud className="top-1/2 -left-10" />
      
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 text-foreground">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-brightbots-purple">Teacher Login</h1>
        <p className="text-center mb-8 text-lg">Please login or create an account to continue</p>
        
        <div className="space-y-6">
          <Button className="w-full py-6 text-xl bg-brightbots-purple hover:bg-brightbots-purple/90">
            Login
          </Button>
          <Button variant="outline" className="w-full py-6 text-xl border-brightbots-purple text-brightbots-purple hover:bg-brightbots-purple/10">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
