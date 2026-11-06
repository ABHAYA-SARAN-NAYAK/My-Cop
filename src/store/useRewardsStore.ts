import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Reward } from '../types';
import { SEED_REWARDS } from '../data/seed';

export interface RewardTransaction {
  id: string;
  rewardId?: string;
  title: string;
  points: number; // positive for earned, negative for spent
  date: string;
  type: 'earned' | 'redeemed';
}

interface RewardsState {
  points: number;
  tier: 'Seedling' | 'Sprout' | 'Tree' | 'Forest Guardian';
  rewards: Reward[];
  history: RewardTransaction[];
  addPoints: (amount: number, reason: string) => void;
  redeemReward: (reward: Reward) => boolean;
  resetRewards: () => void;
}

const INITIAL_HISTORY: RewardTransaction[] = [
  { id: 'RH-1', title: 'PET Plastic Segregation Bonus', points: 50, date: 'Today, 2:10 PM', type: 'earned' },
  { id: 'RH-2', title: 'On-Time Bin Pickup Compliance', points: 15, date: 'Today, 10:15 AM', type: 'earned' },
  { id: 'RH-3', title: 'Redeemed Metro Transit Voucher', points: -350, date: 'Yesterday', type: 'redeemed' },
  { id: 'RH-4', title: 'Weekly Clean Segregation Streak', points: 100, date: '3 days ago', type: 'earned' },
  { id: 'RH-5', title: 'Referral Bonus: Apartment Block A', points: 250, date: '5 days ago', type: 'earned' },
];

export const useRewardsStore = create<RewardsState>()(
  persist(
    (set, get) => ({
      points: 1240,
      tier: 'Tree',
      rewards: SEED_REWARDS,
      history: INITIAL_HISTORY,

      addPoints: (amount, reason) => {
        const newPoints = get().points + amount;
        let tier: RewardsState['tier'] = 'Seedling';
        if (newPoints >= 3000) tier = 'Forest Guardian';
        else if (newPoints >= 1000) tier = 'Tree';
        else if (newPoints >= 400) tier = 'Sprout';

        const record: RewardTransaction = {
          id: `RH-${Date.now()}`,
          title: reason,
          points: amount,
          date: 'Just now',
          type: 'earned',
        };

        set({
          points: newPoints,
          tier,
          history: [record, ...get().history],
        });
      },

      redeemReward: (reward) => {
        if (get().points < reward.pointsCost) return false;

        const newPoints = get().points - reward.pointsCost;
        let tier: RewardsState['tier'] = 'Seedling';
        if (newPoints >= 3000) tier = 'Forest Guardian';
        else if (newPoints >= 1000) tier = 'Tree';
        else if (newPoints >= 400) tier = 'Sprout';

        const record: RewardTransaction = {
          id: `RH-${Date.now()}`,
          rewardId: reward.id,
          title: `Redeemed: ${reward.name}`,
          points: -reward.pointsCost,
          date: 'Just now',
          type: 'redeemed',
        };

        set({
          points: newPoints,
          tier,
          history: [record, ...get().history],
        });
        return true;
      },

      resetRewards: () =>
        set({
          points: 1240,
          tier: 'Tree',
          rewards: SEED_REWARDS,
          history: INITIAL_HISTORY,
        }),
    }),
    {
      name: 'mycop_rewards',
    }
  )
);
