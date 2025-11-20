import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  Wind, 
  AlignJustify // Fog representation
} from 'lucide-react';

interface WeatherIconProps {
  keyword: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ keyword, className = "w-6 h-6" }) => {
  const normalizedKeyword = keyword.toLowerCase().trim();

  switch (normalizedKeyword) {
    case 'sunny':
    case 'clear':
      return <Sun className={`${className} text-yellow-400`} />;
    case 'partly-cloudy':
    case 'partly cloudy':
      return <CloudSun className={`${className} text-orange-300`} />;
    case 'cloudy':
    case 'overcast':
      return <Cloud className={`${className} text-gray-400`} />;
    case 'rain':
    case 'light rain':
    case 'heavy rain':
    case 'showers':
      return <CloudRain className={`${className} text-blue-400`} />;
    case 'storm':
    case 'thunderstorm':
      return <CloudLightning className={`${className} text-purple-400`} />;
    case 'snow':
      return <Snowflake className={`${className} text-cyan-200`} />;
    case 'windy':
    case 'breezy':
      return <Wind className={`${className} text-teal-300`} />;
    case 'fog':
    case 'mist':
      return <AlignJustify className={`${className} text-gray-500`} />; // Stylistic choice for fog
    default:
      return <CloudSun className={`${className} text-gray-300`} />;
  }
};