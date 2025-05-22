import { Location, Tour } from './types';

export const API_KEY_ERROR_MESSAGE = "API key not configured. Please set the API_KEY environment variable.";

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
// export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002'; // If image generation were needed

export const LOCATIONS_DATA: Location[] = [
  { id: "loc1", name: "Tower of London", theme: "Medieval", description: "A historic castle located on the north bank of the River Thames...", facts: ["Built by William the Conqueror in 1078", "Former royal residence and infamous prison", "Houses the Crown Jewels of England"], coords: { lat: 51.5081, lng: -0.0759 }, image: "https://picsum.photos/seed/tower/600/400", audio: "sounds/tower_speech.mp3", arAsset: "tower_model.glb" },
  { id: "loc2", name: "Roman Amphitheatre", theme: "Roman", description: "Remains of London's Roman amphitheatre, discovered in 1988...", facts: ["Site of gladiatorial games", "Could hold up to 7,000 spectators", "Rediscovered during building work"], coords: { lat: 51.5155, lng: -0.0919 }, image: "https://picsum.photos/seed/roman/600/400" },
  { id: "loc3", name: "Shakespeare's Globe", theme: "Shakespearean", description: "A reconstruction of the original Globe Theatre...", facts: ["Original Globe burned down in 1613", "Associated with William Shakespeare", "Features a thatched roof"], coords: { lat: 51.5081, lng: -0.0972 }, image: "https://picsum.photos/seed/globe/600/400", arAsset: "globe_model.glb" },
  { id: "loc4", name: "Churchill War Rooms", theme: "WWII", description: "The secret underground WWII headquarters...", facts: ["Operational from 1939-1945", "Includes Cabinet War Room", "Preserved almost exactly as left"], coords: { lat: 51.5022, lng: -0.1290 }, image: "https://picsum.photos/seed/churchill/600/400", audio: "sounds/churchill_speech.mp3" },
  { id: "loc5", name: "British Museum", theme: "Culture", description: "A public institution dedicated to human history, art and culture...", facts: ["Established in 1753", "Home to Rosetta Stone", "Over 8 million works"], coords: { lat: 51.5194, lng: -0.1270 }, image: "https://picsum.photos/seed/museum/600/400" },
  { id: "loc6", name: "Buckingham Palace", theme: "Royal", description: "The London residence of the monarch...", facts: ["Originally Buckingham House", "Official royal palace since 1837", "Has 775 rooms"], coords: { lat: 51.5014, lng: -0.1419 }, image: "https://picsum.photos/seed/palace/600/400" },
  { id: "loc7", name: "Westminster Abbey", theme: "Royal", description: "A large, mainly Gothic abbey church...", facts: ["Coronation and burial site for monarchs", "Site of royal weddings", "UNESCO World Heritage Site"], coords: { lat: 51.4994, lng: -0.1273 }, image: "https://picsum.photos/seed/abbey/600/400" },
];

export const TOURS_DATA: Tour[] = [
  { id: "tour1", name: "Roman Ruins Expedition", locations: ["loc2"], description: "Discover the ancient Roman presence in London." },
  { id: "tour2", name: "Medieval London Walk", locations: ["loc1"], description: "Explore the castles and stories of medieval London." },
  { id: "tour3", name: "Literary & Cultural Highlights", locations: ["loc3", "loc5"], description: "A journey through London's rich literary and cultural past." },
  { id: "tour4", name: "Royal London Experience", locations: ["loc6", "loc7"], description: "Visit iconic royal landmarks and learn their history." }
];

export const ALL_THEMES_VALUE = "all_themes";
export const ALL_TOURS_VALUE = "all_tours";