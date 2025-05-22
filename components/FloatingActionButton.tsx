
import React from 'react';
import Icon from './Icon';

interface FloatingActionButtonProps {
  onClick: () => void;
  iconName: string;
  label?: string; // Accessibility label
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onClick, 
  iconName, 
  label = "Open menu",
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`fixed bottom-5 left-5 z-[1000] bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-indigo-700 transition-colors duration-150 ease-in-out lg:hidden ${className}`}
    >
      <Icon name={iconName} size="xl" weight="bold" />
    </button>
  );
};

export default FloatingActionButton;
