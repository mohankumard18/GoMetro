import { Station } from '../types/metro';

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface NearestStationResult {
  station: Station;
  distanceKm: number;
  walkingMinutes: number;
}

export function findNearestStation(
  userLat: number,
  userLng: number,
  stations: Station[]
): NearestStationResult | null {
  if (!stations.length) return null;

  let minDistance = Infinity;
  let nearestStation: Station = stations[0];

  for (const st of stations) {
    const dist = calculateDistanceKm(userLat, userLng, st.latitude, st.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearestStation = st;
    }
  }

  // Average walking speed ~ 4.8 km/h = 80 meters/min (~ 12.5 min per km)
  const walkingMinutes = Math.max(2, Math.round(minDistance * 12.5));

  return {
    station: nearestStation,
    distanceKm: Number(minDistance.toFixed(2)),
    walkingMinutes
  };
}

export function getCurrentCoordinates(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (err) => {
        reject(err);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
