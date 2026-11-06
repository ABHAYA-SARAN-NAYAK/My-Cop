import React, { useState } from 'react';
import { useNotifStore } from '../../store/useNotifStore';
import { Notification } from '../../types';
import { Button } from '../../components/ui/Button';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Truck,
  ShoppingBag,
  Award,
  Layers,
  CheckCircle2,
  X,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markRead, markAllRead, clearAll, deleteNotif } = useNotifStore();
  const [selectedTab, setSelectedTab] = useState<'all' | 'alert' | 'pickup' | 'market' | 'reward'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (selectedTab === 'all') return true;
    return n.type === selectedTab;
  });

  const iconMap = {
    alert: <AlertTriangle size={16} className="text-amber-400" />,
    pickup: <Truck size={16} className="text-sky-400" />,
    market: <ShoppingBag size={16} className="text-violet-400" />,
    reward: <Award size={16} className="text-brand-green" />,
    system: <Layers size={16} className="text-teal-400" />,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">Notifications</h1>
          <p className="text-xs text-text-muted mt-1">
            Real-time telemetry alerts, dispatch updates, and circular marketplace transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={markAllRead}
            leftIcon={<CheckCheck size={14} />}
          >
            Mark all read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            leftIcon={<Trash2 size={14} />}
          >
            Clear all
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="glass-card p-2 flex flex-wrap items-center gap-1.5 text-xs font-mono">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'alert', label: 'Alerts' },
          { id: 'pickup', label: 'Pickups' },
          { id: 'market', label: 'Marketplace' },
          { id: 'reward', label: 'Rewards' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedTab === tab.id
                ? 'bg-brand-teal text-deep font-bold'
                : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="glass-card p-12 text-center text-text-muted text-xs font-mono">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`glass-card p-4 flex items-start justify-between gap-4 transition-all ${
                !n.read ? 'border-brand-teal/40 bg-white/[0.04]' : 'border-white/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 mt-0.5">
                  {iconMap[n.type] || <Bell size={16} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-white text-sm">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{n.body}</p>
                  <span className="text-[10px] font-mono text-text-muted mt-2 block">
                    {n.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {!n.read && (
                  <button
                    onClick={() => markRead(n.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-brand-green hover:bg-white/5"
                    title="Mark as Read"
                  >
                    <CheckCircle2 size={15} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotif(n.id)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-white/5"
                  title="Delete"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
