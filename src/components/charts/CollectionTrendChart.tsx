import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CollectionTrendChart: React.FC = () => {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');

  const data7d = [
    { day: 'Mon', recyclable: 28, organic: 24, landfill: 14 },
    { day: 'Tue', recyclable: 32, organic: 26, landfill: 12 },
    { day: 'Wed', recyclable: 30, organic: 28, landfill: 15 },
    { day: 'Thu', recyclable: 34, organic: 25, landfill: 11 },
    { day: 'Fri', recyclable: 39, organic: 31, landfill: 18 },
    { day: 'Sat', recyclable: 44, organic: 35, landfill: 20 },
    { day: 'Sun', recyclable: 35.9, organic: 30.7, landfill: 18.8 },
  ];

  const data30d = [
    { day: 'W1', recyclable: 190, organic: 165, landfill: 95 },
    { day: 'W2', recyclable: 215, organic: 180, landfill: 88 },
    { day: 'W3', recyclable: 235, organic: 195, landfill: 82 },
    { day: 'W4', recyclable: 258, organic: 210, landfill: 75 },
  ];

  const data = period === '7d' ? data7d : data30d;

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-heading font-semibold text-sm text-white">Daily Waste Link Trends</h4>
          <p className="text-[11px] text-text-muted font-mono">Weight collected across streams (kg)</p>
        </div>
        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setPeriod('7d')}
            className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
              period === '7d' ? 'bg-brand-teal text-deep font-semibold shadow-sm' : 'text-text-muted hover:text-white'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
              period === '30d' ? 'bg-brand-teal text-deep font-semibold shadow-sm' : 'text-text-muted hover:text-white'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRecyclable" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradLandfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-surface/95 p-3 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md text-xs font-mono">
                      <p className="font-bold text-white mb-2">{label}</p>
                      {payload.map((entry: any, i: number) => (
                        <p key={i} className="flex justify-between gap-4" style={{ color: entry.color }}>
                          <span>{entry.name}:</span>
                          <span className="font-bold">{entry.value} kg</span>
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="recyclable"
              name="Recyclable"
              stroke="#38BDF8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradRecyclable)"
            />
            <Area
              type="monotone"
              dataKey="organic"
              name="Organic"
              stroke="#4ADE80"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradOrganic)"
            />
            <Area
              type="monotone"
              dataKey="landfill"
              name="Landfill"
              stroke="#FBBF24"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradLandfill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
