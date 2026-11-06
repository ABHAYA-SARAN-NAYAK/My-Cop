import { useSimStore } from '../store/useSimStore';
import { useBinsStore } from '../store/useBinsStore';
import { usePickupsStore } from '../store/usePickupsStore';
import { useFleetStore } from '../store/useFleetStore';
import { advancePickupStep, triggerBinFillAlert } from '../store/actions';

let simInterval: any = null;

export function startSimulationEngine() {
  if (simInterval) clearInterval(simInterval);

  const getIntervalMs = () => {
    const speed = useSimStore.getState().speed;
    return Math.max(600, 3000 / speed);
  };

  const tick = async () => {
    const { isRunning, incTick } = useSimStore.getState();
    if (!isRunning) return;

    incTick();

    const bins = useBinsStore.getState().bins;
    const pickups = usePickupsStore.getState().pickups;
    const trucks = useFleetStore.getState().trucks;

    // 1. Slowly increment bin fill levels
    const randomBinIndex = Math.floor(Math.random() * bins.length);
    const targetBin = bins[randomBinIndex];
    if (targetBin && targetBin.status !== 'full') {
      const increment = Math.round((Math.random() * 2.5 + 0.5) * 10) / 10;
      const newFill = Math.min(100, Math.round(targetBin.fillPercent + increment));
      useBinsStore.getState().setFill(targetBin.id, newFill);

      // Auto alert if crosses 88%
      if (newFill >= 88 && targetBin.fillPercent < 88) {
        triggerBinFillAlert(targetBin.id);
      }
    }

    // 2. Advance active pickups gradually
    const activePickups = pickups.filter(
      (p) => p.status !== 'Delivered'
    );
    if (activePickups.length > 0) {
      // Pick one active pickup to nudge forward every few ticks
      const candidate = activePickups[Math.floor(Math.random() * activePickups.length)];
      if (Math.random() > 0.45) {
        await advancePickupStep(candidate.id);
      }
    }

    // 3. Move trucks slightly for map animation realism
    trucks.forEach((truck) => {
      if (truck.status === 'EnRoute' || truck.status === 'Collecting') {
        const deltaLat = (Math.random() - 0.5) * 0.0015;
        const deltaLng = (Math.random() - 0.5) * 0.0015;
        useFleetStore.getState().setTruckLocation(
          truck.id,
          truck.location.lat + deltaLat,
          truck.location.lng + deltaLng
        );
      }
    });
  };

  simInterval = setInterval(tick, 3000);

  // Subscribe to speed changes to dynamically reset interval
  useSimStore.subscribe((state, prevState) => {
    if (state.speed !== prevState.speed) {
      clearInterval(simInterval);
      simInterval = setInterval(tick, getIntervalMs());
    }
  });
}

export function stopSimulationEngine() {
  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
  }
}
