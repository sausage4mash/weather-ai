import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { WeatherDay } from '../types';

interface TemperatureChartProps {
  data: WeatherDay[];
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
      <h3 className="text-slate-300 text-sm font-semibold mb-4 px-2">Temperature Trend (7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            unit="°"
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Area 
            type="monotone" 
            dataKey="maxTemp" 
            stroke="#facc15" 
            fillOpacity={1} 
            fill="url(#colorMax)" 
            strokeWidth={2}
            name="Max Temp"
          />
          <Area 
            type="monotone" 
            dataKey="minTemp" 
            stroke="#60a5fa" 
            fillOpacity={1} 
            fill="url(#colorMin)" 
            strokeWidth={2}
            name="Min Temp"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};