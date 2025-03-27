
// src/pages/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GameBackground from '../components/GameBackground';
import BrightBoostRobot from '../components/BrightBoostRobot';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <GameBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-brightboost-navy mb-2 drop-shadow-sm">
            Bright Boost
          </h1>
          <p className="text-lg md:text-xl text-brightboost-navy">
            Empowering young minds with technology skills
          </p>
        </div>

        <BrightBoostRobot className="mb-8" size="lg" />
        
        <div className="game-card p-8 w-full max-w-md">
          {isAuthenticated ? (
            <div className="space-y-6">
              <p className="text-center text-xl text-brightboost-navy">
                Welcome back, <span className="font-bold">{user?.name}</span>!
              </p>
              
              <Link
                to={user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
                className="game-button block w-full text-center"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-brightboost-navy mb-6">
                Choose Your Path
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                <Link
                  to="/teacher/login"
                  className="button-shadow rounded-xl px-6 py-4 bg-brightboost-navy text-white font-bold text-center hover:bg-opacity-90 transition-all"
                >
                  Teacher Login
                </Link>
                <Link
                  to="/teacher/signup"
                  className="button-shadow rounded-xl px-6 py-4 bg-brightboost-blue text-white font-bold text-center hover:bg-opacity-90 transition-all"
                >
                  Teacher Signup
                </Link>
                <Link
                  to="/student/login"
                  className="button-shadow rounded-xl px-6 py-4 bg-brightboost-lightblue text-brightboost-navy font-bold text-center hover:bg-opacity-90 transition-all"
                >
                  Student Login
                </Link>
                <Link
                  to="/student/signup"
                  className="button-shadow rounded-xl px-6 py-4 bg-brightboost-yellow text-brightboost-navy font-bold text-center hover:bg-opacity-90 transition-all"
                >
                  Student Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </GameBackground>
  );
};

export default Index;
