
import React, { useState, useEffect } from 'react';
import { getMoreLocationDetails } from '../services/geminiService';
import { Location, GroundingChunk, GroundingMetadata } from '../types';
import Button from './Button';
import Icon from './Icon';
import LoadingSpinner from './LoadingSpinner';
import { API_KEY_ERROR_MESSAGE } from '../constants';

interface AILocationDetailsProps {
  location: Location | null;
}

const AILocationDetails: React.FC<AILocationDetailsProps> = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<GroundingChunk[]>([]);

  useEffect(() => {
    // Reset state when location changes
    setDetails(null);
    setError(null);
    setIsLoading(false);
    setGroundingSources([]);
  }, [location]);

  const handleTellMeMore = async () => {
    if (!location) return;
    setIsLoading(true);
    setDetails(null);
    setError(null);
    setGroundingSources([]);

    try {
      if (!import.meta.env.VITE_API_KEY) {
        setError(API_KEY_ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }
      const result = await getMoreLocationDetails(location.name, location.facts);
      if (result.text.startsWith("Error:")) {
        setError(result.text);
      } else {
        setDetails(result.text);
        if (result.groundingMetadata?.groundingChunks) {
            setGroundingSources(result.groundingMetadata.groundingChunks);
        }
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred while fetching details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!location) return null;

  return (
    <div className="mt-6 mb-4">
      <Button
        onClick={handleTellMeMore}
        isLoading={isLoading}
        disabled={isLoading || !import.meta.env.VITE_API_KEY}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white text-md"
        leftIcon={<Icon name="chat-circle-dots" />}
      >
        Tell Me More (AI)
      </Button>
      {!import.meta.env.VITE_API_KEY && (
        <p className="mt-2 text-xs text-red-500">{API_KEY_ERROR_MESSAGE}</p>
      )}

      {details && (
        <div className="gemini-response bg-sky-50 border-l-4 border-sky-500 p-3 mt-4 rounded-md text-sm">
          <p className="whitespace-pre-wrap">{details}</p>
          {groundingSources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-sky-200">
              <h5 className="text-xs font-semibold text-sky-700 mb-1">Sources:</h5>
              <ul className="list-disc list-inside space-y-0.5">
                {groundingSources.map((source, index) => (
                  <li key={index} className="text-xs">
                    <a 
                      href={source.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sky-600 hover:text-sky-800 underline"
                    >
                      {source.web.title || source.web.uri}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="mt-3 text-sm text-red-600 p-3 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default AILocationDetails;
