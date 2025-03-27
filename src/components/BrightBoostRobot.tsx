
import React from 'react';
import { cn } from '../lib/utils';

interface RobotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const BrightBoostRobot: React.FC<RobotProps> = ({ 
  className, 
  size = 'md',
  animated = false  // Changed default to false
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };
  
  return (
    <div className={cn(
      sizeClasses[size],
      animated && "animate-float",
      className
    )}>
      <img 
        src="/lovable-uploads/1b92ce32-1b02-4e77-b5f2-372220b165e0.png" 
        alt="Bright Boost Robot" 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};

export default BrightBoostRobot;
