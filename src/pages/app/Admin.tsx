import React, { useState } from 'react';
import { useBinsStore } from '../../store/useBinsStore';
import { useFleetStore } from '../../store/useFleetStore';
import { usePickupsStore } from '../../store/usePickupsStore';
import { useSimStore } from '../../store/useSimStore';
import { createDisposalAndPickup } from '../../store/actions';
import { LiveMap } from '../../components/maps/LiveMap';
import { WastePieChart } from '../../components/charts/WastePieChart';
import { SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Building2,
  AlertTriangle,
  Download,
  Send,
  Plus,
  Truck,
  CheckCircle2,
  Layers,
  Filter,
  Calendar,
  X,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminPage: React.FC = () => {
  const bins = useBinsStore((s) => s.bins);
  const trucks = useFleetStore((s) => s.trucks);
  const pickups = usePickupsStore((s) => s.pickups);
  const addTickerItem = useSimStore((s) => s.addTickerItem);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [selectedDispatchBinId, setSelectedDispatchBinId] = useState(bins[0]?.id || 'BIN-TN-01');
  const [selectedDispatchTruckId, setSelectedDispatchTruckId] = useState(trucks[0]?.id || 'TRK-01');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Live Alerts
  const [alerts, setAlerts] = useState([
    { id: 'ALT-1', text: 'Bin #BIN-VEL-01 reached 94% fill in Velachery Commercial zone.', time: '11:02 AM', type: 'urgent' },
    { id: 'ALT-2', text: 'Truck TRK-03 delay due to Mount-Poonamallee traffic corridor.', time: '11:15 AM', type: 'warning' },
    { id: 'ALT-3', text: 'Contamination warning flagged at Pondy Bazaar Bin #BIN-TN-02.', time: '11:45 AM', type: 'info' },
  ]);

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Step 4 of Deck Architecture: "Authorities Informed"
  const handleNotifyAuthorities = () => {
    showToast('GCC Smart City Authorities and Zonal Health Officers officially alerted via GovLink webhook!');
    addTickerItem('🏛️ GCC Ward Commissioner informed: Automated sector compliance digest delivered');
  };

  const handleDispatchTruckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bin = bins.find((b) => b.id === selectedDispatchBinId) || bins[0];
    await createDisposalAndPickup(bin.type, 35, bin.location.label);
    setDispatchModalOpen(false);
    showToast(`Truck ${selectedDispatchTruckId} dispatched to ${bin.id}!`);
  };

  // CSV Report Generator
  const handleDownloadCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'BinID,Type,Location,FillPercent,Status,Battery\n' +
      bins.map((b) => `${b.id},${b.type},"${b.location.label}",${b.fillPercent}%,${b.status},${b.batteryPercent}%`).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `mycop-city-report-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Area Table Aggregates
  const areaSummary = [
    { area: 'T. Nagar', bins: 3, avgFill: 71, pickupsToday: 4, recycling: 88, status: 'Active' },
    { area: 'Velachery', bins: 3, avgFill: 67, pickupsToday: 3, recycling: 84, status: 'Active' },
    { area: 'Adyar', bins: 3, avgFill: 77, pickupsToday: 5, recycling: 91, status: 'Active' },
    { area: 'Anna Nagar', bins: 3, avgFill: 68, pickupsToday: 2, recycling: 86, status: 'Active' },
    { area: 'Guindy', bins: 3, avgFill: 64, pickupsToday: 6, recycling: 94, status: 'High Volume' },
    { area: 'OMR Corridor', bins: 3, avgFill: 76, pickupsToday: 4, recycling: 89, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 glass-card px-4 py-2.5 border-brand-green text-white text-xs font-mono shadow-2xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-brand-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              City Command Center
            </h1>
            <SimulatedBadge />
            <span className="text-xs font-mono text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full border border-brand-green/20">
              Greater Chennai Corporation
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Central municipal operations: 24 active wards, live fleet routing, compliance auditing, and emergency dispatch.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNotifyAuthorities}
            leftIcon={<Send size={14} className="text-sky-400" />}
          >
            Notify Authorities (Deck Step 4)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDispatchModalOpen(true)}
            leftIcon={<Truck size={14} />}
          >
            Dispatch Truck
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setReportModalOpen(true)}
            leftIcon={<Download size={14} />}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* 6 Key Municipal KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div className="glass-card p-3.5 text-center">
          <span className="text-[10px] text-text-muted uppercase">Waste Today</span>
          <p className="text-xl font-heading font-extrabold text-white mt-1">85.4 kg</p>
          <span className="text-[9px] text-emerald-400">+18% vs avg</span>
        </div>
        <div className="glass-card p-3.5 text-center">
          <span className="text-[10px] text-text-muted uppercase">Smart Bins</span>
          <p className="text-xl font-heading font-extrabold text-brand-green mt-1">
            24 / 24
          </p>
          <span className="text-[9px] text-text-muted">100% Online</span>
        </div>
        <div className="glass-card p-3.5 text-center">
          <span className="text-[10px] text-text-muted uppercase">Active Pickups</span>
          <p className="text-xl font-heading font-extrabold text-sky-400 mt-1">
            {pickups.filter((p) => p.status !== 'Delivered').length}
          </p>
          <span className="text-[9px] text-text-muted">En Route</span>
        </div>
        <div className="glass-card p-3.5 text-center">
          <span className="text-[10px] text-text-muted uppercase">Recycle Rate</span>
          <p className="text-xl font-heading font-extrabold text-violet-400 mt-1">78.0%</p>
          <span className="text-[9px] text-emerald-400">+4.2% MoM</span>
        </div>
        <div className="glass-card p-3.5 text-center">
          <span className="text-[10px] text-text-muted uppercase">CO₂ Offset</span>
          <p className="text-xl font-heading font-extrabold text-white mt-1">56.8 kg</p>
          <span className="text-[9px] text-text-muted">Certified ESG</span>
        </div>
        <div className="glass-card p-3.5 text-center">
          <span className="text-[10px] text-text-muted uppercase">Rev This Month</span>
          <p className="text-xl font-heading font-extrabold text-emerald-400 mt-1">₹4.2L</p>
          <span className="text-[9px] text-emerald-400">Commissions & Fees</span>
        </div>
      </div>

      {/* Main 2-Column: Big City Map + Live Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* City Map */}
        <div className="lg:col-span-8 glass-card p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white flex items-center gap-2">
              <Layers size={14} className="text-brand-teal" />
              <span>Greater Chennai Ward Density & Truck Network</span>
            </span>
            <span className="text-brand-green font-semibold">Active LoRa Telemetry</span>
          </div>

          <div className="h-[480px] rounded-xl overflow-hidden border border-white/10">
            <LiveMap
              bins={bins}
              trucks={trucks}
              height="100%"
              center={[13.0418, 80.2341]}
              zoom={12}
            />
          </div>
        </div>

        {/* Live Municipal Alerts Feed */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-sm">Emergency Alerts Feed</h3>
              <span className="text-xs font-mono text-red-400">{alerts.length} Active</span>
            </div>

            <div className="space-y-2.5">
              {alerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-200 leading-snug">{alt.text}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-[10px]">
                    <span className="text-text-muted">{alt.time}</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          setDispatchModalOpen(true);
                          handleDismissAlert(alt.id);
                        }}
                        className="px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal font-semibold hover:bg-brand-teal/30"
                      >
                        Assign Truck
                      </button>
                      <button
                        onClick={() => handleDismissAlert(alt.id)}
                        className="text-text-muted hover:text-white"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stream Breakdown Donut */}
          <div className="glass-card p-5 flex flex-col justify-between">
            <h3 className="font-heading font-bold text-white text-sm mb-2">City Waste Distribution</h3>
            <WastePieChart height={200} showCenterTotal={true} />
          </div>
        </div>
      </div>

      {/* Ward Area Summary Table */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-heading font-bold text-white text-base">
          Ward Performance Summary (Chennai Zones)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-text-muted uppercase">
              <tr>
                <th className="pb-3">Ward Name</th>
                <th className="pb-3">Smart Bins</th>
                <th className="pb-3">Avg Fill Level</th>
                <th className="pb-3">Pickups Today</th>
                <th className="pb-3">Recycling Rate</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {areaSummary.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-bold text-white">{row.area}</td>
                  <td className="py-3 text-text-muted">{row.bins} units</td>
                  <td className="py-3 text-slate-300 font-bold">{row.avgFill}%</td>
                  <td className="py-3 text-text-muted">{row.pickupsToday} completed</td>
                  <td className="py-3 text-brand-green font-bold">{row.recycling}%</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full border border-white/20 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base">Generate Municipal ESG Report</h3>
              <button onClick={() => setReportModalOpen(false)} className="text-text-muted hover:text-white">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-text-muted leading-relaxed font-mono">
              Export verified IoT sensor data, landfill diversion rates, and SHA-256 blockchain transaction blocks for Greater Chennai Corporation audit.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  handleDownloadCsv();
                  setReportModalOpen(false);
                }}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white font-mono"
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet size={16} className="text-brand-green" />
                  <span>Download Telemetry Data (CSV)</span>
                </span>
                <Download size={14} />
              </button>

              <button
                onClick={() => {
                  alert('PDF Report compiled: MyCop_GCC_Audit_Summary_Q4.pdf');
                  setReportModalOpen(false);
                }}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white font-mono"
              >
                <span className="flex items-center gap-2">
                  <FileText size={16} className="text-sky-400" />
                  <span>Download Audit Certificate (PDF)</span>
                </span>
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispatch Truck Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleDispatchTruckSubmit}
            className="glass-card p-6 max-w-md w-full border border-white/20 space-y-4 font-mono text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base font-sans">
                Emergency Manual Truck Dispatch
              </h3>
              <button type="button" onClick={() => setDispatchModalOpen(false)} className="text-text-muted hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="text-text-muted block mb-1">Target Smart Bin</label>
              <select
                value={selectedDispatchBinId}
                onChange={(e) => setSelectedDispatchBinId(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
              >
                {bins.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} · {b.location.label} ({b.fillPercent}% full)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-text-muted block mb-1">Assign Truck Unit</label>
              <select
                value={selectedDispatchTruckId}
                onChange={(e) => setSelectedDispatchTruckId(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-white"
              >
                {trucks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.id} · {t.driverName} ({t.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setDispatchModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm Emergency Dispatch
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
