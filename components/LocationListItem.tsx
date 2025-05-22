
import React from 'react';
import { Location } from '../types';

interface LocationListItemProps {
  location: Location;
  onSelectLocation: (location: Location) => void;
}

const LocationListItem: React.FC<LocationListItemProps> = ({ location, onSelectLocation }) => {
  return (
    <div
      className="location-card bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-0.5"
      onClick={() => onSelectLocation(location)}
    >
      <h3 className="text-md font-semibold text-indigo-700 mb-1">{location.name}</h3>
      <p className="text-xs text-amber-600 bg-amber-100 inline-block px-2 py-0.5 rounded-full mb-1.5 font-medium">{location.theme}</p>
      <p className="text-slate-600 text-sm leading-tight line-clamp-2">{location.description}</p>
    </div>
  );
};

export default LocationListItem;
