import React, { useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PresenterPanel } from './PresenterPanel';
import { LiveTicker } from './LiveTicker';
import { useAuthStore } from '../../store/useAuthStore';
import { useLedgerStore } from '../../store/useLedgerStore';
import {
  LayoutDashboard,
  Trash2,
  Boxes,
  Truck,
  Cpu,
  ShoppingBag,
  Layers,
  Award,
} from 'lucide-react';

export const AppShell: React.FC = () => {
  const { role } = useAuthStore();
  const initLedger = useLedgerStore((s) => s.initLedger);
  const location = useLocation();

  // Initialize cryptographic ledger on startup
  useEffect(() => {
    initLedger();
  }, [initLedger]);

  // Mobile Bottom Navigation links
  const mobileNav = [
    { label: 'Dash', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Dispose', path: '/app/dispose', icon: Trash2 },
    { label: 'Bins', path: '/app/bins', icon: Boxes },
    { label: 'Track', path: '/app/tracking', icon: Truck },
    { label: 'Market', path: '/app/marketplace', icon: ShoppingBag },
    { label: 'Ledger', path: '/app/ledger', icon: Layers },
  ];

  return (
    <div className="flex min-h-screen bg-deep text-text-main selection:bg-brand-teal/30">
      {/* Desktop Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Real-time Simulator Live Ticker Bar */}
        <LiveTicker />

        {/* Top Header Bar */}
        <TopBar />

        {/* Main Content Outlet with delicate floating background blobs */}
        <main className="flex-1 relative p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {/* Subtle Ambient Background Glowing Blobs */}
          <div className="fixed top-20 right-10 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="fixed bottom-10 left-64 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Section 13) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-2 py-1.5 flex items-center justify-around select-none">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-mono transition-colors ${
                  isActive
                    ? 'text-brand-green font-bold bg-brand-green/10'
                    : 'text-text-muted hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Floating Presenter Mode Tool Panel */}
      <PresenterPanel />
    </div>
  );
};
