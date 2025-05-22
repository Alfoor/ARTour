
import React from 'react';
import { Tour } from '../types';
import { ALL_TOURS_VALUE } from '../constants';

interface TourSelectorProps {
  tours: Tour[];
  activeTour: string;
  onTourChange: (tourId: string) => void;
}

const TourSelector: React.FC<TourSelectorProps> = ({ tours, activeTour, onTourChange }) => {
  return (
    <select
      id="tour-selector"
      value={activeTour}
      onChange={(e) => onTourChange(e.target.value)}
      className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value={ALL_TOURS_VALUE}>All Locations (No Tour)</option>
      {tours.map(tour => (
        <option key={tour.id} value={tour.id}>{tour.name}</option>
      ))}
    </select>
  );
};

export default TourSelector;
