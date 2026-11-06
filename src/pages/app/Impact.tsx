import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { WastePieChart } from '../../components/charts/WastePieChart';
import { Button } from '../../components/ui/Button';
import {
  Globe2,
  Leaf,
  Zap,
  Droplets,
  Trash2,
  Share2,
  Download,
  CheckCircle2,
  TreePine,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ImpactPage: React.FC = () => {
  const { user } = useAuthStore();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Exact Section 8.1 metrics
  const stats = {
    co2: period === 'week' ? 14.2 : period === 'month' ? 56.8 : 680.4,
    energy: period === 'week' ? 30 : period === 'month' ? 120 : 1440,
    water: period === 'week' ? 240 : period === 'month' ? 980 : 11760,
    landfill: period === 'week' ? 21.5 : period === 'month' ? 85.4 : 1024.8,
    trees: period === 'week' ? 1 : period === 'month' ? 3 : 36,
  };

  // Monthly Impact Trends
  const monthlyData = [
    { month: 'Jun', co2: 38, landfill: 62 },
    { month: 'Jul', co2: 44, landfill: 69 },
    { month: 'Aug', co2: 49, landfill: 74 },
    { month: 'Sep', co2: 52, landfill: 79 },
    { month: 'Oct', co2: 54, landfill: 81 },
    { month: 'Nov', co2: 56.8, landfill: 85.4 },
  ];

  // Compare User vs Ward Average
  const comparisonData = [
    { metric: 'Segregation Purity (%)', you: 94, ward: 72 },
    { metric: 'Organic Diversion (%)', you: 88, ward: 60 },
    { metric: 'Plastic Recovery (%)', you: 92, ward: 65 },
  ];

  const handleShareSummary = () => {
    const text = `🌱 I've diverted ${stats.landfill}kg of waste from Chennai landfills and saved ${stats.co2}kg CO₂ with MyCop! Check it out: https://mycop.eco`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 3500);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Alert */}
      {copiedNotice && (
        <div className="fixed top-20 right-6 z-50 glass-card px-4 py-2 border-emerald-500/50 text-emerald-300 text-xs font-mono shadow-2xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-brand-green" />
          <span>Impact summary copied to clipboard! Ready to share.</span>
        </div>
      )}

      {/* Header with Period Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">
            Environmental Impact & ESG Metrics
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Quantified carbon offset, municipal landfill diversion and circular resource savings.
          </p>
        </div>

        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                period === p
                  ? 'bg-brand-teal text-deep font-bold'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Animated "Planet Card" */}
      <div className="glass-card p-8 border-brand-green/30 bg-gradient-to-r from-emerald-950/20 via-surface to-sky-950/20 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Verified Planetary Savings
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Equivalent to planting {stats.trees} native trees 🌳
            </h2>
            <p className="text-xs text-text-muted leading-relaxed max-w-lg">
              Your household segregation has prevented {stats.co2} kg of greenhouse gas emissions from polluting the Greater Chennai Corporation atmosphere.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleShareSummary}
                leftIcon={<Share2 size={14} />}
              >
                Share Impact Card
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-3 text-center font-mono">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <Leaf size={20} className="text-emerald-400 mx-auto mb-1" />
              <span className="text-2xl font-heading font-extrabold text-white">{stats.co2}</span>
              <p className="text-[10px] text-text-muted uppercase">kg CO₂e Offset</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <Zap size={20} className="text-sky-400 mx-auto mb-1" />
              <span className="text-2xl font-heading font-extrabold text-white">{stats.energy}</span>
              <p className="text-[10px] text-text-muted uppercase">kWh Conserved</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <Droplets size={20} className="text-teal-400 mx-auto mb-1" />
              <span className="text-2xl font-heading font-extrabold text-white">{stats.water}</span>
              <p className="text-[10px] text-text-muted uppercase">Liters Water Saved</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <Trash2 size={20} className="text-amber-400 mx-auto mb-1" />
              <span className="text-2xl font-heading font-extrabold text-white">{stats.landfill}</span>
              <p className="text-[10px] text-text-muted uppercase">kg Diverted</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Bar Chart */}
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-white text-sm">Monthly Cumulative Diversion (kg)</h3>
            <span className="text-xs font-mono text-brand-green">Consistent Growth</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="landfill" name="Diverted Waste (kg)" fill="#22E58B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="co2" name="CO₂ Offset (kg)" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stream Breakdown Donut */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <h3 className="font-heading font-bold text-white text-sm mb-2">Category Contribution</h3>
          <WastePieChart height={220} showCenterTotal={true} />
        </div>
      </div>

      {/* You vs Ward Average Benchmarking */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-white text-base">
            Benchmarking: You vs T. Nagar Ward 112 Average
          </h3>
          <span className="text-xs font-mono text-brand-teal">Top Tier Performer</span>
        </div>

        <div className="space-y-4">
          {comparisonData.map((item, idx) => (
            <div key={idx} className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>{item.metric}</span>
                <span className="text-white">
                  You: <strong className="text-brand-green">{item.you}%</strong> vs Ward:{' '}
                  <span className="text-text-muted">{item.ward}%</span>
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
                <div style={{ width: `${item.you}%` }} className="bg-brand-green rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
