import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../../components/brand/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { Role } from '../../types';
import { DEMO_USERS } from '../../data/seed';
import {
  Home,
  Recycle,
  Building2,
  Truck,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const { loginAs } = useAuthStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roleCards = [
    {
      role: 'generator' as Role,
      title: 'Waste Generator',
      persona: 'Priya Nair',
      location: 'T. Nagar, Chennai',
      badge: 'Household / Restaurant',
      color: '#38BDF8',
      icon: Home,
      desc: 'Dispose waste easily, track scheduled pickups, and earn redeemable green reward points.',
      targetPath: '/app/dashboard',
    },
    {
      role: 'recycler' as Role,
      title: 'Recycler & Buyer',
      persona: 'GreenLoop Recyclers',
      location: 'Guindy Industrial Hub',
      badge: 'Processors & Biogas',
      color: '#4ADE80',
      icon: Recycle,
      desc: 'Discover clean, AI-sorted materials, inspect SHA-256 origin proof, and bid in real time.',
      targetPath: '/app/recycler',
    },
    {
      role: 'admin' as Role,
      title: 'Smart City Admin',
      persona: 'Chennai Smart City Office',
      location: 'Ripon Building, GCC',
      badge: 'Municipality',
      color: '#8B5CF6',
      icon: Building2,
      desc: 'Monitor city-wide IoT bins, optimize collection fleets, and generate audit-ready ESG reports.',
      targetPath: '/app/admin',
    },
    {
      role: 'driver' as Role,
      title: 'Fleet Driver',
      persona: 'Karthik R.',
      location: 'Hub 03, Velachery',
      badge: 'Logistics Operative',
      color: '#FBBF24',
      icon: Truck,
      desc: 'Follow Haversine-optimized shortest routes, scan bins on pickup, and update delivery status.',
      targetPath: '/app/fleet',
    },
  ];

  const handleRoleSelect = (roleItem: typeof roleCards[0]) => {
    setSelectedRole(roleItem.role);
    setIsLoading(true);

    // 1.2s animated loading logo pulse as specified in Section 10.1
    setTimeout(() => {
      loginAs(roleItem.role);
      navigate(roleItem.targetPath);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-deep text-text-main flex flex-col md:flex-row select-none relative overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070B14]/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-16 h-16 mb-4"
            >
              <Logo size="lg" showTagline={false} to="" />
            </motion.div>
            <p className="font-heading font-bold text-white text-lg">
              Initializing {selectedRole} workspace...
            </p>
            <p className="text-xs font-mono text-brand-green mt-1">
              Synchronizing local simulation state
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Screen: Animated Brand Art & Pitch */}
      <div className="md:w-5/12 bg-gradient-to-br from-[#0A1020] via-surface to-[#060A12] p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative">
        {/* Glow blob */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />

        <div>
          <Logo size="md" />
          <div className="mt-12">
            <span className="text-xs font-mono uppercase text-brand-teal tracking-wider bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
              Interactive Hackathon Demo
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-4 leading-tight">
              Where Waste Finds Its Purpose.
            </h2>
            <p className="text-sm text-text-muted mt-4 leading-relaxed">
              Experience the end-to-end Waste Link platform from any of the 4 city stakeholder perspectives.
            </p>
          </div>
        </div>

        {/* Highlight points */}
        <div className="my-8 space-y-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <CheckCircle2 size={16} className="text-brand-green" />
            <span>Real SHA-256 blockchain verification & tamper test</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <CheckCircle2 size={16} className="text-brand-green" />
            <span>Real Haversine shortest-distance truck assignment</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <CheckCircle2 size={16} className="text-brand-green" />
            <span>Interactive AI Segregation Lab with robotic gripper</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            ← Back to Landing Page
          </Link>
          <span className="font-mono">v1.0 Demo</span>
        </div>
      </div>

      {/* Right Screen: 4 Role Selection Cards */}
      <div className="md:w-7/12 p-6 sm:p-12 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-white">
            Choose Your Exploration Role
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Demo mode enabled · One-click instant login, no password required.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roleCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                onClick={() => handleRoleSelect(item)}
                className="glass-card p-5 border-white/10 hover:border-white/30 cursor-pointer flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-base group-hover:text-brand-teal transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">
                    {item.persona}{' '}
                    <span className="text-[11px] text-text-muted font-normal">({item.location})</span>
                  </p>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-brand-green group-hover:translate-x-1 transition-transform">
                  <span>Continue as {item.persona.split(' ')[0]}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-text-muted mt-8 font-mono">
          You can toggle or switch between roles anytime via the top bar profile menu or keyboard shortcuts <span className="text-white font-bold">[1 - 4]</span>.
        </p>
      </div>
    </div>
  );
};
