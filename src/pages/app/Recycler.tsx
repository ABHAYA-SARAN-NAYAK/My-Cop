import React, { useState } from 'react';
import { useMarketStore } from '../../store/useMarketStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useLedgerStore } from '../../store/useLedgerStore';
import { formatCurrency } from '../../lib/format';
import { CategoryBadge, SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Recycle,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Package,
  Layers,
  X,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const RecyclerPage: React.FC = () => {
  const { listings, transactions } = useMarketStore();
  const { user } = useAuthStore();
  const addBlock = useLedgerStore((s) => s.addBlock);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [demandModalOpen, setDemandModalOpen] = useState(false);
  const [reqCategory, setReqCategory] = useState('plastic');
  const [reqQty, setReqQty] = useState(500);
  const [reqPrice, setReqPrice] = useState(40);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Recycler Bids State
  const [myBids, setMyBids] = useState([
    { id: 'b1', title: 'Clean Shredded PET Flakes – 240kg', amount: 37.5, status: 'Active', time: '10m ago' },
    { id: 'b2', title: 'HDPE Milk Containers – 310kg', amount: 43.5, status: 'Active', time: '40m ago' },
    { id: 'b3', title: 'Crushed Glass Cullet – 420kg', amount: 13.5, status: 'Won', time: 'Yesterday' },
  ]);

  const handleWithdrawBid = (id: string) => {
    setMyBids((prev) => prev.filter((b) => b.id !== id));
    showToast('Bid withdrawn successfully.');
  };

  // Orders State
  const [orders, setOrders] = useState([
    { id: 'ORD-901', batchId: 'BATCH-2026-P01', title: 'Clean Shredded PET Flakes', weight: 240, status: 'In Transit', driver: 'Truck TRK-04' },
    { id: 'ORD-892', batchId: 'BATCH-2026-P02', title: 'HDPE Milk Jug Granules', weight: 310, status: 'Delivered', driver: 'Truck TRK-01' },
  ]);

  const handleMarkReceived = async (orderId: string, batchId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Received & Recycled' } : o))
    );
    await addBlock(
      batchId,
      'Recycled',
      `Facility: GreenLoop Recyclers. Material received & converted to circular pellets. 100% landfill diverted.`
    );
    showToast(`Order ${orderId} confirmed! Cryptographic ledger updated.`);
  };

  const handlePostDemand = (e: React.FormEvent) => {
    e.preventDefault();
    setDemandModalOpen(false);
    showToast(`Requirement posted on Generator Exchange: Seeking ${reqQty}kg of ${reqCategory.toUpperCase()} at ₹${reqPrice}/kg.`);
  };

  // Recycler Volume Data
  const volumeData = [
    { month: 'Jul', weight: 1200 },
    { month: 'Aug', weight: 1450 },
    { month: 'Sep', weight: 1800 },
    { month: 'Oct', weight: 2100 },
    { month: 'Nov', weight: 2450 },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 glass-card px-4 py-2 border-brand-green text-white text-xs font-mono shadow-2xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-brand-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Recycler & Buyer Portal
            </h1>
            <SimulatedBadge />
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              GreenLoop Recyclers (Verified Buyer)
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Procure sorted secondary materials, manage active bids, and log circular recycling on the blockchain.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setDemandModalOpen(true)}
          leftIcon={<Plus size={14} />}
        >
          Post Raw Material Requirement
        </Button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="glass-card p-4">
          <span className="text-[10px] text-text-muted uppercase">Active Bids</span>
          <p className="text-2xl font-heading font-extrabold text-white mt-1">
            {myBids.filter((b) => b.status === 'Active').length}
          </p>
          <span className="text-[10px] text-brand-teal">₹81/kg avg bid</span>
        </div>
        <div className="glass-card p-4">
          <span className="text-[10px] text-text-muted uppercase">Orders in Transit</span>
          <p className="text-2xl font-heading font-extrabold text-sky-400 mt-1">1 Lot</p>
          <span className="text-[10px] text-text-muted">Truck TRK-04 En Route</span>
        </div>
        <div className="glass-card p-4">
          <span className="text-[10px] text-text-muted uppercase">Total Inventory</span>
          <p className="text-2xl font-heading font-extrabold text-brand-green mt-1">2,450 kg</p>
          <span className="text-[10px] text-text-muted">Polymer Pellets</span>
        </div>
        <div className="glass-card p-4">
          <span className="text-[10px] text-text-muted uppercase">Spend This Month</span>
          <p className="text-2xl font-heading font-extrabold text-violet-400 mt-1">₹89,200</p>
          <span className="text-[10px] text-emerald-400">+14% feedstock</span>
        </div>
      </div>

      {/* 2-Column: Incoming Supply Feed + Active Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Incoming Matched Supply Feed */}
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-white text-base">
              Matched Raw Feedstock Listings
            </h3>
            <span className="text-xs font-mono text-brand-teal">Filter: PET & HDPE</span>
          </div>

          <div className="space-y-3">
            {listings.slice(0, 4).map((listing) => (
              <div
                key={listing.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-xs font-mono"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold">{listing.title}</span>
                    <span className="text-[10px] text-sky-400 font-semibold">{listing.purity}% Purity</span>
                  </div>
                  <p className="text-[11px] text-text-muted">
                    {listing.weightKg} kg · ₹{listing.pricePerKg}/kg · {listing.location}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast(`Placed instant bid of ₹${listing.pricePerKg}/kg on ${listing.id}`)}
                >
                  Quick Bid
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Orders & Recycled Receipt */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-heading font-bold text-white text-sm">Procurement Deliveries</h3>

            <div className="space-y-3 font-mono text-xs">
              {orders.map((ord) => (
                <div key={ord.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{ord.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        ord.status === 'In Transit'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted">
                    {ord.weight} kg · {ord.driver}
                  </p>
                  {ord.status === 'In Transit' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleMarkReceived(ord.id, ord.batchId)}
                    >
                      Confirm Material Received
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Procured Volume Trend Chart */}
          <div className="glass-card p-5 space-y-3">
            <h4 className="text-xs font-mono text-text-muted uppercase">Monthly Intake Volume (kg)</h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <XAxis dataKey="month" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="weight" fill="#4ADE80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Demand Requirement Modal */}
      {demandModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handlePostDemand}
            className="glass-card p-6 max-w-md w-full border border-white/20 space-y-4 font-mono text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base font-sans">
                Post Raw Material Requirement
              </h3>
              <button type="button" onClick={() => setDemandModalOpen(false)} className="text-text-muted hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="text-text-muted block mb-1">Target Material Category</label>
              <select
                value={reqCategory}
                onChange={(e) => setReqCategory(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
              >
                <option value="plastic">PET Plastic Shreds (Grade A)</option>
                <option value="organic">Organic Biomass (High Nitrogen)</option>
                <option value="metal">Aluminum Beverage Scrap</option>
                <option value="glass">Clear Flint Glass Cullet</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-text-muted block mb-1">Target Quantity (kg)</label>
                <input
                  type="number"
                  value={reqQty}
                  onChange={(e) => setReqQty(Number(e.target.value))}
                  className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-text-muted block mb-1">Max Offer Price (₹/kg)</label>
                <input
                  type="number"
                  value={reqPrice}
                  onChange={(e) => setReqPrice(Number(e.target.value))}
                  className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setDemandModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Publish Requirement
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
