import React from 'react';
import { ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { WasteCategory } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';

interface CategoryBadgeProps {
  category: WasteCategory;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const conf = CATEGORY_COLORS[category] || CATEGORY_COLORS.plastic;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${conf.bg} ${conf.text} ${conf.border} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.hex }} />
      {conf.name}
    </span>
  );
};

export const SimulatedBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25 tracking-wide ${className}`}
      title="This feature uses simulated mock hardware and browser logic for hackathon demonstration."
    >
      <Sparkles size={10} />
      Simulated demo
    </span>
  );
};

export const VerifiedLedgerBadge: React.FC<{ hash?: string; className?: string }> = ({
  hash,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 tracking-tight ${className}`}
      title={hash ? `SHA-256: ${hash}` : 'Verified on cryptographic ledger'}
    >
      <ShieldCheck size={11} className="text-emerald-400" />
      Verified Ledger
    </span>
  );
};

export const StatusBadge: React.FC<{
  status: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}> = ({ status, type = 'info', className = '' }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${styles[type]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};
