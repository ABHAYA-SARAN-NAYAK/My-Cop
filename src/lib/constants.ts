import { WasteCategory } from '../types';

export const CATEGORY_COLORS: Record<WasteCategory, { bg: string; text: string; border: string; hex: string; name: string }> = {
  plastic: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    hex: '#38BDF8',
    name: 'Recyclable Plastic',
  },
  organic: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    hex: '#4ADE80',
    name: 'Organic Biomass',
  },
  metal: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
    hex: '#A78BFA',
    name: 'Scrap Metal',
  },
  glass: {
    bg: 'bg-teal-500/10',
    text: 'text-teal-400',
    border: 'border-teal-500/30',
    hex: '#2DD4BF',
    name: 'Glass Cullet',
  },
  landfill: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    hex: '#FBBF24',
    name: 'Landfill / Other',
  },
  ewaste: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    hex: '#F472B6',
    name: 'E-Waste',
  },
};

export const CHENNAI_AREAS = [
  'All Areas',
  'T. Nagar',
  'Adyar',
  'Velachery',
  'Anna Nagar',
  'Guindy',
  'Tambaram',
  'Porur',
  'OMR',
];

export const SORTING_HUBS = [
  { name: 'Guindy Central AI Sorting Hub', lat: 13.0080, lng: 80.2030 },
  { name: 'Velachery Bio-Converter Plant', lat: 12.9840, lng: 80.2220 },
  { name: 'Porur Materials Recovery Depot', lat: 13.0360, lng: 80.1580 },
];
