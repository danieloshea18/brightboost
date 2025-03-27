
import React from 'react';

interface GameBackgroundProps {
  children: React.ReactNode;
}

const GameBackground: React.FC<GameBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brightboost-lightblue to-white overflow-hidden relative font-montserrat">
      {/* Removed decorative floating elements */}
      {children}
    </div>
  );
};

export default GameBackground;
