import React from 'react';
import { WeatherDay, ActivitySuitability } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Anchor, Palmtree, Ship } from 'lucide-react';

interface DailyCardProps {
  dayData: WeatherDay;
  isToday?: boolean;
}

const ActivityBadge: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  data: ActivitySuitability; 
  compact?: boolean 
}> = ({ icon: Icon, label, data, compact = false }) => {
  const getColor = (rating: string) => {
    switch (rating) {
      case 'Good': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Fair': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Poor': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-800';
    }
  };

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg border ${getColor(data.rating)}`}>
      <Icon className="w-4 h-4 shrink-0" />
      <div className="overflow-hidden">
        {!compact && <p className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">{label}</p>}
        <p className="text-xs font-medium truncate">{data.reason}</p>
      </div>
    </div>
  );
};

export const DailyCard: React.FC<DailyCardProps> = ({ dayData, isToday = false }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full
        ${isToday 
          ? 'bg-gradient-to-br from-blue-600 to-blue-900 shadow-xl shadow-blue-900/50 border border-blue-400/30 p-6' 
          : 'bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/80 p-5'
        }
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-bold ${isToday ? 'text-white' : 'text-slate-200'}`}>
            {isToday ? 'Today' : dayData.day}
          </h3>
          <p className={`text-sm ${isToday ? 'text-blue-100' : 'text-slate-400'}`}>
            {dayData.date}
          </p>
        </div>
        <WeatherIcon keyword={dayData.iconKeyword} className={isToday ? "w-12 h-12" : "w-10 h-10"} />
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-white">
          {dayData.maxTemp}°
        </span>
        <span className={`text-lg ${isToday ? 'text-blue-200' : 'text-slate-400'}`}>
          / {dayData.minTemp}°
        </span>
      </div>

      <p className={`mb-4 text-sm font-medium ${isToday ? 'text-blue-100' : 'text-slate-300'}`}>
        {dayData.condition}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
        <div className="flex items-center gap-1" title="Precipitation Chance">
          <Droplets className="w-3 h-3 text-blue-400" />
          <span>{dayData.rainChance}</span>
        </div>
        <div className="flex items-center gap-1" title="Wind Speed">
          <Wind className="w-3 h-3 text-teal-400" />
          <span>{dayData.wind}</span>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className={`mt-auto pt-4 border-t ${isToday ? 'border-blue-500/30' : 'border-slate-700/50'} space-y-2`}>
        <ActivityBadge icon={Ship} label="Ferry" data={dayData.activities.ferry} compact={!isToday} />
        <ActivityBadge icon={Anchor} label="Sailing" data={dayData.activities.sailing} compact={!isToday} />
        <ActivityBadge icon={Palmtree} label="Beach" data={dayData.activities.beach} compact={!isToday} />
      </div>
    </div>
  );
};