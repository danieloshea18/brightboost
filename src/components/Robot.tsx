
import React from 'react';
import { cn } from '@/lib/utils';

interface RobotProps {
  className?: string;
}

const Robot: React.FC<RobotProps> = ({ className }) => {
  return (
    <div className={cn("animate-float", className)}>
      <img 
        src="/lovable-uploads/cc96fa84-1003-4ff6-8e4a-34b1dadcbbf8.png" 
        alt="Bright Bots Robot Logo" 
        className="w-40 h-auto"
      />
    </div>
  );
};

export default Robot;
