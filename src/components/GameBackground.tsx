
import React from 'react';

interface GameBackgroundProps {
  children: React.ReactNode;
}

const GameBackground: React.FC<GameBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brightboost-lightblue to-white overflow-hidden relative font-montserrat">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-brightboost-blue opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-brightboost-yellow opacity-20 animate-float-delay"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-brightboost-navy opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-brightboost-lightblue opacity-30 animate-float-slow"></div>
      </div>
      
      {children}
    </div>
  );
};

export default GameBackground;
