import React, { useState, useEffect, useCallback } from 'react';
import { Location, Tour } from './types'; // FilterType removed as it's not directly used in App.tsx
import { LOCATIONS_DATA, TOURS_DATA, ALL_THEMES_VALUE, ALL_TOURS_VALUE } from './constants';
import Header from './components/Header';
import MapArea from './components/MapArea';
import LocationList from './components/LocationList';
import DiscoveryPanel from './components/DiscoveryPanel';
import LocationModal from './components/LocationModal';
import FloatingActionButton from './components/FloatingActionButton';

const App: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  // Locations and Tours data are now directly from constants, no need for state if not modified.
  // const [locationsData, setLocationsData] = useState<Location[]>(LOCATIONS_DATA); 
  // const [toursData, setToursData] = useState<Tour[]>(TOURS_DATA);
  const [themes, setThemes] = useState<string[]>([]);
  
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(LOCATIONS_DATA);
  const [activeTheme, setActiveTheme] = useState<string>(ALL_THEMES_VALUE);
  const [activeTour, setActiveTour] = useState<string>(ALL_TOURS_VALUE);
  
  const [isDiscoveryPanelOpen, setIsDiscoveryPanelOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUserId('anonymousUser-' + Math.random().toString(36).substr(2, 9));
    const uniqueThemes = [...new Set(LOCATIONS_DATA.map(loc => loc.theme))].sort();
    setThemes(uniqueThemes);
  }, []);

  const filterLocations = useCallback(() => {
    let newFilteredLocations = [...LOCATIONS_DATA];

    if (activeTour !== ALL_TOURS_VALUE) {
      const tour = TOURS_DATA.find(t => t.id === activeTour);
      if (tour) {
        newFilteredLocations = LOCATIONS_DATA.filter(loc => tour.locations.includes(loc.id));
      }
    } else if (activeTheme !== ALL_THEMES_VALUE) {
      newFilteredLocations = LOCATIONS_DATA.filter(loc => loc.theme === activeTheme);
    }
    setFilteredLocations(newFilteredLocations);
  }, [activeTheme, activeTour]);

  useEffect(() => {
    filterLocations();
  }, [filterLocations]);

  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
    setActiveTour(ALL_TOURS_VALUE); 
    if (isDiscoveryPanelOpen && window.innerWidth < 1024) { // Close panel on mobile after selection
      // setIsDiscoveryPanelOpen(false); // Optional: reconsider if this is desired UX
    }
  };

  const handleTourChange = (tourId: string) => {
    setActiveTour(tourId);
    setActiveTheme(ALL_THEMES_VALUE); 
     if (isDiscoveryPanelOpen && window.innerWidth < 1024) { // Close panel on mobile after selection
      // setIsDiscoveryPanelOpen(false); // Optional: reconsider if this is desired UX
    }
  };

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  const toggleDiscoveryPanel = () => {
    setIsDiscoveryPanelOpen(!isDiscoveryPanelOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-800 overflow-hidden"> {/* Ensure full height and prevent body scroll */}
      <Header onToggleDiscoveryPanel={toggleDiscoveryPanel} />
      
      <DiscoveryPanel
        isOpen={isDiscoveryPanelOpen}
        onClose={toggleDiscoveryPanel}
        themes={themes}
        activeTheme={activeTheme}
        onThemeChange={handleThemeChange}
        tours={TOURS_DATA} // Pass TOURS_DATA directly
        activeTour={activeTour}
        onTourChange={handleTourChange}
        userId={userId}
      />

      {isDiscoveryPanelOpen && (
         <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" // z-index lower than panel
            onClick={toggleDiscoveryPanel}
            aria-hidden="true"
          ></div>
      )}

      {/* Main content area */}
      <div className="flex-grow container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-hidden"> {/* Prevent this div from scrolling, children will handle scroll */}
        <main className="w-full md:flex-grow h-[300px] sm:h-[400px] md:h-auto md:min-h-0"> {/* Map takes available space, min-h-0 for flex shrink */}
          <MapArea locations={filteredLocations} onPinClick={handleSelectLocation} />
        </main>
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white p-4 rounded-lg shadow-lg flex flex-col md:h-full md:max-h-[calc(100vh-110px)] overflow-hidden"> {/* Ensure aside can scroll internally and has a max height */}
            <h2 className="text-xl font-semibold mb-4 text-indigo-700 shrink-0">Locations</h2>
            <div className="overflow-y-auto flex-grow pr-1"> {/* List grows and scrolls */}
              <LocationList locations={filteredLocations} onSelectLocation={handleSelectLocation} />
            </div>
        </aside>
      </div>
      
      <LocationModal 
        location={selectedLocation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <FloatingActionButton 
        onClick={toggleDiscoveryPanel} 
        iconName="magnifying-glass"
        label="Open discovery filters"
        className="lg:hidden" // Ensure FAB is hidden on larger screens where panel toggle is in header
      />
    </div>
  );
};

export default App;