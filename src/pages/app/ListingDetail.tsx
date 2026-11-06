import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMarketStore } from '../../store/useMarketStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useLedgerStore } from '../../store/useLedgerStore';
import { executeMarketPurchase } from '../../store/actions';
import { formatCurrency, triggerRewardCelebration, truncateHash } from '../../lib/format';
import { CategoryBadge, VerifiedLedgerBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  DollarSign,
  Package,
  Layers,
  CheckCircle2,
  X,
  CreditCard,
  Truck,
} from 'lucide-react';

export const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listings, placeBid } = useMarketStore();
  const { user, role } = useAuthStore();
  const blocks = useLedgerStore((s) => s.blocks);

  const listing = listings.find((l) => l.id === id) || listings[0];

  const [bidAmount, setBidAmount] = useState<number>(listing ? listing.pricePerKg : 38);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  if (!listing) {
    return (
      <div className="glass-card p-12 text-center space-y-4">
        <h2 className="text-xl font-heading font-bold text-white">Listing not found</h2>
        <Link to="/app/marketplace">
          <Button variant="primary" size="sm">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const batchBlocks = blocks.filter((b) => b.batchId === listing.batchId);
  const totalValue = listing.weightKg * listing.pricePerKg;

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    placeBid(listing.id, {
      id: `bid-${Date.now()}`,
      bidder: user.name,
      amount: bidAmount,
      time: 'Just now',
    });
    alert(`Bid of ₹${bidAmount}/kg placed successfully!`);
  };

  const handleBuyNowConfirm = async () => {
    setIsProcessingCheckout(true);
    await new Promise((r) => setTimeout(r, 1000));
    await executeMarketPurchase(listing.id, user.name);
    setIsProcessingCheckout(false);
    setPurchaseSuccess(true);
    triggerRewardCelebration();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link
        to="/app/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> Back to Marketplace
      </Link>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Details, Blockchain History, Specifications */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CategoryBadge category={listing.category} />
              {listing.verified && <VerifiedLedgerBadge />}
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {listing.title}
            </h1>

            <p className="text-xs font-mono text-text-muted flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-teal" />
              <span>{listing.location} · {listing.distanceKm} km transit distance</span>
            </p>

            {/* Key Facts Metric Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center font-mono">
              <div>
                <span className="text-[10px] text-text-muted uppercase">Lot Weight</span>
                <p className="text-lg font-bold text-white mt-0.5">{listing.weightKg} kg</p>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase">Current Asking Rate</span>
                <p className="text-lg font-bold text-brand-green mt-0.5">₹{listing.pricePerKg} / kg</p>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase">Certified Purity</span>
                <p className="text-lg font-bold text-sky-400 mt-0.5">{listing.purity}%</p>
              </div>
            </div>

            {/* Description & Technical Standards */}
            <div className="space-y-2 text-xs text-text-muted leading-relaxed">
              <h3 className="font-heading font-bold text-white text-sm">Specification & Quality Standards</h3>
              <p>
                Optical and robotic-sorted secondary feedstock with guaranteed contamination thresholds under 2.5%.
                Washed, metal-separated, and packed in industrial 500kg bulk poly bags ready for mechanical extrusion or anaerobic bio-conversion.
              </p>
            </div>
          </div>

          {/* Blockchain Provenance Chain History (Section 10.7 & 10.8) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                <Layers size={16} className="text-brand-teal" />
                <span>Cryptographic Ledger Trail ({listing.batchId})</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                SHA-256 Verified
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {batchBlocks.length > 0 ? (
                batchBlocks.map((block) => (
                  <div
                    key={block.index}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-brand-green font-bold">
                        Block #{block.index} · {block.event}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(block.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">{block.data}</p>
                    <p className="text-[9px] text-text-muted truncate">
                      SHA-256: {truncateHash(block.hash, 12, 8)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-text-muted">
                  Genesis batch block registered at sorting facility.
                </div>
              )}
            </div>
          </div>

          {/* Seller Card */}
          <div className="glass-card p-4 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-text-muted">Listed By</span>
              <p className="font-bold text-white mt-0.5">{listing.seller}</p>
              <p className="text-[11px] text-text-muted font-mono">GCC Approved Material Recovery Hub</p>
            </div>
            <span className="px-2 py-1 rounded-lg bg-white/5 text-brand-green font-mono text-[11px]">
              ⭐ 4.9 Purity Score
            </span>
          </div>
        </div>

        {/* Right Column: Bid Panel & Buy Now */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-6 space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-text-muted">Total Batch Value</span>
              <p className="text-3xl font-heading font-extrabold text-white mt-1">
                {formatCurrency(totalValue)}
              </p>
              <p className="text-[11px] font-mono text-brand-teal mt-0.5">
                {listing.weightKg} kg @ ₹{listing.pricePerKg} / kg
              </p>
            </div>

            {/* Instant Buy Now Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setCheckoutModalOpen(true)}
              leftIcon={<Sparkles size={16} />}
            >
              Buy Now & Dispatch
            </Button>

            {/* Bidding Section */}
            <form onSubmit={handlePlaceBid} className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono text-text-muted uppercase font-bold block">
                Submit Competitive Bid
              </span>
              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  Your Bid Price per kg (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="flex-1 bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-teal"
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Place Bid
                  </Button>
                </div>
              </div>
            </form>

            {/* Live Bids Feed */}
            <div>
              <span className="text-[10px] font-mono uppercase text-text-muted block mb-2">
                Recent Bids on this Lot
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                {listing.bids.length > 0 ? (
                  listing.bids.map((b) => (
                    <div
                      key={b.id}
                      className="flex justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <span className="text-slate-300 truncate">{b.bidder}</span>
                      <span className="text-brand-green font-bold">₹{b.amount}/kg</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-text-muted">No competitive bids yet. Be the first!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full border border-white/20 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base">Purchase Recycled Batch</h3>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-text-muted hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {purchaseSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 size={40} className="text-brand-green mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-white text-lg">Purchase Confirmed!</h4>
                <p className="text-xs text-text-muted font-mono">
                  Batch has been transferred to your recycler inventory. Ledger transaction block generated.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    navigate('/app/recycler');
                  }}
                >
                  Go to Recycler Portal
                </Button>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Item:</span>
                    <span className="text-white font-bold truncate max-w-[200px]">{listing.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Quantity:</span>
                    <span className="text-white font-bold">{listing.weightKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Delivery Option:</span>
                    <span className="text-brand-teal">Direct EV Truck Haulage</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                    <span className="text-white font-bold">Total Payable:</span>
                    <span className="text-brand-green font-bold">{formatCurrency(totalValue)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-green/10 border border-brand-green/20 text-[11px] font-mono text-brand-green flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>Demo Mode: Instant simulated settlement & automated ledger escrow.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setCheckoutModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isProcessingCheckout}
                    onClick={handleBuyNowConfirm}
                    rightIcon={<Sparkles size={14} />}
                  >
                    Confirm Order
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
