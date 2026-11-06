import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { useSimStore } from '../../store/useSimStore';
import { resetAllDemoData } from '../../store/actions';
import { Button } from '../../components/ui/Button';
import {
  Settings,
  User,
  Sun,
  Moon,
  RotateCcw,
  LogOut,
  Bell,
  Cpu,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Role } from '../../types';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, loginAs, logout, updateUser } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  const { speed, setSpeed } = useSimStore();

  const [name, setName] = useState(user.name);
  const [area, setArea] = useState(user.area);
  const [notifSound, setNotifSound] = useState(true);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, area });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleResetData = async () => {
    await resetAllDemoData();
    setResetConfirmOpen(false);
    alert('All simulation data has been reset to initial seed state.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-white">Platform Settings</h1>
        <p className="text-xs text-text-muted mt-1">
          Manage demo profile credentials, theme tokens, notification channels, and simulation engine velocity.
        </p>
      </div>

      {savedNotice && (
        <div className="glass-card p-3 border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 size={16} className="text-brand-green" />
          <span>Profile configuration updated successfully.</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
          <User size={16} className="text-brand-teal" />
          <span>Demo User Profile</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-teal/40"
            />
            <div>
              <p className="font-bold text-white text-sm">{user.name}</p>
              <p className="text-text-muted capitalize">Role: {role} Persona</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-text-muted block mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-text-muted block mb-1">Operating Ward / Location</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Theme & Simulation Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <Sun size={16} className="text-amber-400" />
            <span>Theme & Display</span>
          </h3>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-white font-semibold block">Interface Mode</span>
              <span className="text-text-muted">Currently active: {theme} mode</span>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </div>

        {/* Simulation Engine Controls */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <Cpu size={16} className="text-brand-green" />
            <span>Simulation Velocity</span>
          </h3>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Tick Speed:</span>
            <div className="flex gap-1.5">
              {[1, 2, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s as any)}
                  className={`px-3 py-1 rounded-lg ${
                    speed === s ? 'bg-brand-teal text-deep font-bold' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Switch Demo Role Quick Jump */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-heading font-bold text-white text-base">Quick Switch Exploration Role</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          {[
            { role: 'generator' as Role, name: 'Generator (Priya)' },
            { role: 'recycler' as Role, name: 'Recycler (GreenLoop)' },
            { role: 'admin' as Role, name: 'Admin (Smart City)' },
            { role: 'driver' as Role, name: 'Driver (Karthik R.)' },
          ].map((item) => (
            <button
              key={item.role}
              onClick={() => {
                loginAs(item.role);
                if (item.role === 'generator') navigate('/app/dashboard');
                else if (item.role === 'recycler') navigate('/app/recycler');
                else if (item.role === 'admin') navigate('/app/admin');
                else if (item.role === 'driver') navigate('/app/fleet');
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                role === item.role
                  ? 'bg-brand-teal/20 border-brand-teal text-white font-bold'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Danger Zone: Reset Demo State & Logout */}
      <div className="glass-card p-6 border-red-500/20 space-y-4">
        <h3 className="font-heading font-bold text-red-400 text-base">Demo Data Management</h3>
        <p className="text-xs text-text-muted">
          Clear all simulated transactions, reset bins to default fill rates, and restore blockchain ledger to genesis seed.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="danger"
            size="sm"
            onClick={() => setResetConfirmOpen(true)}
            leftIcon={<RotateCcw size={14} />}
          >
            Reset All Demo Data
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            leftIcon={<LogOut size={14} />}
          >
            Logout Demo Session
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-sm w-full border border-red-500/30 space-y-4">
            <h3 className="font-heading font-bold text-white text-base">Confirm Reset</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              This will restore all 24 bins, trucks, ledger blocks, and points back to the original hackathon seed state.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setResetConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleResetData}>
                Confirm Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
