import React, { useState } from 'react';
import { useRewardsStore } from '../../store/useRewardsStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Reward } from '../../types';
import { triggerRewardCelebration } from '../../lib/format';
import { Button } from '../../components/ui/Button';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Gift,
  Share2,
  Calendar,
  Flame,
  ArrowRight,
  Train,
  ShoppingBag,
  Sprout,
  Film,
  Package,
  Heart,
  Receipt,
  TreePine,
  X,
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { points, tier, rewards, history, redeemReward, addPoints } = useRewardsStore();
  const { user } = useAuthStore();

  const [leaderboardTab, setLeaderboardTab] = useState<'week' | 'month' | 'all'>('week');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  // Icon mapper
  const iconMap: Record<string, any> = {
    train: Train,
    'shopping-bag': ShoppingBag,
    sprout: Sprout,
    film: Film,
    package: Package,
    heart: Heart,
    receipt: Receipt,
    'tree-pine': TreePine,
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    const ok = redeemReward(selectedReward);
    if (ok) {
      triggerRewardCelebration();
      setRedeemSuccess(`Successfully redeemed ${selectedReward.name}! Your coupon code: MC-${Date.now().toString().slice(-6)}`);
      setSelectedReward(null);
      setTimeout(() => setRedeemSuccess(null), 6000);
    } else {
      alert('Insufficient points for this reward.');
    }
  };

  // Top 10 Leaderboard Mock Data (Priya highlighted at rank #4)
  const leaderboardData = [
    { rank: 1, name: 'Ananya Sharma', area: 'Adyar', points: 3450, tier: 'Forest Guardian' },
    { rank: 2, name: 'Vikram Sundaram', area: 'Anna Nagar', points: 2890, tier: 'Tree' },
    { rank: 3, name: 'Meera Krishnan', area: 'Velachery', points: 1980, tier: 'Tree' },
    { rank: 4, name: 'Priya Nair (You)', area: 'T. Nagar', points, tier, isCurrentUser: true },
    { rank: 5, name: 'Rohan Deshmukh', area: 'Guindy', points: 1120, tier: 'Tree' },
    { rank: 6, name: 'Kavitha Raman', area: 'OMR', points: 950, tier: 'Sprout' },
    { rank: 7, name: 'Siddharth Iyer', area: 'Porur', points: 870, tier: 'Sprout' },
    { rank: 8, name: 'Deepa V.', area: 'Tambaram', points: 790, tier: 'Sprout' },
    { rank: 9, name: 'Arjun Balaji', area: 'T. Nagar', points: 640, tier: 'Sprout' },
    { rank: 10, name: 'Swetha Nathan', area: 'Adyar', points: 520, tier: 'Seedling' },
  ];

  // Badges Earned
  const badges = [
    { name: 'First Disposal', icon: '🌱', desc: 'Completed initial sorted batch pickup' },
    { name: 'Zero Landfill Week', icon: '🛡️', desc: '7 consecutive days with 0 mixed waste' },
    { name: 'Compost Hero', icon: '🌿', desc: 'Diverted 50kg organic biomass to biogas' },
    { name: 'Polymer Master', icon: '💎', desc: 'Maintained 98%+ purity in plastic stream' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Success Banner */}
      {redeemSuccess && (
        <div className="glass-card p-4 border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-brand-green" />
            <span>{redeemSuccess}</span>
          </div>
          <button onClick={() => setRedeemSuccess(null)} className="text-text-muted hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header Card: Points Balance & Tier Status */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-surface via-elevated to-surface border-brand-green/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-brand-green tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} /> Citizen Circular Economy Rewards
          </span>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
              {points.toLocaleString()}
            </span>
            <span className="text-lg font-mono text-text-muted">Green Points</span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Current Tier: <strong className="text-white">{tier}</strong> (Rank #4 in T. Nagar Ward)
          </p>

          {/* Progress bar to next tier */}
          <div className="mt-4 w-full max-w-md">
            <div className="flex justify-between text-[11px] font-mono text-text-muted mb-1">
              <span>{points} pts</span>
              <span>Next: Forest Guardian (3,000 pts)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-brand-gradient rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (points / 3000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Earn Points Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addPoints(50, 'Referral Bonus: Neighbor Joined')}
            leftIcon={<Share2 size={14} />}
          >
            Refer a Friend (+50 pts)
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => addPoints(25, 'Streak Reward: 7 Days Consistent Disposal')}
            leftIcon={<Flame size={14} />}
          >
            Claim Streak (+25 pts)
          </Button>
        </div>
      </div>

      {/* How to Earn Points Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { task: 'Clean Segregation', pts: '+10 pts / kg', icon: '♻️' },
          { task: 'On-Time Disposal', pts: '+15 pts', icon: '⏱️' },
          { task: 'Refer an Apartment', pts: '+50 pts', icon: '🤝' },
          { task: 'Weekly Zero-Waste', pts: '+25 pts', icon: '🔥' },
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-3 text-center border-white/5">
            <span className="text-xl block mb-1">{item.icon}</span>
            <span className="text-xs font-semibold text-white block truncate">{item.task}</span>
            <span className="text-xs font-mono font-bold text-brand-green mt-0.5 block">{item.pts}</span>
          </div>
        ))}
      </div>

      {/* Rewards Catalog Grid (8 Rewards from Section 10.9) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-white">Rewards Catalog</h2>
          <span className="text-xs font-mono text-text-muted">Instant digital vouchers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward) => {
            const Icon = iconMap[reward.icon] || Package;
            const canAfford = points >= reward.pointsCost;

            return (
              <div
                key={reward.id}
                className="glass-card p-5 flex flex-col justify-between border-white/10 hover:border-brand-teal/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                      {reward.pointsCost} pts
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-sm leading-snug">
                    {reward.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">
                    {reward.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5">
                  <Button
                    variant={canAfford ? 'primary' : 'secondary'}
                    size="sm"
                    className="w-full"
                    disabled={!canAfford}
                    onClick={() => setSelectedReward(reward)}
                  >
                    {canAfford ? 'Redeem Voucher' : 'Need More Points'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Grid: Leaderboard + Streak Heatmap + Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ward Leaderboard */}
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-white text-base">Ward 112 Leaderboard</h3>
              <p className="text-xs text-text-muted font-mono">T. Nagar Sector Top Segregators</p>
            </div>

            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
              {(['week', 'month', 'all'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setLeaderboardTab(tab)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    leaderboardTab === tab
                      ? 'bg-brand-teal text-deep font-bold'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs max-h-80 overflow-y-auto pr-1">
            {leaderboardData.map((row) => (
              <div
                key={row.rank}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                  row.isCurrentUser
                    ? 'bg-brand-teal/20 border-brand-teal text-white font-bold'
                    : 'bg-white/[0.02] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 text-center font-bold ${
                      row.rank === 1
                        ? 'text-amber-400'
                        : row.rank === 2
                        ? 'text-slate-300'
                        : row.rank === 3
                        ? 'text-amber-600'
                        : 'text-text-muted'
                    }`}
                  >
                    #{row.rank}
                  </span>
                  <div>
                    <span className="block truncate max-w-[140px]">{row.name}</span>
                    <span className="text-[10px] text-text-muted">{row.area} · {row.tier}</span>
                  </div>
                </div>

                <span className="text-brand-green font-bold">{row.points.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Badges & Streak Heatmap */}
        <div className="lg:col-span-5 space-y-4">
          {/* Streak Calendar Box */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-text-muted flex items-center gap-1.5">
                <Flame size={14} className="text-amber-400" />
                <span>14-Day Activity Streak</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">🔥 14 Days</span>
            </div>

            {/* Heatmap mini dots */}
            <div className="grid grid-cols-7 gap-1.5 pt-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 rounded-md bg-brand-green/30 border border-brand-green/50 flex items-center justify-center text-[10px] font-mono text-white"
                  title="Disposal Logged"
                >
                  ✓
                </div>
              ))}
            </div>
            <p className="text-[10px] text-text-muted font-mono">
              Consistently segregating unlocks property tax rebate eligibility.
            </p>
          </div>

          {/* Badges Box */}
          <div className="glass-card p-5 space-y-3">
            <h3 className="font-heading font-bold text-white text-sm">Achievements & Badges</h3>
            <div className="grid grid-cols-2 gap-2">
              {badges.map((b, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <span className="text-lg block mb-0.5">{b.icon}</span>
                  <p className="font-bold text-white truncate">{b.name}</p>
                  <p className="text-[10px] text-text-muted mt-0.5 leading-snug">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Points History Table */}
      <div className="glass-card p-6 space-y-3 font-mono text-xs">
        <h3 className="font-heading font-bold text-white text-base font-sans">
          Points Ledger History
        </h3>
        <div className="divide-y divide-white/5">
          {history.map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-[10px] text-text-muted">{item.date}</p>
              </div>
              <span
                className={`font-bold ${
                  item.points > 0 ? 'text-brand-green' : 'text-red-400'
                }`}
              >
                {item.points > 0 ? `+${item.points}` : item.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-sm w-full border border-white/20 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base">Redeem Reward</h3>
              <button onClick={() => setSelectedReward(null)} className="text-text-muted hover:text-white">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to redeem <strong>{selectedReward.name}</strong> for{' '}
              <span className="text-brand-green font-bold font-mono">{selectedReward.pointsCost} points</span>?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedReward(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmRedeem}>
                Confirm Redemption
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
