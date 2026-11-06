import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface WastePieChartProps {
  height?: number;
  showCenterTotal?: boolean;
}

export const WastePieChart: React.FC<WastePieChartProps> = ({
  height = 240,
  showCenterTotal = true,
}) => {
  // Exact numbers from PRD Section 8.1
  const data = [
    { name: 'Recyclable Plastic', value: 42, weight: 35.9, color: '#38BDF8' },
    { name: 'Organic Biomass', value: 36, weight: 30.7, color: '#4ADE80' },
    { name: 'Landfill / Other', value: 22, weight: 18.8, color: '#FBBF24' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div style={{ width: '100%', height }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-surface/95 p-2.5 rounded-xl border border-white/10 shadow-xl backdrop-blur-md text-xs font-mono">
                      <p className="font-bold flex items-center gap-1.5" style={{ color: item.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </p>
                      <p className="text-white mt-1">
                        {item.value}% <span className="text-text-muted">({item.weight} kg)</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              innerRadius="65%"
              outerRadius="88%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Overlay */}
        {showCenterTotal && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-heading font-extrabold text-white tracking-tight">
              85.4
            </span>
            <span className="text-[10px] font-mono uppercase text-text-muted">Total kg</span>
          </div>
        )}
      </div>

      {/* Legend Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-text-main font-medium">{item.name.split(' ')[0]}:</span>
            <span className="text-text-muted">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
