import React, { useState } from 'react';
import { SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/format';
import {
  Calculator,
  Building,
  TrendingUp,
  DollarSign,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenuePage: React.FC = () => {
  // Interactive Calculator State
  const [citiesCount, setCitiesCount] = useState<number>(3);
  const [binsPerCity, setBinsPerCity] = useState<number>(500);
  const [municipalFeePerBin, setMunicipalFeePerBin] = useState<number>(350); // ₹/bin/month
  const [monthlyMarketplaceVolume, setMonthlyMarketplaceVolume] = useState<number>(1500000); // ₹15L
  const [takeRatePercent, setTakeRatePercent] = useState<number>(4.0); // 4%
  const [biogasUnitsSold, setBiogasUnitsSold] = useState<number>(1200); // cylinders/month @ ₹650

  // Computed Financials
  const totalBins = citiesCount * binsPerCity;
  const monthlySaaSRevenue = totalBins * municipalFeePerBin;
  const monthlyMarketplaceRevenue = (monthlyMarketplaceVolume * takeRatePercent) / 100;
  const monthlyBioProductRevenue = biogasUnitsSold * 650;
  const totalMonthlyRevenue = monthlySaaSRevenue + monthlyMarketplaceRevenue + monthlyBioProductRevenue;
  const totalAnnualRevenue = totalMonthlyRevenue * 12;

  // Monthly breakdown data for chart
  const breakdownData = [
    {
      category: 'Projected Monthly',
      saas: Math.round(monthlySaaSRevenue / 1000),
      market: Math.round(monthlyMarketplaceRevenue / 1000),
      bio: Math.round(monthlyBioProductRevenue / 1000),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Revenue Model & Financial Projections
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Diversified triple-engine monetization: SaaS recurring subscriptions, B2B marketplace commissions, and bio-products.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-wider block">
            Annual Run-Rate
          </span>
          <span className="text-2xl font-heading font-extrabold text-white">
            {formatCurrency(totalAnnualRevenue)}
          </span>
        </div>
      </div>

      {/* 3 Core Revenue Pillars from Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-brand-green/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-brand-green">PILLAR 01</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">
              Municipal Subscription (SaaS)
            </h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Recurring cloud telemetry fee charged per smart bin for city command dashboard, driver routing, and compliance logging.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-xs">
            <span className="text-text-muted">Rate:</span>{' '}
            <strong className="text-white">₹350 / bin / month</strong>
          </div>
        </div>

        <div className="glass-card p-6 border-sky-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-sky-400">PILLAR 02</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">
              B2B Marketplace Commission
            </h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              3.5% to 5.0% take-rate on all completed transactions between bulk waste generators and certified recycling plants.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-xs">
            <span className="text-text-muted">Take-Rate:</span>{' '}
            <strong className="text-white">4.0% Platform Fee</strong>
          </div>
        </div>

        <div className="glass-card p-6 border-violet-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-violet-400">PILLAR 03</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">
              BioGas & Enriched Mulch Sales
            </h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Commercializing high-nitrogen wet organic waste into bottled compressed biogas and certified organic farm mulch.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-xs">
            <span className="text-text-muted">Biogas Rate:</span>{' '}
            <strong className="text-white">₹650 / cylinder unit</strong>
          </div>
        </div>
      </div>

      {/* Interactive Financial Calculator */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-heading font-bold text-white text-base">
              Interactive Revenue Projection Calculator
            </h3>
            <p className="text-xs text-text-muted font-mono">
              Adjust scale assumptions to test unit economics and break-even timelines.
            </p>
          </div>
          <span className="text-[11px] font-mono text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full border border-brand-green/20">
            Break-even: Month 8
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Input */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Deployed Municipal Cities:</span>
                <span className="text-white font-bold">{citiesCount} Cities</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={citiesCount}
                onChange={(e) => setCitiesCount(Number(e.target.value))}
                className="w-full accent-brand-green cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Smart Bins per City:</span>
                <span className="text-white font-bold">{binsPerCity} Bins</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={binsPerCity}
                onChange={(e) => setBinsPerCity(Number(e.target.value))}
                className="w-full accent-brand-green cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Municipal Fee per Bin (₹/mo):</span>
                <span className="text-white font-bold">₹{municipalFeePerBin}</span>
              </div>
              <input
                type="range"
                min="200"
                max="600"
                step="25"
                value={municipalFeePerBin}
                onChange={(e) => setMunicipalFeePerBin(Number(e.target.value))}
                className="w-full accent-brand-green cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Monthly Marketplace Volume (₹):</span>
                <span className="text-white font-bold">₹{(monthlyMarketplaceVolume / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={monthlyMarketplaceVolume}
                onChange={(e) => setMonthlyMarketplaceVolume(Number(e.target.value))}
                className="w-full accent-brand-green cursor-pointer"
              />
            </div>
          </div>

          {/* Output Card */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-muted">Total Active Smart Bins:</span>
              <span className="text-white font-bold">{totalBins.toLocaleString()} units</span>
            </div>

            <div className="space-y-2 text-xs font-mono pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span className="text-brand-green">SaaS Subscription:</span>
                <span className="text-white font-bold">{formatCurrency(monthlySaaSRevenue)} / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-400">Marketplace Take (4%):</span>
                <span className="text-white font-bold">{formatCurrency(monthlyMarketplaceRevenue)} / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-violet-400">Biogas & Fertilizer Sales:</span>
                <span className="text-white font-bold">{formatCurrency(monthlyBioProductRevenue)} / mo</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-xs font-mono text-text-muted uppercase">Projected Monthly Total</span>
              <span className="text-3xl font-heading font-extrabold text-brand-green">
                {formatCurrency(totalMonthlyRevenue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scalability Expansion Timeline */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Globe2 size={18} className="text-brand-teal" />
          <h3 className="font-heading font-bold text-white text-base">
            Geographic Scalability: Chennai to Global Smart Cities
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono text-center">
          <div className="p-3.5 rounded-xl bg-brand-green/10 border border-brand-green/30">
            <span className="text-brand-green font-bold block mb-1">Stage 1: Chennai</span>
            <p className="text-text-muted text-[11px]">24 Active Bins · T. Nagar & Guindy initial pilot</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-sky-400 font-bold block mb-1">Stage 2: Tamil Nadu</span>
            <p className="text-text-muted text-[11px]">Coimbatore, Madurai, Trichy (2,500 bins)</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-violet-400 font-bold block mb-1">Stage 3: Pan-India</span>
            <p className="text-text-muted text-[11px]">Bengaluru, Hyderabad, Pune, Smart Cities Mission</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-teal-400 font-bold block mb-1">Stage 4: Global</span>
            <p className="text-text-muted text-[11px]">Southeast Asia & Middle East circular hubs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
