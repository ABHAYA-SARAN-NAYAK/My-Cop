import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { useNotifStore } from '../../store/useNotifStore';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Sun,
  Moon,
  Tv,
  Search,
  Menu,
  ChevronDown,
  UserCheck,
  LogOut,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Role } from '../../types';

export const TopBar: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
  const { user, role, loginAs, logout } = useAuthStore();
  const { theme, toggleTheme, togglePresenter, presenterOpen, toggleSidebar } = useUIStore();
  const notifications = useNotifStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSwitchRole = (newRole: Role) => {
    loginAs(newRole);
    setProfileDropdown(false);
    // Redirect to the appropriate home
    if (newRole === 'generator') navigate('/app/dashboard');
    else if (newRole === 'admin') navigate('/app/admin');
    else if (newRole === 'recycler') navigate('/app/recycler');
    else if (newRole === 'driver') navigate('/app/fleet');
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 glass-panel border-b border-white/10 px-4 flex items-center justify-between select-none">
      {/* Left section: Sidebar toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight flex items-center gap-2">
            <span>{pageTitle || 'MyCop Platform'}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-teal capitalize">
              {role}
            </span>
          </h1>
        </div>
      </div>

      {/* Right controls: Presenter Mode, Notifications, Theme, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Presenter Mode Pill Toggle (P shortcut hint) */}
        <button
          onClick={togglePresenter}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
            presenterOpen
              ? 'bg-brand-green text-deep shadow-[0_0_15px_rgba(34,229,139,0.5)] font-bold'
              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
          }`}
          title="Presenter Mode (Shortcut: P)"
        >
          <Tv size={13} />
          <span className="hidden sm:inline">Presenter</span>
          <span className="text-[10px] opacity-75 font-mono px-1 py-0.2 rounded bg-black/20">P</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notification Bell */}
        <Link
          to="/app/notifications"
          className="relative p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-green text-deep text-[10px] font-mono font-bold flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-2 p-1.5 pr-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-brand-teal/40"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">{user.name}</span>
              <span className="text-[10px] text-text-muted font-mono capitalize">{user.role}</span>
            </div>
            <ChevronDown size={14} className="text-text-muted hidden sm:block" />
          </button>

          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-56 glass-card p-2 shadow-2xl border border-white/15 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2 border-b border-white/10">
                <p className="font-semibold text-white text-xs">{user.name}</p>
                <p className="text-[11px] font-mono text-text-muted">{user.area}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-green font-mono">
                  <Sparkles size={11} /> {user.points} Points ({user.tier})
                </div>
              </div>

              <div className="py-1">
                <span className="text-[10px] font-mono uppercase text-text-muted px-2 py-1 block">
                  Switch Demo Role
                </span>
                <button
                  onClick={() => handleSwitchRole('generator')}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    role === 'generator' ? 'bg-brand-teal/20 text-brand-teal font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Generator (Priya)</span>
                  {role === 'generator' && <UserCheck size={12} />}
                </button>
                <button
                  onClick={() => handleSwitchRole('recycler')}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    role === 'recycler' ? 'bg-brand-teal/20 text-brand-teal font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Recycler (GreenLoop)</span>
                  {role === 'recycler' && <UserCheck size={12} />}
                </button>
                <button
                  onClick={() => handleSwitchRole('admin')}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    role === 'admin' ? 'bg-brand-teal/20 text-brand-teal font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Admin (Smart City)</span>
                  {role === 'admin' && <UserCheck size={12} />}
                </button>
                <button
                  onClick={() => handleSwitchRole('driver')}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    role === 'driver' ? 'bg-brand-teal/20 text-brand-teal font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Driver (Karthik R.)</span>
                  {role === 'driver' && <UserCheck size={12} />}
                </button>
              </div>

              <div className="pt-1 border-t border-white/10">
                <Link
                  to="/app/settings"
                  onClick={() => setProfileDropdown(false)}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-white/5 block"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdown(false);
                    navigate('/login');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-1.5"
                >
                  <LogOut size={12} /> Logout Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
