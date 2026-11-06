import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}> = ({ children, className = '', onClick, hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4 } : undefined}
      onClick={onClick}
      className={`glass-card p-5 relative overflow-hidden transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-white/20' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const StatCard: React.FC<{
  icon: any;
  iconColor?: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  isUp?: boolean;
  subtitle?: string;
  className?: string;
}> = ({
  icon: Icon,
  iconColor = '#22E58B',
  label,
  value,
  unit,
  trend,
  isUp = true,
  subtitle,
  className = '',
}) => {
  return (
    <GlassCard className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {label}
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-3xl font-heading font-extrabold text-white tracking-tight">
              {value}
            </span>
            {unit && <span className="text-sm font-mono text-text-muted">{unit}</span>}
          </div>
        </div>
        <div
          className="p-3 rounded-2xl flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>

      {(trend || subtitle) && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-mono font-medium ${
                isUp ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {trend}
            </span>
          )}
          {subtitle && <span className="text-text-muted font-sans text-[11px]">{subtitle}</span>}
        </div>
      )}
    </GlassCard>
  );
};
