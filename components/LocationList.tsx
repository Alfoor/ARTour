
import React from 'react';
import { Location } from '../types';
import LocationListItem from './LocationListItem';

interface LocationListProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, onSelectLocation }) => {
  return (
    <div id="location-list" className="space-y-3 pr-1">
      {locations.length === 0 ? (
        <p id="no-results" className="text-slate-500 text-center py-4">No locations match the current filters.</p>
      ) : (
        locations.map(loc => (
          <LocationListItem key={loc.id} location={loc} onSelectLocation={onSelectLocation} />
        ))
      )}
    </div>
  );
};

export default LocationList;
