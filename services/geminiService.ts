
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStrategyTips = async (map: string, playStyle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 pro-level Free Fire strategy tips for the map ${map} assuming a ${playStyle} playstyle. Keep it concise and focused on high-tier competitive gameplay.`,
    });
    return response.text || "I'm having trouble connecting to the Garena servers. Try again later, survivor!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error getting strategies. Check your internet connection.";
  }
};

export const generateTournamentName = async (format: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 catchy and aggressive tournament names for a Free Fire ${format} tournament.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return ["Booyah Championship", "Survival Cup", "Zone Warriors", "Last One Standing", "Rush Hour"];
  }
};
