
import React from 'react';
import { ALL_THEMES_VALUE } from '../constants';
import Icon from './Icon';

interface ThemeFilterProps {
  themes: string[];
  activeTheme: string;
  onThemeChange: (theme: string) => void;
}

const getIconForTheme = (theme: string): string => {
    if (theme === ALL_THEMES_VALUE) return 'map-trifold';
    if (theme === 'Roman') return 'shield-roman';
    if (theme === 'Medieval') return 'castle-turret';
    if (theme === 'Shakespearean') return 'scroll';
    if (theme === 'WWII') return 'airplane';
    if (theme === 'Culture') return 'paint-brush-broad';
    if (theme === 'Royal') return 'crown-simple';
    return 'map-pin';
};


const ThemeFilter: React.FC<ThemeFilterProps> = ({ themes, activeTheme, onThemeChange }) => {
  const allThemesOption = { value: ALL_THEMES_VALUE, label: "All Themes" };
  const themeOptions = [
    allThemesOption,
    ...themes.map(theme => ({ value: theme, label: theme }))
  ];

  return (
    <div id="theme-filter-buttons" className="space-y-2">
      {themeOptions.map(themeOption => (
        <button
          key={themeOption.value}
          data-theme={themeOption.value}
          onClick={() => onThemeChange(themeOption.value)}
          className={`filter-button w-full text-left font-medium py-2.5 px-4 rounded-lg flex items-center transition-colors duration-150 ease-in-out
            ${activeTheme === themeOption.value 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-transparent hover:border-slate-300'
            }`}
        >
          <Icon name={getIconForTheme(themeOption.value)} className="mr-2" />
          {themeOption.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeFilter;
