
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './types'; // Ensure types are part of the bundle for context, though not directly used here.

// Check if API_KEY is set (development warning)
if (!process.env.API_KEY) {
  console.warn(
    `API_KEY environment variable is not set. AI-powered features will be disabled or return an error. 
    Please ensure the API_KEY is configured in your environment.`
  );
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
