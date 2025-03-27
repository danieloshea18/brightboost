
// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import GameBackground from '../components/GameBackground';
import BrightBoostRobot from '../components/BrightBoostRobot';

const NotFound: React.FC = () => {
  return (
    <GameBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="game-card p-8 w-full max-w-md text-center">
          <h1 className="text-6xl font-bold text-brightboost-navy mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-brightboost-navy mb-6">Page Not Found</h2>
          
          <div className="mb-6">
            <BrightBoostRobot size="md" animated={false} />
          </div>
          
          <p className="text-brightboost-navy mb-8">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="game-button inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </GameBackground>
  );
};

export default NotFound;
