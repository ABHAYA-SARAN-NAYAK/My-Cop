import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketStore } from '../../store/useMarketStore';
import { useAuthStore } from '../../store/useAuthStore';
import { WasteCategory, Listing } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';
import { formatCurrency } from '../../lib/format';
import { CategoryBadge, VerifiedLedgerBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { listings, addListing } = useMarketStore();
  const { role } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPurity, setMinPurity] = useState<number>(85);
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price' | 'purity' | 'distance'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Post Listing Drawer
  const [postDrawerOpen, setPostDrawerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<WasteCategory>('plastic');
  const [newWeight, setNewWeight] = useState(250);
  const [newPrice, setNewPrice] = useState(38);
  const [newPurity, setNewPurity] = useState(97.5);

  const handlePostListing = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Listing = {
      id: `LST-${Date.now().toString().slice(-3)}`,
      batchId: `BATCH-2026-${newCategory.charAt(0).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`,
      title: newTitle || `Processed ${newCategory.toUpperCase()} Batch`,
      category: newCategory,
      weightKg: newWeight,
      pricePerKg: newPrice,
      purity: newPurity,
      location: 'Guindy Sorting Facility, Chennai',
      distanceKm: 3.2,
      seller: 'MyCop Automated Recovery Facility',
      verified: true,
      bids: [],
      createdAt: 'Just now',
    };
    addListing(created);
    setPostDrawerOpen(false);
    setNewTitle('');
  };

  // Filter & Sort
  const filteredListings = listings
    .filter((l) => {
      const matchesSearch =
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || l.category === selectedCategory;
      const matchesPurity = l.purity >= minPurity;
      const matchesDistance = l.distanceKm <= maxDistance;
      const matchesVerified = !verifiedOnly || l.verified;
      return matchesSearch && matchesCat && matchesPurity && matchesDistance && matchesVerified;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'purity') return b.purity - a.purity;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0; // newest by default
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">
            Digital Waste Marketplace
          </h1>
          <p className="text-xs text-text-muted mt-1">
            B2B exchange matching sorted secondary raw materials directly with certified recycling plants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid / List view */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-brand-teal text-deep font-bold' : 'text-text-muted hover:text-white'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-brand-teal text-deep font-bold' : 'text-text-muted hover:text-white'
              }`}
            >
              <ListIcon size={16} />
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setPostDrawerOpen(true)}
            leftIcon={<Plus size={14} />}
          >
            Post Waste Listing
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search listings by title, polymer, or facility..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-teal"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-teal font-mono"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price">Sort: Price (Low to High)</option>
            <option value="purity">Sort: Purity (High to Low)</option>
            <option value="distance">Sort: Nearest Distance</option>
          </select>
        </div>

        {/* Category Chips & Sliders */}
        <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'plastic', 'metal', 'organic', 'glass', 'ewaste'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-teal text-deep font-bold'
                    : 'bg-white/5 text-text-muted hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="flex flex-wrap items-center gap-4 text-text-muted">
            <div className="flex items-center gap-2">
              <span>Min Purity:</span>
              <input
                type="range"
                min="80"
                max="99"
                value={minPurity}
                onChange={(e) => setMinPurity(Number(e.target.value))}
                className="w-20 accent-brand-green"
              />
              <span className="text-white font-bold">{minPurity}%</span>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="accent-brand-green"
              />
              <span>Ledger Verified Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Listings Grid or List */}
      {filteredListings.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-white">No listings match your filter criteria.</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMinPurity(80);
              setMaxDistance(25);
              setVerifiedOnly(false);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-3'
          }
        >
          {filteredListings.map((listing) => {
            const catConf = CATEGORY_COLORS[listing.category] || CATEGORY_COLORS.plastic;

            return (
              <div
                key={listing.id}
                className="glass-card p-5 border-white/10 hover:border-white/25 flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  {/* Category Stripe & Badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <CategoryBadge category={listing.category} />
                    {listing.verified && <VerifiedLedgerBadge />}
                  </div>

                  <h3 className="font-heading font-bold text-white text-base group-hover:text-brand-teal transition-colors leading-snug">
                    {listing.title}
                  </h3>

                  <p className="text-xs text-text-muted mt-1 flex items-center gap-1 font-mono">
                    <MapPin size={12} className="text-brand-teal" />
                    <span>{listing.location} ({listing.distanceKm} km away)</span>
                  </p>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center font-mono">
                    <div>
                      <span className="text-[10px] text-text-muted block">Weight</span>
                      <span className="text-sm font-bold text-white">{listing.weightKg} kg</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block">Rate</span>
                      <span className="text-sm font-bold text-brand-green">₹{listing.pricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block">Purity</span>
                      <span className="text-sm font-bold text-sky-400">{listing.purity}%</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted font-mono">Total Lot Value</span>
                    <span className="text-sm font-bold text-white font-mono">
                      {formatCurrency(listing.weightKg * listing.pricePerKg)}
                    </span>
                  </div>

                  <Link to={`/app/marketplace/${listing.id}`}>
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight size={13} />}>
                      View & Bid
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Post Listing Drawer */}
      {postDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/60 backdrop-blur-sm flex justify-end">
          <form
            onSubmit={handlePostListing}
            className="w-full max-w-md bg-[#0F1626] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-heading font-bold text-white text-base">
                  Post Recycled Material Batch
                </h3>
                <button
                  type="button"
                  onClick={() => setPostDrawerOpen(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="my-6 space-y-4 text-xs font-mono">
                <div>
                  <label className="text-text-muted block mb-1">Listing Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Clean Shredded PET Flakes"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-text-muted block mb-1">Stream Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white capitalize"
                  >
                    {(['plastic', 'metal', 'organic', 'glass', 'ewaste'] as WasteCategory[]).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-text-muted block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      required
                      value={newWeight}
                      onChange={(e) => setNewWeight(Number(e.target.value))}
                      className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-text-muted block mb-1">Price per kg (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-text-muted block mb-1">Certified Purity %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newPurity}
                    onChange={(e) => setNewPurity(Number(e.target.value))}
                    className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setPostDrawerOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Publish Listing
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
