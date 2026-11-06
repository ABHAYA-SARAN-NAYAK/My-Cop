import { usePickupsStore } from './usePickupsStore';
import { useBinsStore } from './useBinsStore';
import { useFleetStore } from './useFleetStore';
import { useLedgerStore } from './useLedgerStore';
import { useMarketStore } from './useMarketStore';
import { useRewardsStore } from './useRewardsStore';
import { useNotifStore } from './useNotifStore';
import { useSimStore } from './useSimStore';
import { evaluateNearestTrucks } from '../sim/haversine';
import { WasteCategory, Pickup, Listing } from '../types';

/**
 * Creates a disposal pickup, calculates the nearest truck using real Haversine distance,
 * links the truck, logs on the ledger, awards points, and notifies the user.
 */
export async function createDisposalAndPickup(
  wasteType: WasteCategory,
  weightKg: number,
  address: string = 'Panagal Park North, T. Nagar',
  userNote?: string,
  targetLat: number = 13.0418,
  targetLng: number = 80.2341
): Promise<Pickup> {
  const trucks = useFleetStore.getState().trucks;
  const evaluation = evaluateNearestTrucks(trucks, targetLat, targetLng, weightKg);
  const assignedTruck = evaluation.bestTruck || trucks[0];
  const etaMinutes = Math.max(3, Math.round(evaluation.bestDistanceKm * 3 + 2));

  const pickupId = `PKP-${Date.now().toString().slice(-4)}`;
  const binId = 'BIN-TN-01';

  const newPickup: Pickup = {
    id: pickupId,
    binId,
    wasteType,
    status: 'Assigned',
    truckId: assignedTruck.id,
    etaMinutes,
    createdAt: 'Just now',
    address,
    weightKg,
    userNote,
    timeline: [
      { step: 'Requested', time: 'Just now', done: true },
      { step: 'Assigned', time: 'Just now', done: true, active: true },
      { step: 'On The Way', time: 'Pending', done: false },
      { step: 'Picked Up', time: 'Pending', done: false },
      { step: 'Sorting', time: 'Pending', done: false },
      { step: 'Delivered', time: 'Pending', done: false },
    ],
  };

  usePickupsStore.getState().addPickup(newPickup);

  // Update truck status
  useFleetStore.getState().updateTruck(assignedTruck.id, {
    status: 'Collecting',
    assignedPickupId: pickupId,
    loadKg: Math.min(assignedTruck.capacityKg, assignedTruck.loadKg + weightKg),
  });

  // Award on-time disposal points
  useRewardsStore.getState().addPoints(25, `Waste Disposal Logged (${weightKg} kg ${wasteType})`);

  // Add blockchain ledger record
  const batchId = `BATCH-${new Date().getFullYear()}-${wasteType.charAt(0).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`;
  await useLedgerStore.getState().addBlock(
    batchId,
    'Collected',
    `Pickup ${pickupId} at ${address}. Weight: ${weightKg}kg. Driver: ${assignedTruck.driverName} (${assignedTruck.id}). Distance: ${evaluation.bestDistanceKm}km.`
  );

  // Notify and ticker
  useNotifStore.getState().addNotif({
    type: 'pickup',
    title: `Pickup ${pickupId} Assigned`,
    body: `Truck ${assignedTruck.id} (${assignedTruck.driverName}) assigned (${evaluation.bestDistanceKm} km away). ETA ${etaMinutes} mins.`,
  });

  useSimStore.getState().addTickerItem(
    `🚚 Truck ${assignedTruck.id} dispatched to ${address} · Haversine ${evaluation.bestDistanceKm} km`
  );

  return newPickup;
}

/**
 * Moves a pickup to its next lifecycle status.
 * Handles downstream sorting, marketplace listing creation, and reward payout.
 */
export async function advancePickupStep(pickupId: string): Promise<void> {
  const pickups = usePickupsStore.getState().pickups;
  const pickup = pickups.find((p) => p.id === pickupId);
  if (!pickup) return;

  const steps: Pickup['status'][] = ['Requested', 'Assigned', 'OnTheWay', 'PickedUp', 'Sorting', 'Delivered'];
  const currentIndex = steps.indexOf(pickup.status);
  if (currentIndex === -1 || currentIndex >= steps.length - 1) return;

  const nextStatus = steps[currentIndex + 1];
  const remainingEta = Math.max(0, (pickup.etaMinutes || 5) - 3);

  usePickupsStore.getState().updatePickupStatus(pickupId, nextStatus, remainingEta);

  // Status-specific side effects
  if (nextStatus === 'PickedUp') {
    useBinsStore.getState().emptyBin(pickup.binId);
    useNotifStore.getState().addNotif({
      type: 'pickup',
      title: `Waste Picked Up (${pickup.id})`,
      body: `${pickup.weightKg} kg of ${pickup.wasteType} loaded onto Truck ${pickup.truckId}.`,
    });
    useSimStore.getState().addTickerItem(`📦 ${pickup.id} collected · En route to Sorting Center`);
  } else if (nextStatus === 'Sorting') {
    useNotifStore.getState().addNotif({
      type: 'system',
      title: `Batch Under AI Segregation`,
      body: `Batch from ${pickup.address} is being scanned by camera + robotic sorter.`,
    });
    useSimStore.getState().addTickerItem(`🔬 AI Segregation in progress for ${pickup.wasteType} batch`);
  } else if (nextStatus === 'Delivered') {
    const batchId = `BATCH-2026-${pickup.wasteType.charAt(0).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`;
    
    // Add ledger block
    await useLedgerStore.getState().addBlock(
      batchId,
      'Segregated',
      `Facility: Guindy AI Hub. Sorted 98.4% purity. Weight: ${pickup.weightKg} kg.`
    );

    // Create a new marketplace listing
    const priceMap: Record<WasteCategory, number> = {
      plastic: 38,
      metal: 115,
      glass: 14,
      organic: 6.5,
      landfill: 2,
      ewaste: 350,
    };

    const newListing: Listing = {
      id: `LST-${Date.now().toString().slice(-3)}`,
      batchId,
      title: `Sorted ${pickup.wasteType.toUpperCase()} Batch – ${pickup.weightKg} kg`,
      category: pickup.wasteType,
      weightKg: pickup.weightKg,
      pricePerKg: priceMap[pickup.wasteType] || 25,
      purity: 98.4,
      location: 'Guindy Sorting Hub, Chennai',
      distanceKm: 2.8,
      seller: 'MyCop Automated Facility',
      verified: true,
      bids: [],
      createdAt: 'Just now',
    };

    useMarketStore.getState().addListing(newListing);

    // Add listing block
    await useLedgerStore.getState().addBlock(
      batchId,
      'Listed',
      `Listing #${newListing.id} published on Digital Waste Exchange at ₹${newListing.pricePerKg}/kg.`
    );

    // Award bonus points to generator
    useRewardsStore.getState().addPoints(50, `Segregation Bonus: 98.4% Purity (${pickup.wasteType})`);

    // Reset truck
    if (pickup.truckId) {
      useFleetStore.getState().updateTruck(pickup.truckId, {
        status: 'Idle',
        assignedPickupId: undefined,
        loadKg: 50,
      });
    }

    useNotifStore.getState().addNotif({
      type: 'reward',
      title: 'Batch Recycled & Listed! 🎉',
      body: `Your ${pickup.weightKg}kg ${pickup.wasteType} was sorted with 98.4% purity. +50 bonus points awarded!`,
    });

    useSimStore.getState().addTickerItem(
      `✨ Batch ${batchId} listed on Marketplace · +50 points credited`
    );
  }
}

/**
 * Executes a purchase on the waste marketplace.
 */
export async function executeMarketPurchase(listingId: string, buyerName: string) {
  const market = useMarketStore.getState();
  const listing = market.listings.find((l) => l.id === listingId);
  if (!listing) return null;

  const tx = market.buyListing(listingId, buyerName);

  // Add ledger block
  await useLedgerStore.getState().addBlock(
    listing.batchId,
    'Sold',
    `Sold to ${buyerName}. Value: ₹${tx.amount.toLocaleString('en-IN')}. Transaction ID: ${tx.id}. Zero-landfill contract signed.`
  );

  useNotifStore.getState().addNotif({
    type: 'market',
    title: 'Marketplace Purchase Confirmed',
    body: `${listing.title} purchased by ${buyerName} for ₹${tx.amount.toLocaleString('en-IN')}.`,
  });

  useSimStore.getState().addTickerItem(
    `🤝 Recycler Match: ${buyerName} purchased ${listing.weightKg}kg ${listing.category} (₹${tx.amount.toLocaleString('en-IN')})`
  );

  return tx;
}

/**
 * Triggers a 92% bin fill alert and auto-dispatches nearest truck.
 */
export async function triggerBinFillAlert(binId: string) {
  const binsStore = useBinsStore.getState();
  const bin = binsStore.bins.find((b) => b.id === binId);
  if (!bin) return;

  binsStore.setFill(binId, 92);

  useNotifStore.getState().addNotif({
    type: 'alert',
    title: `Smart Bin ${bin.id} is 92% Full`,
    body: `Ultrasonic sensor at ${bin.location.label} detected high capacity. Initiating auto-dispatch.`,
  });

  await createDisposalAndPickup(
    bin.type,
    38,
    bin.location.label,
    'Automated IoT Fill Threshold Trigger (>85%)',
    bin.location.lat,
    bin.location.lng
  );
}

/**
 * Resets all stores to initial seed state.
 */
export async function resetAllDemoData() {
  useBinsStore.getState().resetBins();
  useFleetStore.getState().resetFleet();
  usePickupsStore.getState().resetPickups();
  useMarketStore.getState().resetMarket();
  useRewardsStore.getState().resetRewards();
  useNotifStore.getState().resetNotifs();
  await useLedgerStore.getState().resetLedger();
}
