import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-brand-teal/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-btn gap-2',
    lg: 'text-base px-6 py-3 rounded-btn gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-brand-gradient text-deep font-semibold shadow-[0_4px_20px_rgba(34,229,139,0.25)] hover:shadow-[0_6px_25px_rgba(34,229,139,0.4)] hover:brightness-105',
    secondary:
      'bg-white/[0.06] hover:bg-white/[0.12] text-text-main border border-white/10 hover:border-white/20 backdrop-blur-md',
    outline:
      'bg-transparent hover:bg-white/[0.05] text-text-main border border-white/20 hover:border-brand-teal/50',
    ghost: 'bg-transparent hover:bg-white/[0.08] text-text-main',
    danger:
      'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
