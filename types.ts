export interface ActivitySuitability {
  rating: 'Good' | 'Fair' | 'Poor';
  reason: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  condition: string;
  maxTemp: number;
  minTemp: number;
  rainChance: string;
  wind: string;
  summary: string;
  iconKeyword: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rain' | 'storm' | 'snow' | 'fog' | 'windy';
  activities: {
    sailing: ActivitySuitability;
    beach: ActivitySuitability;
    ferry: ActivitySuitability;
  };
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface WeatherResponse {
  weeklyOverview: string;
  forecast: WeatherDay[];
  groundingChunks: GroundingChunk[];
}