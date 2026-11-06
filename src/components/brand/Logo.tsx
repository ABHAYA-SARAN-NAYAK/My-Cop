import React from 'react';
import { Link } from 'react-router-dom';

export const LOGO_IMAGE_URL = 'https://res.cloudinary.com/dkht5j3tw/image/upload/v1793985731/Eco_Innovation_Sprout_Logo_jikv5y.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  to?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  to = '/',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Logo Image */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 group overflow-hidden rounded-xl`}>
        <img
          src={LOGO_IMAGE_URL}
          alt="MyCop Logo"
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={`font-heading font-extrabold tracking-tight ${textSizes[size]} bg-gradient-to-r from-brand-green via-brand-teal to-brand-blue bg-clip-text text-transparent leading-tight`}
        >
          MyCop
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted font-medium -mt-0.5">
            Waste Link System
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-block hover:opacity-95 transition-opacity">{content}</Link>;
  }

  return content;
};
