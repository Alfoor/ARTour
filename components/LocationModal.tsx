
import React, { useState, useEffect, useRef } from 'react';
import { Location } from '../types';
import Icon from './Icon';
import Button from './Button';
import AILocationDetails from './AILocationDetails';

interface LocationModalProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, isOpen, onClose }) => {
  const [arMessage, setArMessage] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !contentRef.current) return;
      const focusable = contentRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('keydown', trapFocus);
      // focus first element
      setTimeout(() => {
        const btn = contentRef.current?.querySelector<HTMLElement>('button');
        btn?.focus();
      }, 0);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isOpen, onClose]);

  const simulateARExperience = () => {
    if (!location) return;
    setArMessage(`AR for ${location.name} would activate now! Asset: ${location.arAsset || 'Generic model'}. Audio: ${location.audio || 'None'}.`);
    setTimeout(() => setArMessage(null), 4000);
  };

  if (!isOpen || !location) return null;

  return (
    <div
      id="locationModal"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 md:p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
        ref={contentRef}
      >
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="x" size="lg" className="text-slate-600" />
        </button>
        
        <div className="w-full h-48 md:h-64 bg-slate-200 rounded-lg mb-4 overflow-hidden">
          <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-1 text-indigo-700">{location.name}</h3>
        <p className="text-sm text-indigo-500 bg-indigo-100 inline-block px-3 py-1 rounded-full mb-4 font-medium">
          {location.theme}
        </p>
        
        <p className="text-slate-700 mb-5 leading-relaxed">{location.description}</p>
        
        <div className="mb-5">
          <h4 className="font-semibold text-slate-800 mb-2 text-md">Key Facts:</h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1.5 pl-1">
            {location.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>

        <AILocationDetails location={location} />
        
        {arMessage && (
            <div className="p-3 my-3 bg-amber-100 border border-amber-300 text-amber-700 rounded-lg text-center text-sm">
                {arMessage}
            </div>
        )}

        <Button 
            onClick={simulateARExperience}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white text-md"
            leftIcon={<Icon name="camera-rotate" />}
        >
            View in AR (Simulated)
        </Button>
      </div>
    </div>
  );
};

export default LocationModal;
