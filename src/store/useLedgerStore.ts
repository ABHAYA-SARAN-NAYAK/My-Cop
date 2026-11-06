import { create } from 'zustand';
import { Block } from '../types';
import { calculateBlockHash, verifyBlockchain, repairBlockchain } from '../sim/hash';
import { generateInitialLedgerBlocks } from '../data/seedBlocks';

interface LedgerState {
  blocks: Block[];
  isValid: boolean;
  tamperedIndex: number | null;
  isVerifying: boolean;
  initialized: boolean;
  initLedger: () => Promise<void>;
  addBlock: (batchId: string, event: Block['event'], data: string) => Promise<Block>;
  tamperBlock: (index: number, maliciousData: string) => void;
  repairChain: () => Promise<void>;
  verifyChain: () => Promise<boolean>;
  resetLedger: () => Promise<void>;
}

export const useLedgerStore = create<LedgerState>((set, get) => ({
  blocks: [],
  isValid: true,
  tamperedIndex: null,
  isVerifying: false,
  initialized: false,

  initLedger: async () => {
    if (get().initialized && get().blocks.length > 0) return;
    const local = localStorage.getItem('mycop_ledger_blocks');
    if (local) {
      try {
        const parsed: Block[] = JSON.parse(local);
        if (parsed.length > 0) {
          const verification = await verifyBlockchain(parsed);
          set({
            blocks: parsed,
            isValid: verification.valid,
            tamperedIndex: verification.invalidIndex,
            initialized: true,
          });
          return;
        }
      } catch (e) {
        console.error('Failed to parse local blocks', e);
      }
    }

    const initial = await generateInitialLedgerBlocks();
    localStorage.setItem('mycop_ledger_blocks', JSON.stringify(initial));
    set({
      blocks: initial,
      isValid: true,
      tamperedIndex: null,
      initialized: true,
    });
  },

  addBlock: async (batchId: string, event: Block['event'], data: string) => {
    const blocks = get().blocks;
    const index = blocks.length;
    const timestamp = Date.now();
    const prevHash = index === 0 ? '0'.repeat(64) : blocks[index - 1].hash;
    const hash = await calculateBlockHash(index, timestamp, batchId, event, data, prevHash);

    const newBlock: Block = {
      index,
      timestamp,
      batchId,
      event,
      data,
      prevHash,
      hash,
      tampered: false,
    };

    const updated = [...blocks, newBlock];
    localStorage.setItem('mycop_ledger_blocks', JSON.stringify(updated));
    set({ blocks: updated });
    return newBlock;
  },

  tamperBlock: (index: number, maliciousData: string) => {
    const blocks = [...get().blocks];
    if (index < 0 || index >= blocks.length) return;

    blocks[index] = {
      ...blocks[index],
      data: maliciousData,
      tampered: true,
      // The hash remains unchanged from the original content, creating a cryptographic mismatch!
    };

    localStorage.setItem('mycop_ledger_blocks', JSON.stringify(blocks));
    set({
      blocks,
      isValid: false,
      tamperedIndex: index,
    });
  },

  repairChain: async () => {
    set({ isVerifying: true });
    const current = get().blocks;
    const repaired = await repairBlockchain(current);
    localStorage.setItem('mycop_ledger_blocks', JSON.stringify(repaired));
    set({
      blocks: repaired,
      isValid: true,
      tamperedIndex: null,
      isVerifying: false,
    });
  },

  verifyChain: async () => {
    set({ isVerifying: true });
    // Small artificial delay for visual feedback in UI
    await new Promise((r) => setTimeout(r, 400));
    const result = await verifyBlockchain(get().blocks);
    set({
      isValid: result.valid,
      tamperedIndex: result.invalidIndex,
      isVerifying: false,
    });
    return result.valid;
  },

  resetLedger: async () => {
    localStorage.removeItem('mycop_ledger_blocks');
    const initial = await generateInitialLedgerBlocks();
    localStorage.setItem('mycop_ledger_blocks', JSON.stringify(initial));
    set({
      blocks: initial,
      isValid: true,
      tamperedIndex: null,
      initialized: true,
    });
  },
}));
