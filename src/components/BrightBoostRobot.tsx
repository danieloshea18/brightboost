
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
  animated = false
}) => {
  // The component will be empty since we're removing the image completely
  return null;
};

export default BrightBoostRobot;
