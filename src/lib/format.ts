import confetti from 'canvas-confetti';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)} kg`;
}

export function truncateHash(hash: string, lead = 8, trail = 6): string {
  if (!hash || hash.length <= lead + trail) return hash || '';
  return `${hash.slice(0, lead)}...${hash.slice(-trail)}`;
}

export function triggerRewardCelebration() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#22E58B', '#38BDF8', '#8B5CF6', '#FBBF24'],
  });
}
