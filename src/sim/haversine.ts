import { Truck } from '../types';

/**
 * Calculates great-circle distance between two points on the Earth's surface (in kilometers)
 * using the Haversine formula.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Round to 2 decimal places
  return Math.round(distance * 100) / 100;
}

export interface TruckDistanceEvaluation {
  truck: Truck;
  distanceKm: number;
  availableCapacityKg: number;
  isEligible: boolean;
  scoreReason: string;
}

/**
 * Evaluates all trucks relative to target coordinates.
 * Returns sorted evaluations from nearest eligible to farthest.
 */
export function evaluateNearestTrucks(
  trucks: Truck[],
  targetLat: number,
  targetLng: number,
  requiredCapacityKg: number = 20
): {
  evaluations: TruckDistanceEvaluation[];
  bestTruck: Truck | null;
  bestDistanceKm: number;
} {
  const evaluations: TruckDistanceEvaluation[] = trucks.map(truck => {
    const dist = calculateHaversineDistance(
      truck.location.lat,
      truck.location.lng,
      targetLat,
      targetLng
    );
    const available = truck.capacityKg - truck.loadKg;
    const hasCapacity = available >= requiredCapacityKg;
    const isAvailableStatus = truck.status === 'Idle' || truck.status === 'Collecting';
    const isEligible = hasCapacity && isAvailableStatus;

    let scoreReason = '';
    if (!isAvailableStatus) {
      scoreReason = `Truck is currently ${truck.status}`;
    } else if (!hasCapacity) {
      scoreReason = `Insufficient capacity (${available}kg free < ${requiredCapacityKg}kg needed)`;
    } else {
      scoreReason = `Nearest available unit with ${available}kg free`;
    }

    return {
      truck,
      distanceKm: dist,
      availableCapacityKg: available,
      isEligible,
      scoreReason,
    };
  });

  // Sort by eligible first, then by distance ascending
  evaluations.sort((a, b) => {
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return a.distanceKm - b.distanceKm;
  });

  const best = evaluations.find(e => e.isEligible) || null;

  return {
    evaluations,
    bestTruck: best ? best.truck : null,
    bestDistanceKm: best ? best.distanceKm : 0,
  };
}
