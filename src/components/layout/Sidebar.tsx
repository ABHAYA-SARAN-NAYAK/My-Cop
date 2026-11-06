import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import {
  LayoutDashboard,
  Trash2,
  Boxes,
  Truck,
  Cpu,
  ShoppingBag,
  Layers,
  Award,
  Globe2,
  Building2,
  Navigation,
  Recycle,
  Calculator,
  Kanban,
  Bell,
  Settings,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role } = useAuthStore();
  const { sidebarCollapsed } = useUIStore();

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard, roles: ['generator'] },
    { label: 'Dispose Waste', path: '/app/dispose', icon: Trash2, roles: ['generator'] },
    { label: 'Smart Bins', path: '/app/bins', icon: Boxes, roles: ['generator', 'admin'] },
    { label: 'Live Tracking', path: '/app/tracking', icon: Truck, roles: ['generator', 'admin', 'driver'] },
    { label: 'AI Segregation Lab', path: '/app/ai-sorter', icon: Cpu, roles: ['all'] },
    { label: 'Marketplace', path: '/app/marketplace', icon: ShoppingBag, roles: ['all'] },
    { label: 'Blockchain Ledger', path: '/app/ledger', icon: Layers, roles: ['all'] },
    { label: 'Rewards & Rank', path: '/app/rewards', icon: Award, roles: ['generator'] },
    { label: 'Eco Impact', path: '/app/impact', icon: Globe2, roles: ['all'] },
    { label: 'Command Center', path: '/app/admin', icon: Building2, roles: ['admin'] },
    { label: 'Fleet & Routes', path: '/app/fleet', icon: Navigation, roles: ['admin', 'driver'] },
    { label: 'Recycler Hub', path: '/app/recycler', icon: Recycle, roles: ['recycler'] },
    { label: 'Revenue Model', path: '/app/revenue', icon: Calculator, roles: ['all'] },
    { label: 'Business Canvas', path: '/app/canvas', icon: Kanban, roles: ['all'] },
    { label: 'Notifications', path: '/app/notifications', icon: Bell, roles: ['all'] },
    { label: 'Settings', path: '/app/settings', icon: Settings, roles: ['all'] },
  ];

  // Filter items matching current role or 'all'
  const visibleItems = navItems.filter(
    (item) => item.roles.includes('all') || item.roles.includes(role)
  );

  return (
    <aside
      className={`hidden md:flex flex-col glass-panel border-r border-white/10 h-screen sticky top-0 transition-all duration-300 z-30 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/10 overflow-hidden">
        <Logo size="sm" showTagline={!sidebarCollapsed} />
      </div>

      {/* Navigation Links Scrollable List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-brand-gradient text-deep font-bold shadow-[0_4px_15px_rgba(34,229,139,0.3)]'
                    : 'text-text-muted hover:text-white hover:bg-white/[0.06]'
                }`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Role indicator */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-white/10 m-2 rounded-2xl bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-text-muted">Active Role</span>
            <span className="text-[10px] font-mono font-semibold text-brand-green capitalize px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20">
              {role}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
