import React, { useState, useEffect } from 'react';
import { useLedgerStore } from '../../store/useLedgerStore';
import { Block } from '../../types';
import { truncateHash } from '../../lib/format';
import { SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Search,
  Plus,
  Download,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';

export const LedgerPage: React.FC = () => {
  const {
    blocks,
    isValid,
    tamperedIndex,
    isVerifying,
    verifyChain,
    tamperBlock,
    repairChain,
    addBlock,
    initLedger,
  } = useLedgerStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newBatchId, setNewBatchId] = useState('BATCH-2026-P99');
  const [newEvent, setNewEvent] = useState<Block['event']>('Collected');
  const [newData, setNewData] = useState('Origin: Guindy Hub. Verified weight: 120kg. Purity: 99.1%.');
  const [verificationPassed, setVerificationPassed] = useState<boolean | null>(null);

  useEffect(() => {
    initLedger();
  }, [initLedger]);

  const handleVerify = async () => {
    const valid = await verifyChain();
    setVerificationPassed(valid);
    setTimeout(() => setVerificationPassed(null), 4000);
  };

  const handleTamperDemo = () => {
    const targetIdx = 2; // Tamper with block #2
    tamperBlock(targetIdx, 'MALICIOUS_TAMPER_RECORD_MODIFIED_ORIGIN_DATA');
  };

  const handleAddBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBlock(newBatchId, newEvent, newData);
    setAddModalOpen(false);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blocks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mycop-ledger-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredBlocks = blocks.filter(
    (b) =>
      b.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Blockchain Waste Ledger
            </h1>
            <SimulatedBadge />
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isValid
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse'
              }`}
            >
              {isValid ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
              <span>{isValid ? 'Chain Valid & Cryptographically Intact' : 'TAMPERING DETECTED!'}</span>
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Real browser SHA-256 hashing via <code className="text-brand-green font-mono">crypto.subtle</code> for immutable waste traceability.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={isValid ? 'primary' : 'danger'}
            size="sm"
            onClick={handleVerify}
            isLoading={isVerifying}
            leftIcon={<ShieldCheck size={14} />}
          >
            Verify Chain
          </Button>

          {isValid ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleTamperDemo}
              leftIcon={<AlertTriangle size={14} className="text-amber-400" />}
              className="text-amber-300 border-amber-500/30 hover:bg-amber-500/10"
              title="Simulates an attacker silently editing block data to test cryptographic integrity"
            >
              Tamper Block #2
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={repairChain}
              leftIcon={<RotateCcw size={14} />}
              className="bg-brand-green text-deep"
            >
              Repair Chain Hashes
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAddModalOpen(true)}
            leftIcon={<Plus size={14} />}
          >
            Add Block
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportJson}
            leftIcon={<Download size={14} />}
            title="Export Ledger JSON"
          >
            Export JSON
          </Button>
        </div>
      </div>

      {/* Verification Flash Toast */}
      {verificationPassed !== null && (
        <div
          className={`glass-card p-3.5 border text-xs font-mono flex items-center justify-between ${
            verificationPassed
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {verificationPassed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            <span>
              {verificationPassed
                ? 'All block hashes re-computed and verified against cryptographic parent nodes. Zero anomalies.'
                : `Cryptographic mismatch found at block #${tamperedIndex}. Data has been modified without authority.`}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase">
            {verificationPassed ? '100% Cryptographic Match' : 'Tamper Alert'}
          </span>
        </div>
      )}

      {/* Top Ledger Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <span className="text-[10px] font-mono uppercase text-text-muted">Total Blocks</span>
          <p className="text-2xl font-heading font-extrabold text-white mt-1">{blocks.length}</p>
          <p className="text-[10px] text-text-muted font-mono mt-1">Genesis to Head</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-[10px] font-mono uppercase text-text-muted">Batches Tracked</span>
          <p className="text-2xl font-heading font-extrabold text-brand-green mt-1">
            {new Set(blocks.map((b) => b.batchId)).size}
          </p>
          <p className="text-[10px] text-text-muted font-mono mt-1">Unique Materials</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-[10px] font-mono uppercase text-text-muted">Hash Algorithm</span>
          <p className="text-2xl font-heading font-extrabold text-sky-400 mt-1">SHA-256</p>
          <p className="text-[10px] text-text-muted font-mono mt-1">crypto.subtle Native</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-[10px] font-mono uppercase text-text-muted">Integrity State</span>
          <p
            className={`text-2xl font-heading font-extrabold mt-1 ${
              isValid ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {isValid ? 'Valid' : 'Compromised'}
          </p>
          <p className="text-[10px] text-text-muted font-mono mt-1">
            {isValid ? 'All 30 Nodes Chained' : `Broken at #${tamperedIndex}`}
          </p>
        </div>
      </div>

      {/* Educational Banner ("Why blockchain here?") */}
      <div className="glass-card p-4 border-brand-teal/20 bg-brand-teal/[0.03] flex items-start gap-3 text-xs">
        <Info size={18} className="text-brand-teal flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Why blockchain in waste management? </strong>
          <span className="text-text-muted">
            Recyclers, buyers and municipal auditors require uncompromised proof of waste origin, purity, and carbon offsets. Because each block’s hash embeds its predecessor's hash, any retroactive modification immediately invalidates the subsequent chain.
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-3 flex items-center gap-2">
        <Search size={14} className="text-text-muted ml-2" />
        <input
          type="text"
          placeholder="Search ledger by Batch ID (e.g. BATCH-2026-P01), Event, or SHA-256 hash..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none text-xs text-white placeholder-text-muted focus:outline-none font-mono"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-text-muted hover:text-white mr-2">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Horizontal Scrolling Blockchain Visualizer */}
      <div className="glass-card p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-text-muted uppercase">Horizontal Visual Chain</span>
          <span className="text-[11px] text-brand-green">← Scroll horizontally →</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2">
          {filteredBlocks.map((block, i) => {
            const isBroken = !isValid && tamperedIndex !== null && block.index >= tamperedIndex;
            const isTargetTampered = block.tampered;

            return (
              <React.Fragment key={block.index}>
                {/* Block Card */}
                <div
                  onClick={() => setSelectedBlock(block)}
                  className={`flex-shrink-0 w-64 p-4 rounded-2xl border cursor-pointer transition-all duration-200 select-none ${
                    isTargetTampered
                      ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                      : isBroken
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-surface/80 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                    <span className="font-mono font-bold text-white">Block #{block.index}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isBroken
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-brand-green/10 text-brand-green'
                      }`}
                    >
                      {block.event}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-[11px] font-mono">
                    <p className="text-slate-300 font-semibold truncate">{block.batchId}</p>
                    <p className="text-text-muted truncate text-[10px]">{block.data}</p>
                    <div className="pt-2 text-[9px] text-text-muted space-y-0.5">
                      <p className="truncate">
                        <strong className="text-slate-400">Prev:</strong> {truncateHash(block.prevHash, 6, 4)}
                      </p>
                      <p className={`truncate ${isBroken ? 'text-red-400 font-bold' : 'text-brand-teal'}`}>
                        <strong>Hash:</strong> {truncateHash(block.hash, 6, 4)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Link between blocks */}
                {i < filteredBlocks.length - 1 && (
                  <div className="flex-shrink-0 flex items-center justify-center text-text-muted">
                    <ArrowRight
                      size={16}
                      className={isBroken ? 'text-red-500' : 'text-brand-green'}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Block Detail Drawer */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-[#0F1626] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 font-mono">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-bold text-white text-base">
                    Block #{selectedBlock.index} Inspector
                  </h3>
                  <span className="text-xs text-brand-green">{selectedBlock.event} Event</span>
                </div>
                <button
                  onClick={() => setSelectedBlock(null)}
                  className="p-1 rounded-lg text-text-muted hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="my-6 space-y-4 text-xs">
                <div>
                  <span className="text-text-muted uppercase text-[10px]">Batch Identifier</span>
                  <p className="font-bold text-white mt-0.5">{selectedBlock.batchId}</p>
                </div>

                <div>
                  <span className="text-text-muted uppercase text-[10px]">Payload Data</span>
                  <p className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-slate-200 mt-1 leading-relaxed">
                    {selectedBlock.data}
                  </p>
                </div>

                <div>
                  <span className="text-text-muted uppercase text-[10px]">Timestamp</span>
                  <p className="text-slate-300 mt-0.5">
                    {new Date(selectedBlock.timestamp).toLocaleString()}
                  </p>
                </div>

                <div>
                  <span className="text-text-muted uppercase text-[10px]">Previous Hash (SHA-256)</span>
                  <p className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-text-muted break-all mt-1 text-[11px]">
                    {selectedBlock.prevHash}
                  </p>
                </div>

                <div>
                  <span className="text-text-muted uppercase text-[10px]">Current Block Hash (SHA-256)</span>
                  <p className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-brand-green break-all mt-1 text-[11px] font-bold">
                    {selectedBlock.hash}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={() => setSelectedBlock(null)}
            >
              Close Inspector
            </Button>
          </div>
        </div>
      )}

      {/* Add Block Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddBlockSubmit}
            className="glass-card p-6 max-w-md w-full border border-white/20 space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base">Append Ledger Block</h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-text-muted hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-text-muted block mb-1">Batch ID</label>
              <input
                type="text"
                value={newBatchId}
                onChange={(e) => setNewBatchId(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-text-muted block mb-1">Lifecycle Event</label>
              <select
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value as any)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-xs text-white"
              >
                {(['Collected', 'Segregated', 'Listed', 'Sold', 'Recycled'] as Block['event'][]).map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-text-muted block mb-1">Data Payload</label>
              <textarea
                rows={3}
                value={newData}
                onChange={(e) => setNewData(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Compute Hash & Append
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
