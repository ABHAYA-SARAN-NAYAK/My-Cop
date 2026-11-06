import React from 'react';
import { Logo } from '../brand/Logo';
import { Link } from 'react-router-dom';
import { Heart, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050810] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Information */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <Logo size="md" />
          <p className="text-xs text-text-muted leading-relaxed mt-2">
            Where Waste Finds Its Purpose. Connecting waste generators, IoT infrastructure and recyclers for a circular economy.
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[11px] font-mono">
            SEVA FIRST INNOVATION CHALLENGE
          </div>
        </div>

        {/* Quick Product Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-3 text-xs uppercase tracking-wider">
            Platform Links
          </h4>
          <ul className="space-y-2 text-xs text-text-muted">
            <li><Link to="/app/dashboard" className="hover:text-white transition-colors">Generator Dashboard</Link></li>
            <li><Link to="/app/bins" className="hover:text-white transition-colors">Smart Bin Monitor</Link></li>
            <li><Link to="/app/tracking" className="hover:text-white transition-colors">Live Truck Tracking</Link></li>
            <li><Link to="/app/ai-sorter" className="hover:text-white transition-colors">AI Segregation Lab</Link></li>
            <li><Link to="/app/marketplace" className="hover:text-white transition-colors">Waste Marketplace</Link></li>
            <li><Link to="/app/ledger" className="hover:text-white transition-colors">Blockchain Ledger</Link></li>
          </ul>
        </div>

        {/* Management & Business */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-3 text-xs uppercase tracking-wider">
            City & Enterprise
          </h4>
          <ul className="space-y-2 text-xs text-text-muted">
            <li><Link to="/app/admin" className="hover:text-white transition-colors">City Command Center</Link></li>
            <li><Link to="/app/fleet" className="hover:text-white transition-colors">Fleet & Route Optimizer</Link></li>
            <li><Link to="/app/recycler" className="hover:text-white transition-colors">Recycler Portal</Link></li>
            <li><Link to="/app/revenue" className="hover:text-white transition-colors">Revenue Calculator</Link></li>
            <li><Link to="/app/canvas" className="hover:text-white transition-colors">Business Model Canvas</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Team RISING INNOVATORS</Link></li>
          </ul>
        </div>

        {/* Team Credits */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-3 text-xs uppercase tracking-wider">
            Built by RISING INNOVATORS
          </h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Designed & developed by:
          </p>
          <div className="mt-2 space-y-1.5 text-xs font-mono text-slate-300">
            <p>• <strong className="text-white">Revesh Roshan V</strong> (Lead)</p>
            <p>• <strong className="text-white">Prabu Shanmugam S</strong></p>
            <p>• <strong className="text-white">Larshnn Sathyaa S</strong></p>
          </div>
          <p className="text-[11px] text-text-muted mt-3 font-mono">
            BUILD. CHALLENGE. DOMINATE.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted">
        <p>© 2026 MyCop – All simulated demo rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Made with <Heart size={13} className="text-red-400 fill-current" /> for sustainable smart cities
        </p>
      </div>
    </footer>
  );
};
