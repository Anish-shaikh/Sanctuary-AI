"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CheckIn } from '@/lib/types';
import { format } from 'date-fns';

interface TrendChartProps {
  data: CheckIn[];
  baseline: number;
}

export function TrendChart({ data, baseline }: TrendChartProps) {
  const chartData = data.map(d => ({
    date: format(new Date(d.date), 'MMM dd'),
    distress: d.distressScore,
    drift: d.linguisticDriftScore,
    baseline: baseline
  }));

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDistress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDrift" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeDasharray="5 5" name="Personal Baseline" />
          <Area type="monotone" dataKey="distress" stroke="#ef4444" fillOpacity={1} fill="url(#colorDistress)" name="Distress Score" />
          <Area type="monotone" dataKey="drift" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDrift)" name="Linguistic Drift" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
