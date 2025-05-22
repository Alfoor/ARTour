
import React from 'react';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'md', weight = 'regular', className = '' }) => {
  const sizeMap = {
    xs: 'ph-xs',
    sm: 'ph-sm',
    md: 'ph-md',
    lg: 'ph-lg',
    xl: 'ph-xl',
    '2xl': 'ph-2xl',
    '3xl': 'ph-3xl',
  };
  const weightClass = `ph-${weight}`;
  const iconClass = `ph-${name}`;
  const sizeClass = sizeMap[size];

  return <i className={`${iconClass} ${weightClass} ${sizeClass} ${className}`}></i>;
};

export default Icon;
