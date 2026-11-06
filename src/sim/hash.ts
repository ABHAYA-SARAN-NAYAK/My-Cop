import { Block } from '../types';

/**
 * Computes SHA-256 hash using browser's crypto.subtle API.
 */
export async function calculateBlockHash(
  index: number,
  timestamp: number,
  batchId: string,
  event: string,
  data: string,
  prevHash: string
): Promise<string> {
  const content = `${index}|${timestamp}|${batchId}|${event}|${data}|${prevHash}`;
  const msgBuffer = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verifies validity of an entire blockchain.
 * Returns { valid: boolean, invalidIndex: number | null }
 */
export async function verifyBlockchain(blocks: Block[]): Promise<{ valid: boolean; invalidIndex: number | null }> {
  if (blocks.length === 0) return { valid: true, invalidIndex: null };

  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    
    // Check previous hash link
    if (i > 0) {
      const prev = blocks[i - 1];
      if (current.prevHash !== prev.hash) {
        return { valid: false, invalidIndex: i };
      }
    }

    // Check recalculated hash
    const calculated = await calculateBlockHash(
      current.index,
      current.timestamp,
      current.batchId,
      current.event,
      current.data,
      current.prevHash
    );

    if (calculated !== current.hash) {
      return { valid: false, invalidIndex: i };
    }
  }

  return { valid: true, invalidIndex: null };
}

/**
 * Repairs a tampered blockchain by recalculating all hashes from the broken block forward.
 */
export async function repairBlockchain(blocks: Block[]): Promise<Block[]> {
  const repaired = [...blocks];
  for (let i = 0; i < repaired.length; i++) {
    const prevHash = i === 0 ? '0'.repeat(64) : repaired[i - 1].hash;
    const current = repaired[i];
    const newHash = await calculateBlockHash(
      current.index,
      current.timestamp,
      current.batchId,
      current.event,
      current.data,
      prevHash
    );
    repaired[i] = {
      ...current,
      prevHash,
      hash: newHash,
      tampered: false,
    };
  }
  return repaired;
}
