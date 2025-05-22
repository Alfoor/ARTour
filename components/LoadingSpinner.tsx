
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g., 'text-indigo-600'
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'text-indigo-600', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3', // Original uses border-3, which isn't standard Tailwind. Using border-2 or border-4
    lg: 'w-8 h-8 border-4',
  };

  return (
    <div 
      className={`animate-spin rounded-full ${sizeClasses[size]} border-solid border-t-transparent ${color} ${className}`}
      style={{ borderTopColor: 'transparent' }} // Ensure spinner effect
    ></div>
  );
};

export default LoadingSpinner;
