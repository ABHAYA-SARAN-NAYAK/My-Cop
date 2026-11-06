import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useBinsStore } from '../../store/useBinsStore';
import { usePickupsStore } from '../../store/usePickupsStore';
import { useRewardsStore } from '../../store/useRewardsStore';
import { useFleetStore } from '../../store/useFleetStore';
import { createDisposalAndPickup } from '../../store/actions';
import { WastePieChart } from '../../components/charts/WastePieChart';
import { CollectionTrendChart } from '../../components/charts/CollectionTrendChart';
import { SegregationGauge } from '../../components/charts/SegregationGauge';
import { BinCard } from '../../components/domain/BinCard';
import { LiveMap } from '../../components/maps/LiveMap';
import { GlassCard, StatCard } from '../../components/ui/Cards';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  Trash2,
  Calendar,
  Clock,
  ArrowRight,
  Leaf,
  Zap,
  Package,
  Award,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const bins = useBinsStore((s) => s.bins);
  const pickups = usePickupsStore((s) => s.pickups);
  const trucks = useFleetStore((s) => s.trucks);
  const { points, tier } = useRewardsStore();

  const [requestedBinIds, setRequestedBinIds] = useState<string[]>([]);

  // 3 Primary household demo bins for Priya (Section 8.1 & 10.2)
  // Recyclable: Full, Organic: Near Full, Landfill: Collecting
  const primaryBins = [
    bins.find((b) => b.type === 'plastic') || bins[0],
    bins.find((b) => b.type === 'organic') || bins[1],
    bins.find((b) => b.type === 'landfill') || bins[11],
  ];

  const handleRequestPickup = async (bin: typeof primaryBins[0]) => {
    setRequestedBinIds((prev) => [...prev, bin.id]);
    await createDisposalAndPickup(bin.type, 28, bin.location.label);
  };

  const tips = [
    'Rinsing plastic milk and oil pouches prevents foul odor and boosts batch purity to 99%.',
    'Keep dry metal cans separate from kitchen wet waste to maximize buy-back revenue on the marketplace.',
    'Did you know? Recycling 1 tonne of plastic saves 5,774 kWh of electricity for Chennai grid.',
  ];
  const [tipIndex, setTipIndex] = useState(0);

  return (
    <div className="space-y-6">
      {/* 1. Greeting Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
          </div>
          <p className="text-xs font-mono text-text-muted mt-1 flex items-center gap-2">
            <Calendar size={13} className="text-brand-teal" />
            <span>Today, November 6, 2026 · T. Nagar Ward 112, Chennai</span>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link to="/app/dispose" className="flex-1 sm:flex-none">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              leftIcon={<Trash2 size={16} />}
            >
              Dispose Waste
            </Button>
          </Link>
          <Link to="/app/tracking" className="flex-1 sm:flex-none">
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              leftIcon={<Clock size={16} />}
            >
              Track Pickup
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Top Bento Row: Total Waste + Donut Breakdown + Segregation Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Total Collected Today KPI (Deck Slide 9) */}
        <div className="lg:col-span-4 glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-text-muted">
                Total Waste Collected Today
              </span>
              <span className="text-xs font-mono font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                +18.4%
              </span>
            </div>
            {/* Huge Number 85.4 kg */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-heading font-extrabold text-white tracking-tight">
                85.4
              </span>
              <span className="text-xl font-mono text-text-muted">kg</span>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Aggregated across your residential block and local smart drop-offs.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-sky-400">Recyclable (42%):</span>
              <span className="text-white font-bold">35.9 kg</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-emerald-400">Organic Biomass (36%):</span>
              <span className="text-white font-bold">30.7 kg</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-amber-400">Landfill / Other (22%):</span>
              <span className="text-white font-bold">18.8 kg</span>
            </div>
          </div>
        </div>

        {/* Donut Chart Breakdown (Deck error fixed: exactly 42 / 36 / 22 = 100%) */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-sm text-white">Stream Distribution</h3>
            <span className="text-[10px] font-mono text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full border border-brand-teal/20">
              100% Balanced
            </span>
          </div>
          <WastePieChart height={200} showCenterTotal={true} />
        </div>

        {/* Segregation Score Ring */}
        <div className="lg:col-span-3 glass-card p-6">
          <SegregationGauge score={94} />
        </div>
      </div>

      {/* 3. Bin Status Overview (3 Liquid-Fill Cards from Section 8.1 & 10.2) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-white text-base">Your Active Smart Bins</h3>
            <span className="text-xs font-mono text-text-muted">(Panagal Park Sector)</span>
          </div>
          <Link
            to="/app/bins"
            className="text-xs text-brand-teal hover:underline flex items-center gap-1 font-mono"
          >
            <span>View All 24 City Bins</span> <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryBins.map((bin, idx) => (
            <BinCard
              key={bin.id}
              bin={bin}
              onRequestPickup={handleRequestPickup}
              isPickupRequested={requestedBinIds.includes(bin.id)}
            />
          ))}
        </div>
      </div>

      {/* 4. Environmental Impact KPI Cards (Deck Slide 9) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={Leaf}
          iconColor="#4ADE80"
          label="CO₂ Emissions Saved"
          value="56.8"
          unit="kg CO₂e"
          trend="+12% this week"
          subtitle="Equal to planting 3 native Neem trees"
        />
        <StatCard
          icon={Zap}
          iconColor="#38BDF8"
          label="Energy Preserved"
          value="120"
          unit="kWh"
          trend="Saved grid load"
          subtitle="Powers an urban home for 14 days"
        />
        <StatCard
          icon={Package}
          iconColor="#A78BFA"
          label="Plastic Items Recycled"
          value="230"
          unit="items"
          trend="100% pelletized"
          subtitle="Diverted from Ennore coastline"
        />
      </div>

      {/* 5. Middle Grid: Trends Line Chart + Recent Pickups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Collection Trends Line Chart */}
        <div className="lg:col-span-7 glass-card p-6">
          <CollectionTrendChart />
        </div>

        {/* Recent Pickups Timeline (Exact items from Section 8.1) */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-sm text-white">Recent Pickup Activity</h3>
              <Link to="/app/tracking" className="text-xs text-brand-teal font-mono hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { time: '10:15 AM', text: 'Recycle Bin Emptied', truck: 'Truck TRK-04', done: true },
                { time: '11:30 AM', text: 'Organic Bin Emptied', truck: 'Truck TRK-01', done: true },
                { time: '01:45 PM', text: 'All Sector Bins Collected', truck: 'Karthik R. (TRK-02)', done: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">{item.text}</span>
                      <span className="text-[11px] font-mono text-text-muted">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-text-muted font-mono mt-0.5">{item.truck}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rotating Tip Card */}
          <div className="mt-6 pt-4 border-t border-white/5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
            <div className="flex items-start gap-2">
              <Lightbulb size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-white">Segregation Tip:</span>
                <p className="text-text-muted mt-0.5 leading-snug">{tips[tipIndex]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Bottom Row: Rewards Mini Card + Mini Live Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rewards Mini Card */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-text-muted">Citizen Rewards</span>
              <span className="text-xs font-mono font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                Tier: {tier}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-heading font-extrabold text-white">{points}</span>
              <span className="text-sm font-mono text-brand-green">Green Points</span>
            </div>

            {/* Progress bar to next tier */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-mono text-text-muted mb-1">
                <span>Current: Tree Tier</span>
                <span>Next: Forest Guardian (3,000 pts)</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gradient rounded-full"
                  style={{ width: `${Math.min(100, (points / 3000) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-text-muted">Redeem vouchers, metro transit or tree saplings</span>
            <Link to="/app/rewards">
              <Button size="sm" variant="primary" rightIcon={<Award size={14} />}>
                Redeem Rewards
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Tracking Mini Map */}
        <div className="lg:col-span-7 glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold text-sm text-white">Live Ward Logistics</h3>
              <p className="text-[11px] text-text-muted font-mono">Trucks and nearby smart bins in real-time</p>
            </div>
            <Link
              to="/app/tracking"
              className="text-xs text-brand-teal hover:underline flex items-center gap-1 font-mono"
            >
              <span>Full Screen Tracking</span> <ExternalLink size={13} />
            </Link>
          </div>

          <div className="h-44 w-full rounded-xl overflow-hidden border border-white/10">
            <LiveMap
              bins={primaryBins}
              trucks={trucks.slice(0, 3)}
              height="100%"
              center={[13.0418, 80.2341]}
              zoom={13}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
