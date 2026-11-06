export type Role = 'generator' | 'recycler' | 'admin' | 'driver';

export type WasteCategory = 'plastic' | 'organic' | 'metal' | 'glass' | 'landfill' | 'ewaste';

export interface User {
  id: string;
  name: string;
  role: Role;
  area: string;
  avatar: string;
  points: number;
  tier: 'Seedling' | 'Sprout' | 'Tree' | 'Forest Guardian';
  email?: string;
  phone?: string;
}

export interface BinLocation {
  lat: number;
  lng: number;
  label: string;
}

export interface Bin {
  id: string;
  type: WasteCategory;
  location: BinLocation;
  fillPercent: number;
  status: 'normal' | 'near-full' | 'full' | 'offline';
  lastEmptied: string;
  batteryPercent: number;
  signalStrength: number; // 1-5 bars
  temperatureC: number;
  gasLevel?: number; // ppm for organic
}

export type PickupStatus = 'Requested' | 'Assigned' | 'OnTheWay' | 'PickedUp' | 'Sorting' | 'Delivered';

export interface TimelineEvent {
  step: string;
  time: string;
  done: boolean;
  active?: boolean;
}

export interface Pickup {
  id: string;
  binId: string;
  wasteType: WasteCategory;
  status: PickupStatus;
  truckId?: string;
  etaMinutes?: number;
  createdAt: string;
  timeline: TimelineEvent[];
  address: string;
  weightKg: number;
  userNote?: string;
}

export interface Truck {
  id: string;
  driverName: string;
  location: {
    lat: number;
    lng: number;
  };
  capacityKg: number;
  loadKg: number;
  status: 'Idle' | 'EnRoute' | 'Collecting' | 'Returning';
  assignedPickupId?: string;
  speedKmH?: number;
}

export interface Batch {
  id: string;
  category: WasteCategory;
  weightKg: number;
  purity: number; // percentage 0-100
  origin: string;
  status: 'Collected' | 'Segregated' | 'Listed' | 'Sold' | 'Recycled';
  createdAt: string;
  listingId?: string;
}

export interface Bid {
  id: string;
  bidder: string;
  amount: number;
  time: string;
}

export interface Listing {
  id: string;
  batchId: string;
  title: string;
  category: WasteCategory;
  weightKg: number;
  pricePerKg: number;
  purity: number;
  location: string;
  distanceKm: number;
  seller: string;
  verified: boolean;
  bids: Bid[];
  createdAt: string;
}

export interface Block {
  index: number;
  timestamp: number;
  batchId: string;
  event: 'Collected' | 'Segregated' | 'Listed' | 'Sold' | 'Recycled';
  data: string;
  prevHash: string;
  hash: string;
  tampered?: boolean;
}

export interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  icon: string;
  description: string;
  category: 'voucher' | 'eco' | 'utility' | 'community';
}

export interface Notification {
  id: string;
  type: 'alert' | 'pickup' | 'market' | 'reward' | 'system';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface Transaction {
  id: string;
  listingId: string;
  title: string;
  amount: number;
  buyer: string;
  date: string;
  weightKg: number;
  status: 'Pending' | 'Completed';
}
