import { GoogleGenAI } from "@google/genai";
import { WeatherResponse, WeatherDay, GroundingChunk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchWeatherForecast = async (location: string = "Isle of Wight"): Promise<WeatherResponse> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    Search for the current weather forecast for ${location} for the next 7 days.
    
    You are a Pro Tourism Analyst. Based on the weather data (wind speed, rain, temperature), you must analyze the suitability for:
    1. Sailing (Wind > 30mph is Poor, 10-20mph is Good)
    2. Beach (Rain is Poor, Sunny/Cloudy > 18C is Good)
    3. Ferry Crossings (High wind/storms = Poor/Risk of cancellation)

    Generate a strict JSON object containing a weekly overview and the daily forecast, wrapped in a markdown code block like this:
    \`\`\`json
    {
      "weeklyOverview": "A short, professional executive summary of the week ahead. Mention key risks (ferry delays) or best days for activities.",
      "forecast": [ ... ]
    }
    \`\`\`

    Each object in the "forecast" array must have:
    - "day": string (e.g., "Monday")
    - "date": string (e.g., "Oct 25")
    - "condition": string (Short description)
    - "maxTemp": number (Celsius, integer)
    - "minTemp": number (Celsius, integer)
    - "rainChance": string (e.g., "0%", "50%")
    - "wind": string (e.g., "15 km/h SW")
    - "summary": string (Very short marketing summary)
    - "iconKeyword": string (One of: "sunny", "cloudy", "partly-cloudy", "rain", "storm", "snow", "fog", "windy")
    - "activities": {
        "sailing": { "rating": "Good"|"Fair"|"Poor", "reason": "Ideal wind" },
        "beach": { "rating": "Good"|"Fair"|"Poor", "reason": "Too cold" },
        "ferry": { "rating": "Good"|"Fair"|"Poor", "reason": "Calm seas" }
      }

    Ensure the data is realistic based on the search results found.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    // Extract JSON from code block
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    let parsedData: any = { weeklyOverview: "No summary available.", forecast: [] };
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        parsedData = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from Gemini response", e);
      }
    } else {
      console.warn("No JSON code block found in response.");
    }

    // Handle case where model might just return the array despite instructions (robustness)
    let forecast: WeatherDay[] = [];
    let weeklyOverview = parsedData.weeklyOverview || "Analysis complete.";

    if (Array.isArray(parsedData)) {
       forecast = parsedData;
    } else if (Array.isArray(parsedData.forecast)) {
       forecast = parsedData.forecast;
    }

    // Extract grounding metadata
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingChunks: GroundingChunk[] = chunks.map((c: any) => ({
      web: c.web ? { uri: c.web.uri, title: c.web.title } : undefined
    })).filter((c: GroundingChunk) => c.web !== undefined);

    return {
      weeklyOverview,
      forecast,
      groundingChunks
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};