import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deep: '#070B14',
        surface: '#0F1626',
        elevated: '#172033',
        'border-soft': 'rgba(255, 255, 255, 0.08)',
        'text-main': '#F1F5F9',
        'text-muted': '#94A3B8',
        waste: {
          plastic: '#38BDF8',
          recyclable: '#38BDF8',
          organic: '#4ADE80',
          metal: '#A78BFA',
          glass: '#2DD4BF',
          landfill: '#FBBF24',
          ewaste: '#F472B6',
        },
        brand: {
          green: '#22E58B',
          teal: '#14B8A6',
          blue: '#3B82F6',
          purple: '#8B5CF6',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        btn: '14px',
        input: '12px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #22E58B 0%, #14B8A6 35%, #3B82F6 70%, #8B5CF6 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #2cf095 0%, #17c9b6 35%, #4b8efc 70%, #9b6ffc 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
