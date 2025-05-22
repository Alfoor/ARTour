
import React from 'react';
import { Tour } from '../types';
import ThemeFilter from './ThemeFilter';
import TourSelector from './TourSelector';
import AITourSuggestor from './AITourSuggestor';
import Icon from './Icon';

interface DiscoveryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  themes: string[];
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  tours: Tour[];
  activeTour: string;
  onTourChange: (tourId: string) => void;
  userId: string;
}

const DiscoveryPanel: React.FC<DiscoveryPanelProps> = ({
  isOpen,
  onClose,
  themes,
  activeTheme,
  onThemeChange,
  tours,
  activeTour,
  onTourChange,
  userId,
}) => {
  return (
    <div
      id="discovery-panel"
      className={`fixed top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <button 
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 transition-colors" 
        onClick={onClose}
        aria-label="Close discovery panel"
      >
        <Icon name="x" size="lg" className="text-slate-600" />
      </button>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Discover London</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-700">Filter by Theme</h3>
        <ThemeFilter themes={themes} activeTheme={activeTheme} onThemeChange={onThemeChange} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-700">Select a Tour</h3>
        <TourSelector tours={tours} activeTour={activeTour} onTourChange={onTourChange} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-700">AI Tour Ideas</h3>
        <AITourSuggestor existingThemes={themes} existingTourNames={tours.map(t => t.name)} />
      </div>

      <div className="mt-auto pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">User ID: <span className="font-mono">{userId}</span></p>
      </div>
    </div>
  );
};

export default DiscoveryPanel;
