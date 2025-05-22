
import React from 'react';
import Icon from './Icon';

interface HeaderProps {
  onToggleDiscoveryPanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleDiscoveryPanel }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">London History Explorer</h1>
        <button 
          onClick={onToggleDiscoveryPanel} 
          className="p-2 rounded-md hover:bg-indigo-100 lg:hidden"
          aria-label="Open discovery panel"
        >
          <Icon name="list" size="xl" className="text-indigo-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
