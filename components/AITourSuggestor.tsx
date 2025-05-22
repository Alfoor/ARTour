
import React, { useState } from 'react';
import { suggestTourIdea } from '../services/geminiService';
import Button from './Button';
import Icon from './Icon';
import LoadingSpinner from './LoadingSpinner';
import { API_KEY_ERROR_MESSAGE } from '../constants';

interface AITourSuggestorProps {
  existingThemes: string[];
  existingTourNames: string[];
}

const AITourSuggestor: React.FC<AITourSuggestorProps> = ({ existingThemes, existingTourNames }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestTour = async () => {
    setIsLoading(true);
    setSuggestion(null);
    setError(null);
    try {
      if (!process.env.API_KEY) {
        setError(API_KEY_ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }
      const result = await suggestTourIdea(existingThemes, existingTourNames);
      if (result.startsWith("Error:")) {
        setError(result);
      } else {
        setSuggestion(result);
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button 
        onClick={handleSuggestTour} 
        isLoading={isLoading}
        disabled={isLoading || !process.env.API_KEY}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        leftIcon={<Icon name="lightbulb" />}
      >
        Suggest a New Tour
      </Button>
       {!process.env.API_KEY && <p className="mt-2 text-xs text-red-500">{API_KEY_ERROR_MESSAGE}</p>}
      {suggestion && (
        <div className="mt-3 text-sm text-slate-700 p-3 bg-purple-50 border border-purple-200 rounded-lg whitespace-pre-wrap">
          {suggestion}
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

export default AITourSuggestor;
