export interface Coordinates {
  lat: number; 
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  theme: string;
  description: string;
  facts: string[];
  coords: Coordinates;
  image: string; // URL for the location image
  audio?: string; // URL for audio narration
  arAsset?: string; // Identifier or URL for AR asset
}

export interface Tour {
  id: string;
  name: string;
  description?: string;
  locations: string[]; // Array of location IDs
}

export enum FilterType {
  All = "all",
  Theme = "theme",
  Tour = "tour",
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web: GroundingChunkWeb;
}
export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}