import { Block } from '../types';
import { calculateBlockHash } from '../sim/hash';

export const INITIAL_BLOCK_DATA = [
  { batchId: 'BATCH-2026-P01', event: 'Collected', data: 'Origin: T. Nagar Panagal Park. Weight: 84.5kg. Sensor Verified.' },
  { batchId: 'BATCH-2026-P01', event: 'Segregated', data: 'Facility: Guindy AI Hub. Purity: 97.8% PET. Contamination: 2.2%.' },
  { batchId: 'BATCH-2026-P01', event: 'Listed', data: 'Listed on Marketplace at ₹36/kg. Batch Cert #MC-9901.' },
  { batchId: 'BATCH-2026-P01', event: 'Sold', data: 'Buyer: GreenLoop Recyclers. Transaction ID: TX-88102. Value: ₹3,042.' },
  { batchId: 'BATCH-2026-P01', event: 'Recycled', data: 'Pelletized into rPET granules. Verified zero-landfill.' },

  { batchId: 'BATCH-2026-M01', event: 'Collected', data: 'Origin: Velachery Commercial. Weight: 140kg Aluminum.' },
  { batchId: 'BATCH-2026-M01', event: 'Segregated', data: 'Optical sensor sort: 99.2% beverage cans. Zero moisture.' },
  { batchId: 'BATCH-2026-M01', event: 'Listed', data: 'Listed on Marketplace at ₹112/kg. Certified by GCC.' },
  { batchId: 'BATCH-2026-M01', event: 'Sold', data: 'Buyer: MetalForge Chennai. Value: ₹15,680. Transport en route.' },
  { batchId: 'BATCH-2026-M01', event: 'Recycled', data: 'Smelted into recycled secondary ingots. 95% energy saved.' },

  { batchId: 'BATCH-2026-O01', event: 'Collected', data: 'Origin: Anna Nagar Residential. Weight: 420kg Wet waste.' },
  { batchId: 'BATCH-2026-O01', event: 'Segregated', data: 'Bio-gasification compatibility test passed. C/N ratio: 24:1.' },
  { batchId: 'BATCH-2026-O01', event: 'Sold', data: 'Buyer: Tamil Nadu BioAgro. Routed to anaerobic digester.' },
  { batchId: 'BATCH-2026-O01', event: 'Recycled', data: 'Converted to 48m³ Compressed Biogas + 90kg organic fertilizer.' },

  { batchId: 'BATCH-2026-G01', event: 'Collected', data: 'Origin: Adyar Coastal Ward. Weight: 260kg Glass Bottles.' },
  { batchId: 'BATCH-2026-G01', event: 'Segregated', data: 'Color separated: 70% Flint, 20% Amber, 10% Emerald.' },
  { batchId: 'BATCH-2026-G01', event: 'Listed', data: 'Listing #LST-004 created on Digital Waste Exchange.' },
  { batchId: 'BATCH-2026-G01', event: 'Sold', data: 'Buyer: Coromandel Glassworks. Value: ₹3,640.' },
  { batchId: 'BATCH-2026-G01', event: 'Recycled', data: 'Remelted into new pharmaceutical containers.' },

  { batchId: 'BATCH-2026-P02', event: 'Collected', data: 'Origin: Porur Junction Bin #POR-01. Weight: 96kg HDPE.' },
  { batchId: 'BATCH-2026-P02', event: 'Segregated', data: 'Robotic gripper segmented: Shampoo bottles and milk jugs.' },
  { batchId: 'BATCH-2026-P02', event: 'Listed', data: 'Listed as Grade A HDPE Regrind.' },
  { batchId: 'BATCH-2026-P02', event: 'Sold', data: 'Buyer: EcoPlast Industries. Transferred via Truck TRK-05.' },

  { batchId: 'BATCH-2026-E01', event: 'Collected', data: 'Origin: Guindy SIDCO Tech Zone. Weight: 85kg E-waste.' },
  { batchId: 'BATCH-2026-E01', event: 'Segregated', data: 'Handled under Hazardous Substances Protocol C-3.' },
  { batchId: 'BATCH-2026-E01', event: 'Listed', data: 'Listing #LST-006 published for certified dismantlers.' },

  { batchId: 'BATCH-2026-P09', event: 'Collected', data: 'Origin: T. Nagar Panagal Park. Weight: 240kg PET.' },
  { batchId: 'BATCH-2026-P09', event: 'Segregated', data: 'AI Sorter purity confirmed at 97.5%. High quality.' },
  { batchId: 'BATCH-2026-P09', event: 'Listed', data: 'Marketplace Listing #LST-001 active. Bidding open.' },
  { batchId: 'BATCH-2026-O18', event: 'Collected', data: 'Origin: Velachery Smart Sector. Weight: 850kg High-Nitrogen Biomass.' },
];

/**
 * Creates 30 seed blocks chained with real cryptographic SHA-256 hashes.
 */
export async function generateInitialLedgerBlocks(): Promise<Block[]> {
  const blocks: Block[] = [];
  const baseTimestamp = Date.now() - 36 * 3600 * 1000; // 36 hours ago

  for (let i = 0; i < INITIAL_BLOCK_DATA.length; i++) {
    const item = INITIAL_BLOCK_DATA[i];
    const timestamp = baseTimestamp + i * 3600 * 1000;
    const prevHash = i === 0 ? '0'.repeat(64) : blocks[i - 1].hash;
    const hash = await calculateBlockHash(
      i,
      timestamp,
      item.batchId,
      item.event as Block['event'],
      item.data,
      prevHash
    );

    blocks.push({
      index: i,
      timestamp,
      batchId: item.batchId,
      event: item.event as Block['event'],
      data: item.data,
      prevHash,
      hash,
      tampered: false,
    });
  }

  return blocks;
}
