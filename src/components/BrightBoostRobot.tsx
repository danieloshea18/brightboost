
import React from 'react';

interface RobotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const BrightBoostRobot: React.FC<RobotProps> = ({ 
  className = '', 
  size = 'md',
  animated = false 
}) => {
  // Calculate sizes based on the size prop
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  // Create animation classes if animated is true
  const animationClass = animated ? 'animate-bounce' : '';

  return (
    <div className={`bg-brightboost-blue rounded-full ${dimensions[size]} ${animationClass} ${className}`}>
      {/* Simple robot face */}
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          {size === 'sm' ? '🤖' : size === 'md' ? '🤖' : '🤖'}
        </div>
      </div>
    </div>
  );
};

export default BrightBoostRobot;
