
import { GoogleGenAI, GenerateContentResponse, GroundingMetadata } from "@google/genai";
import { GEMINI_TEXT_MODEL, API_KEY_ERROR_MESSAGE } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const parseAndCleanJson = (text: string): any => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Raw string:", jsonStr);
    // Fallback: return the original text if it's not valid JSON, maybe it's a plain text fallback.
    // Or throw a custom error to be handled by the caller.
    // For now, returning null or a specific error object might be better.
    throw new Error("AI response was not valid JSON.");
  }
};


export const suggestTourIdea = async (existingThemes: string[], existingTourNames: string[]): Promise<string> => {
  if (!ai) {
    console.error(API_KEY_ERROR_MESSAGE);
    return `Error: ${API_KEY_ERROR_MESSAGE}`;
  }
  if (!API_KEY) throw new Error(API_KEY_ERROR_MESSAGE);

  const prompt = `You are a creative tour guide assistant for London.
Based on the following existing historical themes in London: ${existingThemes.join(', ')}.
And considering these existing tour names to avoid duplicates: ${existingTourNames.join(', ')}.
Suggest ONE new, creative thematic walking tour idea.
Provide a catchy, unique tour name and a brief 1-2 sentence description.
Format your response as:
Tour Name: [Name]
Description: [Description]`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      // config: { thinkingConfig: { thinkingBudget: 0 } } // For low latency if needed
    });
    return response.text;
  } catch (error) {
    console.error("Error suggesting tour idea with Gemini API:", error);
    return "Error: Could not generate tour suggestion from AI.";
  }
};

export const getMoreLocationDetails = async (locationName: string, existingFacts: string[]): Promise<{ text: string; groundingMetadata?: GroundingMetadata }> => {
  if (!ai) {
    console.error(API_KEY_ERROR_MESSAGE);
    return { text: `Error: ${API_KEY_ERROR_MESSAGE}` };
  }
  if (!API_KEY) throw new Error(API_KEY_ERROR_MESSAGE);

  const prompt = `Tell me an interesting story, a lesser-known fact, or a fascinating anecdote about "${locationName}" in London.
This information will be presented to tourists in an app.
Avoid simply rephrasing these known facts: ${existingFacts.join('; ')}.
Keep it concise, about 2-4 sentences, and engaging.
If possible, use Google Search grounding to provide up-to-date or very specific information.`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      }
    });
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    return { text: response.text, groundingMetadata };
  } catch (error) {
    console.error(`Error getting more details for ${locationName} with Gemini API:`, error);
    return { text: `Error: Could not fetch additional details for ${locationName} from AI.` };
  }
};
