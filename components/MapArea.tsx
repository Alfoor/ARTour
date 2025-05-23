import React, { useEffect, useRef } from 'react';
import { Location } from '../types';
import L from 'leaflet'; // Import Leaflet
import Icon from './Icon'; // Import Icon component
import { LOCATIONS_DATA } from '../constants';

// It's good practice to delete Leaflet's default icon and use custom ones or re-set if needed.
// Example of fixing default icon path issues if they arise with bundlers:
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
// import iconUrl from 'leaflet/dist/images/marker-icon.png';
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// delete (L.Icon.Default.prototype as any)._getIconUrl; // A common fix for Webpack/Parcel
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: iconRetinaUrl, // Use imported variable
//   iconUrl: iconUrl, // Use imported variable
//   shadowUrl: shadowUrl, // Use imported variable
// });


interface MapAreaProps {
  locations: Location[];
  onPinClick: (location: Location) => void;
}

const MapArea: React.FC<MapAreaProps> = ({ locations, onPinClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userLocationMarkerRef = useRef<L.CircleMarker | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const allBounds = L.latLngBounds(LOCATIONS_DATA.map(loc => [loc.coords.lat, loc.coords.lng]));
  const DEFAULT_CENTER: [number, number] = allBounds.isValid()
    ? [allBounds.getCenter().lat, allBounds.getCenter().lng]
    : [51.505, -0.09];
  const DEFAULT_ZOOM = 12;

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false // Disable default zoom control to potentially add custom later
      }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      
      // Add zoom control to a different position
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Update markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing location markers
    markersRef.current.forEach(marker => marker.removeFrom(map));
    markersRef.current = [];

    // Add new location markers
    locations.forEach(loc => {
      const defaultIcon = new L.Icon.Default(); // Standard icon for locations
      const marker = L.marker([loc.coords.lat, loc.coords.lng], { icon: defaultIcon })
        .addTo(map)
        .bindTooltip(loc.name, { permanent: false, direction: 'top', offset: L.point(0, -defaultIcon.options.iconSize[1]/2) });
      
      marker.on('click', () => onPinClick(loc));
      markersRef.current.push(marker);
    });

    // Optional: Fit map to bounds of new markers
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.coords.lat, loc.coords.lng]));
      if (bounds.isValid()) {
         map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    } else if (mapInstanceRef.current) {
        // If no locations, reset to the average center of all known locations
        mapInstanceRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }

  }, [locations, onPinClick]);

  const handleShowUserLocation = () => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const userLatLng = L.latLng(latitude, longitude);

      if (userLocationMarkerRef.current) {
        userLocationMarkerRef.current.setLatLng(userLatLng);
      } else {
        userLocationMarkerRef.current = L.circleMarker(userLatLng, {
          radius: 8,
          fillColor: "#3b82f6",
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        })
          .addTo(map)
          .bindTooltip("Your Location", { permanent: false, direction: "top" });
      }

      map.setView(userLatLng, 15);
    };

    const onError = (error: GeolocationPositionError) => {
      console.error("Error getting user location:", error);
      let message = "Could not retrieve your location.";
      if (error.code === error.PERMISSION_DENIED) {
        message = "Location access denied. Please enable it in your browser settings.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        message = "Location information is unavailable.";
      } else if (error.code === error.TIMEOUT) {
        message = "The request to get user location timed out.";
      }
      alert(message);
    };

    if (watchIdRef.current === null) {
      watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        maximumAge: 0,
      });
    } else if (userLocationMarkerRef.current) {
      map.setView(userLocationMarkerRef.current.getLatLng(), 15);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div id="map-area-leaflet" ref={mapContainerRef} className="w-full h-full rounded-lg shadow-lg" />
      <button
        onClick={handleShowUserLocation}
        title="Show my location"
        aria-label="Show my location"
        className="absolute bottom-20 right-2 z-[1000] bg-white p-2.5 rounded-full shadow-lg hover:bg-slate-100 transition-colors duration-150"
      >
        <Icon name="crosshair" size="lg" className="text-slate-700" />
      </button>
    </div>
  );
};

export default MapArea;
