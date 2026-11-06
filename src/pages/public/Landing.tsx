import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LiveTicker } from '../../components/layout/LiveTicker';
import { HeroWasteParticles } from '../../components/brand/Particles';
import { PhoneMockup } from '../../components/brand/PhoneMockup';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Trash2,
  Truck,
  Recycle,
  Layers,
  Award,
  Globe2,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Users,
  ChevronDown,
  Building,
  Factory,
  Utensils,
  Home,
  Check,
  ShoppingBag,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Section 11: Impact Calculator State
  const [households, setHouseholds] = useState<number>(5000);
  const [wastePerDay, setWastePerDay] = useState<number>(1.8);

  // Computed impact numbers
  const dailyTotalKg = households * wastePerDay;
  const yearlyDivertedTons = Math.round((dailyTotalKg * 365 * 0.78) / 1000);
  const co2SavedTons = Math.round(yearlyDivertedTons * 0.95);
  const truckRouteSavingsKm = Math.round(households * 0.42);
  const estimatedRevenueInr = Math.round(yearlyDivertedTons * 1000 * 18.5);

  // Section 9: 7-Step Architecture Flow state
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false);

  const architectureSteps = [
    {
      title: 'Consumers Dispose',
      desc: 'Residents & restaurants segregate waste into IoT smart bins with fill & gas sensors.',
      icon: Trash2,
      badge: 'Step 1: Edge IoT',
    },
    {
      title: 'Data Stored & Analyzed in Cloud',
      desc: 'Telemetry streams to cloud server to compute ward fill rates and anomaly detection.',
      icon: Layers,
      badge: 'Step 2: Cloud Engine',
    },
    {
      title: 'Alert on Phone',
      desc: 'Mobile push alert sent to generator: confirmation, bonus points, and pickup schedule.',
      icon: Award,
      badge: 'Step 3: User App',
    },
    {
      title: 'Authorities Informed',
      desc: 'Municipal command dashboard flags high-volume sector & logs compliance report.',
      icon: Building,
      badge: 'Step 4: Smart City',
    },
    {
      title: 'Nearest Truck Assigned',
      desc: 'Haversine distance math evaluates fleet; closest truck with capacity receives route.',
      icon: Truck,
      badge: 'Step 5: Dynamic Routing',
    },
    {
      title: 'Waste Routed to Segregation',
      desc: 'Optimized transit path delivers batch directly to local recovery & materials hub.',
      icon: Recycle,
      badge: 'Step 6: Logistics',
    },
    {
      title: 'AI Camera + Gripper Sorting',
      desc: 'Conveyor computer vision classifies into Plastic, Metal, Glass, Organic with 98% purity.',
      icon: Cpu,
      badge: 'Step 7: AI Lab',
    },
  ];

  // Auto-play 7-step architecture
  useEffect(() => {
    let timer: any;
    if (isPlayingFlow) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= architectureSteps.length - 1) {
            setIsPlayingFlow(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlayingFlow, architectureSteps.length]);

  // Section 10: Feature Showcase Carousel State
  const [activeFeatureTab, setActiveFeatureTab] = useState<'dashboard' | 'bins' | 'marketplace' | 'ledger' | 'rewards'>('dashboard');

  // Section 14: Challenges & Risks Accordion state
  const [expandedRisk, setExpandedRisk] = useState<number | null>(0);

  const risks = [
    {
      category: 'Technical Risk',
      risk: 'Sensor degradation & battery drain in harsh Indian weather conditions.',
      mitigation: 'Low-power LoRaWAN protocol, solar-trickle capacitor cells, and ultrasonic dual-sealed transducers.',
    },
    {
      category: 'Financial Risk',
      risk: 'High initial capital expenditure for municipal smart bin retrofits.',
      mitigation: 'Modular clip-on IoT sensor kits (1/5th cost of new bins) funded through shared marketplace revenue share.',
    },
    {
      category: 'Operational Risk',
      risk: 'Driver route deviation or missed pickups in dense city corridors.',
      mitigation: 'Automated turn-by-turn routing with geo-fenced pickup validation on the driver dashboard.',
    },
    {
      category: 'User Adoption Risk',
      risk: 'Lack of citizen motivation to segregate waste at home.',
      mitigation: 'Tangible economic incentives: property tax rebates, metro cards, and instant UPI redeemable points.',
    },
  ];

  return (
    <div className="min-h-screen bg-deep text-text-main flex flex-col overflow-x-hidden selection:bg-brand-teal/30">
      {/* 1. Live Ticker Bar (Top) */}
      <LiveTicker />

      {/* Public Glass Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Blurred gradient background blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-32 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pitch & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Hackathon Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-brand-green mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span>SEVA FIRST INNOVATION CHALLENGE · Team RISING INNOVATORS</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              Waste has{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">value.</span>{' '}
              We connect it.
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
              MyCop links waste generators with recyclers using smart IoT bins, shortest-distance live tracking and transparent blockchain records.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/login">
                <Button size="lg" variant="primary" rightIcon={<Sparkles size={16} />}>
                  Launch Live Demo
                </Button>
              </Link>
              <a href="#journey">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  Watch the Journey
                </Button>
              </a>
            </div>

            {/* 4 Live Stat Counters */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full font-mono">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">85.4 kg</p>
                <p className="text-xs text-text-muted uppercase mt-0.5">Tracked Today</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-green font-heading">24 Bins</p>
                <p className="text-xs text-text-muted uppercase mt-0.5">Active Smart Bins</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-heading">6 Buyers</p>
                <p className="text-xs text-text-muted uppercase mt-0.5">Recyclers Online</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-heading">56.8 kg</p>
                <p className="text-xs text-text-muted uppercase mt-0.5">CO₂ Offset Logged</p>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Visuals (Floating Particles + Real Phone Mockup) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Signature 1: Floating waste particles dropping into bins */}
            <div className="w-full mb-3">
              <HeroWasteParticles />
            </div>

            {/* Signature 5: Real Phone Mockup rendering live dashboard */}
            <div className="w-full flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            The Critical Bottleneck
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
            Cities Drown in Unmanaged Waste
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-3">
            Over 62 million tonnes of waste is generated annually in India, yet less than 28% is treated or recycled.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Overflowing Landfills',
              desc: 'Dump yards contaminate groundwater and emit toxic methane fires daily.',
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
            {
              title: 'Poor Segregation',
              desc: 'Valuable recyclable polymers get ruined by wet organic kitchen waste.',
              color: 'text-red-400',
              bg: 'bg-red-500/10',
            },
            {
              title: 'Low Recycling Rates',
              desc: 'Recycling plants starve for clean raw stock while waste sits in garbage dumps.',
              color: 'text-violet-400',
              bg: 'bg-violet-500/10',
            },
            {
              title: 'Zero Live Tracking',
              desc: 'Municipalities run blind schedules with empty trucks or overflowing bins.',
              color: 'text-sky-400',
              bg: 'bg-sky-500/10',
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <span className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center font-mono font-bold text-sm mb-4`}>
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-heading font-bold text-white">{item.title}</h3>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Big Quote Card from PRD */}
        <div className="mt-8 glass-card p-8 border-brand-teal/30 bg-gradient-to-r from-brand-teal/5 to-brand-green/5 text-center relative overflow-hidden">
          <p className="text-xl sm:text-2xl font-heading font-semibold text-white max-w-4xl mx-auto italic">
            "Waste has value, but there is no smart system to connect it with the right recycler."
          </p>
        </div>

        {/* Who Faces This Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <span className="text-xs font-mono text-text-muted uppercase">Who faces this problem:</span>
          {[
            { name: 'Urban Households', icon: Home },
            { name: 'Industries & Tech Parks', icon: Factory },
            { name: 'Municipal Corporations', icon: Building },
            { name: 'Restaurants & Hotels', icon: Utensils },
          ].map((target, i) => {
            const Icon = target.icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-200"
              >
                <Icon size={14} className="text-brand-green" />
                {target.name}
              </span>
            );
          })}
        </div>
      </section>

      {/* 4. Why it Matters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold text-white">Why It Matters</h2>
          <p className="text-text-muted text-sm mt-2">The systemic ripple effect of closed-loop resource recovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-emerald-500/20 hover:border-emerald-500/40">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Globe2 size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">Environmental Sustainability</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Every tonne of recycled plastic avoids 1.5 tonnes of CO₂ greenhouse gas emissions and halts ocean microplastic leakage.
            </p>
          </div>

          <div className="glass-card p-6 border-sky-500/20 hover:border-sky-500/40">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <Recycle size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">Resource Recovery</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Recycling aluminum cans saves 95% of the energy needed for virgin bauxite smelting. Waste becomes clean secondary industrial feedstock.
            </p>
          </div>

          <div className="glass-card p-6 border-violet-500/20 hover:border-violet-500/40">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">Divert Landfill Dumping</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Extending the lifespan of city land while monetizing municipal waste streams into recurring biogas and compost revenue.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Waste Journey (Scroll-Story) */}
      <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
            Signature Creative Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
            The Waste Journey: 6 Seamless Steps
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Watch waste travel from your doorstep to high-value industrial reuse.
          </p>
        </div>

        {/* Horizontal journey line with lit nodes */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
          {[
            { step: 'Collect', desc: 'IoT sensors detect bin fill level & alert nearest truck', icon: Trash2, color: '#38BDF8' },
            { step: 'Sort', desc: 'Conveyor camera & robotic gripper separate streams', icon: Cpu, color: '#4ADE80' },
            { step: 'Segregate', desc: 'Certified purity grading into Plastic, Metal, Glass, Bio', icon: Layers, color: '#A78BFA' },
            { step: 'Connect', desc: 'Listed on Digital Waste Exchange for verified recyclers', icon: ShoppingBag, color: '#2DD4BF' },
            { step: 'Recycle', desc: 'Direct sale & processing with immutable ledger record', icon: Recycle, color: '#FBBF24' },
            { step: 'Reuse', desc: 'New circular products manufactured with zero landfill', icon: Award, color: '#22E58B' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card p-4 flex flex-col items-center text-center relative group hover:border-white/30">
                <span className="text-[10px] font-mono text-text-muted uppercase mb-2">Stage 0{idx + 1}</span>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="font-heading font-bold text-white text-base">{item.step}</h3>
                <p className="text-[11px] text-text-muted mt-1 leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Three Pillars */}
      <section id="pillars" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            The Three Pillars of MyCop
          </h2>
          <p className="text-text-muted text-sm mt-2">
            The complete hardware, logistics and market integration from the SEVA FIRST INNOVATION CHALLENGE deck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: IoT Smart Bins */}
          <div className="glass-card p-6 border-sky-500/20 hover:border-sky-500/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">1. Smart IoT Bins</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Solar-assisted ultrasonic fill level sensors, methane/odor detectors for organic waste, and battery health telemetry streaming every 3 seconds.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 bg-slate-900/60 p-3 rounded-xl flex items-center justify-between font-mono text-xs">
              <span className="text-sky-400">● Live Bin #TN-01</span>
              <span className="text-white font-bold">92% Full</span>
            </div>
          </div>

          {/* Pillar 2: Tracking App */}
          <div className="glass-card p-6 border-emerald-500/20 hover:border-emerald-500/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">2. Live Tracking App</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Shortest-distance truck assignment computed in real time using the Haversine formula. Drivers receive dynamic route manifests; generators track ETA.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 bg-slate-900/60 p-3 rounded-xl flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-400">Truck TRK-04</span>
              <span className="text-white font-bold">1.8 km (ETA 4m)</span>
            </div>
          </div>

          {/* Pillar 3: Recycler Network */}
          <div className="glass-card p-6 border-violet-500/20 hover:border-violet-500/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
                <Recycle size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">3. Recycler Network</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Digital Waste Marketplace connecting certified buyers (plastic pelletizers, biogas digesters, metal smelters) with transparent SHA-256 batch origin.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 bg-slate-900/60 p-3 rounded-xl flex items-center justify-between font-mono text-xs">
              <span className="text-violet-400">Active Bids</span>
              <span className="text-white font-bold">₹38.00 / kg PET</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Uniqueness Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
            Traditional Waste vs MyCop Link
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Why choose us: Cost Savings + Uncompromised Environmental Sustainability.
          </p>
        </div>

        {/* 6-Row Comparison Table */}
        <div className="overflow-x-auto glass-card">
          <table className="w-full text-left text-xs font-sans">
            <thead className="border-b border-white/10 bg-white/[0.02] text-text-muted uppercase font-mono">
              <tr>
                <th className="py-4 px-6">Capability Feature</th>
                <th className="py-4 px-6 text-red-400">Traditional Waste Collection</th>
                <th className="py-4 px-6 text-brand-green font-bold">MyCop Waste Link System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { feature: 'Fill Level Tracking', trad: 'Manual inspection / overflowing bins', myc: 'Real-time IoT ultrasonic fill telemetry' },
                { feature: 'Segregation Method', trad: 'Mixed waste dumped together in truck', myc: 'AI Camera + Robotic Gripper 98% purity sort' },
                { feature: 'Buyer Connection', trad: 'Informal scrap dealers / no direct link', myc: 'Live Digital B2B Waste Marketplace with bidding' },
                { feature: 'Provenance & Transparency', trad: 'Zero records / high corruption risk', myc: 'SHA-256 Cryptographic Blockchain Ledger' },
                { feature: 'Operational Logistics Cost', trad: 'Static high-fuel routes daily', myc: 'Dynamic Haversine routing saves 35% fuel' },
                { feature: 'Citizen Engagement', trad: 'No reward or incentive to segregate', myc: 'Citizen Green Points, Metro vouchers & tax rebate' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-4 px-6 font-semibold text-white">{row.feature}</td>
                  <td className="py-4 px-6 text-text-muted flex items-center gap-2">
                    <XCircle size={15} className="text-red-400 flex-shrink-0" />
                    <span>{row.trad}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-200 font-medium">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-brand-green flex-shrink-0" />
                      <span>{row.myc}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Waste Management Recycling Process Diagram */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-heading font-extrabold text-white">
            End-to-End Recycling Lifecycle
          </h2>
          <p className="text-text-muted text-sm mt-2">
            The 6 stages connecting smart collection to circular raw manufacturing.
          </p>
        </div>

        {/* Process Diagram drawn with SVG/CSS icons */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { num: '01', title: 'Collection', desc: 'IoT bins alert nearest truck' },
            { num: '02', title: 'Transportation', desc: 'Haversine route optimization' },
            { num: '03', title: 'Sorting', desc: 'AI computer vision + gripper' },
            { num: '04', title: 'Cleaning & Prep', desc: 'Flaking, washing, shredding' },
            { num: '05', title: 'Recycling', desc: 'Pelletizing & biogas digestion' },
            { num: '06', title: 'Final Products', desc: 'rPET fibers, eco-packaging' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-4 text-center border-white/5 hover:border-brand-teal/40 transition-colors">
              <span className="text-xs font-mono font-bold text-brand-teal">{item.num}</span>
              <h4 className="font-heading font-bold text-white text-sm mt-1">{item.title}</h4>
              <p className="text-[10px] text-text-muted mt-1 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Interactive 7-Step Architecture Flow */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              Interactive System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
              How the System Works
            </h2>
            <p className="text-text-muted text-sm mt-1">
              Click any node to inspect data flow, or press auto-play.
            </p>
          </div>
          <button
            onClick={() => setIsPlayingFlow(!isPlayingFlow)}
            className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-gradient text-deep font-heading font-bold text-xs shadow-md hover:brightness-110 transition-all"
          >
            {isPlayingFlow ? <RotateCcw size={14} /> : <Play size={14} />}
            <span>{isPlayingFlow ? 'Stop Simulation' : 'Auto-Play Flow'}</span>
          </button>
        </div>

        {/* 7 Horizontal Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {architectureSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-brand-teal/20 border-brand-teal shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-105'
                    : 'bg-surface/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-text-muted">0{idx + 1}</span>
                    <Icon size={16} className={isCurrent ? 'text-brand-green' : 'text-text-muted'} />
                  </div>
                  <h4 className="font-heading font-bold text-white text-xs leading-snug">{step.title}</h4>
                </div>
                <span className="text-[9px] font-mono text-brand-teal mt-3 block truncate">
                  {step.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Step Detail Box */}
        <div className="mt-6 glass-card p-6 border-brand-teal/30 bg-gradient-to-r from-surface to-elevated">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
              {React.createElement(architectureSteps[activeStep].icon, { size: 24 })}
            </div>
            <div>
              <span className="text-xs font-mono text-brand-green font-semibold">
                {architectureSteps[activeStep].badge}
              </span>
              <h3 className="text-lg font-heading font-bold text-white mt-0.5">
                {architectureSteps[activeStep].title}
              </h3>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                {architectureSteps[activeStep].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Feature Showcase (Tabbed Carousel) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-heading font-extrabold text-white">
            Feature Showcase
          </h2>
          <p className="text-text-muted text-sm mt-1">Explore real modules built directly into MyCop.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'dashboard', label: 'Generator Dashboard' },
            { id: 'bins', label: 'Smart Bin Monitor' },
            { id: 'marketplace', label: 'Waste Marketplace' },
            { id: 'ledger', label: 'Blockchain Ledger' },
            { id: 'rewards', label: 'Rewards & Ranks' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFeatureTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeFeatureTab === tab.id
                  ? 'bg-brand-teal text-deep font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feature Display Box */}
        <div className="glass-card p-8 border-white/10 min-h-[280px] flex items-center justify-center text-center">
          {activeFeatureTab === 'dashboard' && (
            <div className="max-w-xl">
              <h3 className="text-xl font-heading font-bold text-white">Waste Link Dashboard</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Tracks exact totals: 85.4 kg collected today, 42% recyclable plastic, 36% organic biomass, 22% landfill. Shows segregation scores, recent pickups, and animated liquid fill bins.
              </p>
              <Link to="/app/dashboard" className="inline-block mt-4">
                <Button size="sm" variant="primary">Launch Dashboard Demo</Button>
              </Link>
            </div>
          )}

          {activeFeatureTab === 'bins' && (
            <div className="max-w-xl">
              <h3 className="text-xl font-heading font-bold text-white">IoT Smart Bin Monitor</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                24 seed bins across Chennai wards (T. Nagar, Adyar, Velachery, Guindy, etc.). Telemetry displays fill level, battery %, signal bars, temperature, and organic methane gas levels.
              </p>
              <Link to="/app/bins" className="inline-block mt-4">
                <Button size="sm" variant="primary">View Bins on Map</Button>
              </Link>
            </div>
          )}

          {activeFeatureTab === 'marketplace' && (
            <div className="max-w-xl">
              <h3 className="text-xl font-heading font-bold text-white">Digital Waste Marketplace</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                18 live listings across PET flakes, aluminum beverage cans, organic biomass, and glass cullet. Recyclers can filter by purity, distance, and submit real bids or Buy Now orders.
              </p>
              <Link to="/app/marketplace" className="inline-block mt-4">
                <Button size="sm" variant="primary">Explore Marketplace</Button>
              </Link>
            </div>
          )}

          {activeFeatureTab === 'ledger' && (
            <div className="max-w-xl">
              <h3 className="text-xl font-heading font-bold text-white">Cryptographic Blockchain Ledger</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Real SHA-256 hashes generated through the browser crypto.subtle API. Includes interactive Tamper and Repair features to prove zero-tampering transparency for ESG audits.
              </p>
              <Link to="/app/ledger" className="inline-block mt-4">
                <Button size="sm" variant="primary">Test Tamper & Repair</Button>
              </Link>
            </div>
          )}

          {activeFeatureTab === 'rewards' && (
            <div className="max-w-xl">
              <h3 className="text-xl font-heading font-bold text-white">Citizen Rewards & Leaderboard</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Earn green points for high purity segregation. Redeem points for Chennai Metro transit passes, organic grocery vouchers, tree planting in Ennore wetlands, or property tax rebates.
              </p>
              <Link to="/app/rewards" className="inline-block mt-4">
                <Button size="sm" variant="primary">View Rewards Catalog</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 11. Impact Calculator */}
      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
            Interactive City Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
            Simulate Your Ward's Impact
          </h2>
          <p className="text-text-muted text-sm mt-1">
            Drag the sliders to project annual waste diversion and economic savings for any urban ward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-card p-6 sm:p-8">
          {/* Sliders Input Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-white font-semibold">Households in Area:</span>
                <span className="text-brand-green font-bold text-sm">{households.toLocaleString()} homes</span>
              </div>
              <input
                type="range"
                min="100"
                max="50000"
                step="250"
                value={households}
                onChange={(e) => setHouseholds(Number(e.target.value))}
                className="w-full accent-brand-green cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono mt-1">
                <span>100</span>
                <span>25,000</span>
                <span>50,000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-white font-semibold">Avg Waste per Home / Day:</span>
                <span className="text-sky-400 font-bold text-sm">{wastePerDay.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={wastePerDay}
                onChange={(e) => setWastePerDay(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono mt-1">
                <span>0.5 kg</span>
                <span>2.5 kg</span>
                <span>5.0 kg</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-text-muted">
              💡 Based on urban waste generation averages validated across Greater Chennai Corporation sectors.
            </div>
          </div>

          {/* Output Metric Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-text-muted uppercase">Landfill Diverted / Year</span>
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
                {yearlyDivertedTons.toLocaleString()} <span className="text-xs text-text-muted font-mono">tonnes</span>
              </p>
              <p className="text-[10px] text-emerald-400 font-mono mt-2">78% total recovery rate</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-text-muted uppercase">CO₂ Footprint Offset</span>
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-green mt-2">
                {co2SavedTons.toLocaleString()} <span className="text-xs text-text-muted font-mono">t CO₂e</span>
              </p>
              <p className="text-[10px] text-text-muted font-mono mt-2">Equivalent to {Math.round(co2SavedTons * 45)} trees</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-text-muted uppercase">Truck Mileage Saved</span>
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-sky-400 mt-2">
                {truckRouteSavingsKm.toLocaleString()} <span className="text-xs text-text-muted font-mono">km/yr</span>
              </p>
              <p className="text-[10px] text-text-muted font-mono mt-2">Via Haversine dynamic routes</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-text-muted uppercase">Marketplace Revenue</span>
              <p className="text-2xl sm:text-3xl font-heading font-extrabold text-violet-400 mt-2">
                ₹{(estimatedRevenueInr / 100000).toFixed(1)} <span className="text-xs text-text-muted font-mono">Lakhs</span>
              </p>
              <p className="text-[10px] text-text-muted font-mono mt-2">From recycled batch sales</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Roadmap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-heading font-extrabold text-white">
            Expansion Roadmap & Pipeline
          </h2>
          <p className="text-text-muted text-sm mt-2">
            From Chennai prototype to nationwide smart city deployments.
          </p>
        </div>

        {/* 3 Phases Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-brand-green/30 relative">
            <span className="text-xs font-mono font-bold text-brand-green uppercase">Phase 1: Build</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">Prototype & Validation</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Vite + React interactive simulator, Haversine dispatch engine, browser SHA-256 blockchain ledger, and AI lab conveyor demo.
            </p>
            <span className="inline-block mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-brand-green/10 text-brand-green">
              Current Sprint
            </span>
          </div>

          <div className="glass-card p-6 border-white/10 relative">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase">Phase 2: Pilot</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">50-Bin Chennai Pilot</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Deploy retrofitted ultrasonic IoT bins across T. Nagar & Adyar commercial zones with 2 designated EV collection trucks.
            </p>
            <span className="inline-block mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">
              Q3 2026
            </span>
          </div>

          <div className="glass-card p-6 border-white/10 relative">
            <span className="text-xs font-mono font-bold text-violet-400 uppercase">Phase 3: Scale-Up</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">Statewide Scale-Up</h3>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Expansion to Coimbatore, Madurai and Bengaluru through SaaS municipal licensing and automated recycler escrow payments.
            </p>
            <span className="inline-block mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">
              2027
            </span>
          </div>
        </div>
      </section>

      {/* 13. Revenue Model Preview */}
      <section id="revenue" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
            Sustainable & Profitable
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
            Diversified Revenue Streams
          </h2>
          <p className="text-text-muted text-sm mt-2">
            How MyCop delivers long-term profitability while cutting municipal waste overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-brand-green font-bold">STREAM 01</span>
              <h3 className="text-lg font-heading font-bold text-white mt-1">Municipal Subscription (SaaS)</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Recurring monthly license fees per smart bin for city command center telemetry, driver routing, and compliance reporting.
              </p>
            </div>
            <p className="text-sm font-mono text-slate-200 mt-4">₹250 - ₹450 / bin / month</p>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-sky-400 font-bold">STREAM 02</span>
              <h3 className="text-lg font-heading font-bold text-white mt-1">B2B Marketplace Commission</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                3% to 5% platform take-rate on all completed transactions between bulk waste generators and certified recycling processors.
              </p>
            </div>
            <p className="text-sm font-mono text-slate-200 mt-4">3.5% avg take-rate</p>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-violet-400 font-bold">STREAM 03</span>
              <h3 className="text-lg font-heading font-bold text-white mt-1">Licensing & Bio-Products</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Direct sale of converted high-purity compressed biogas, enriched organic compost mulch, and IP hardware licensing.
              </p>
            </div>
            <p className="text-sm font-mono text-slate-200 mt-4">Scalable enterprise tiers</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/app/revenue">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight size={14} />}>
              Open Full Revenue Model & Interactive Calculator
            </Button>
          </Link>
        </div>
      </section>

      {/* 14. Challenges and Risks */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-extrabold text-white">
            Challenges, Risks & Mitigation
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Proactive engineering and operational safeguards designed into the platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {risks.map((item, idx) => (
            <div key={idx} className="glass-card overflow-hidden">
              <button
                onClick={() => setExpandedRisk(expandedRisk === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-semibold text-white hover:bg-white/[0.02]"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <span>{item.category}: {item.risk}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-text-muted transition-transform ${expandedRisk === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedRisk === idx && (
                <div className="px-4 pb-4 pt-1 border-t border-white/5 text-xs text-text-muted bg-white/[0.01]">
                  <strong className="text-brand-green block mb-1">Our Engineered Mitigation:</strong>
                  {item.mitigation}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 15. Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
            RISING INNOVATORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-3">
            The Builders Behind MyCop
          </h2>
          <p className="text-text-muted text-sm mt-2">
            SEVA FIRST INNOVATION CHALLENGE · BUILD. CHALLENGE. DOMINATE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Revesh Roshan V', role: 'Team Lead & Full-Stack Architect', initials: 'RR' },
            { name: 'Prabu Shanmugam S', role: 'IoT Systems & Hardware Lead', initials: 'PS' },
            { name: 'Larshnn Sathyaa S', role: 'AI Segregation & Ledger Engineer', initials: 'LS' },
          ].map((member, i) => (
            <div key={i} className="glass-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-gradient text-deep font-heading font-extrabold text-xl flex items-center justify-center shadow-lg mb-4">
                {member.initials}
              </div>
              <h3 className="font-heading font-bold text-white text-base">{member.name}</h3>
              <p className="text-xs font-mono text-brand-teal mt-1">{member.role}</p>
              <p className="text-[11px] text-text-muted mt-2">RISING INNOVATORS</p>
            </div>
          ))}
        </div>
      </section>

      {/* 16. Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="glass-card p-10 md:p-16 border-brand-green/30 bg-gradient-to-r from-brand-green/10 via-brand-teal/10 to-brand-blue/10 text-center relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Turning Waste Into Worth.
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Experience the complete Waste Link System live. No setup, no API keys, zero friction.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
                Launch Live Demo
              </Button>
            </Link>
            <Link to="/app/canvas">
              <Button size="lg" variant="secondary">
                View Business Model Canvas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <Footer />
    </div>
  );
};
