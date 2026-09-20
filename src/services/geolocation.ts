import { Station } from '../types/metro';

export interface LiveGpsPosition {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  speedKmH?: number;
  heading?: number;
  timestamp: number;
  isSimulated?: boolean;
}

export interface NearestStationResult {
  station: Station;
  distanceMeters: number;
  distanceKm: number;
  walkingMinutes: number;
  walkingSpeedKmh: number;
  compassDirection: string;
  compassDegrees: number;
  googleMapsWalkingUrl: string;
  calculationExplanation: string;
}

// Haversine Geodesic Distance Formula (Earth radius ~ 6,371 km)
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

// Calculate Compass Bearing from user GPS coordinates to station
export function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): { degrees: number; label: string } {
  const y = Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos((lon2 - lon1) * Math.PI / 180);
  const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  
  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.round(brng / 45) % 8;
  return { degrees: Math.round(brng), label: directions[index] };
}

// Generate direct turnkey Google Maps walking navigation link
export function getWalkingDirectionsUrl(userLat: number, userLng: number, destLat: number, destLng: number): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${userLat.toFixed(6)},${userLng.toFixed(6)}&destination=${destLat.toFixed(6)},${destLng.toFixed(6)}&travelmode=walking`;
}

// Find nearest station with grounded transit physics & walk speed formula
export function findNearestStation(
  userLat: number,
  userLng: number,
  stations: Station[]
): NearestStationResult | null {
  if (!stations.length) return null;

  let minDistanceKm = Infinity;
  let nearestStation: Station = stations[0];

  for (const st of stations) {
    const dist = calculateDistanceKm(userLat, userLng, st.latitude, st.longitude);
    if (dist < minDistanceKm) {
      minDistanceKm = dist;
      nearestStation = st;
    }
  }

  const distanceMeters = Math.round(minDistanceKm * 1000);
  
  // Transit Industry Benchmark:
  // - Human average pedestrian speed = 4.8 km/h = 80 meters/minute (1.33 m/s)
  // - Urban street grid winding factor = 1.2x straight-line distance
  const streetWalkMeters = distanceMeters * 1.2;
  const walkingMinutes = Math.max(1, Math.round(streetWalkMeters / 80));
  
  const bearing = calculateBearing(userLat, userLng, nearestStation.latitude, nearestStation.longitude);
  const mapsUrl = getWalkingDirectionsUrl(userLat, userLng, nearestStation.latitude, nearestStation.longitude);

  const calculationExplanation = `Walk duration is calculated using the official urban transit pedestrian standard (4.8 km/h = 80 meters/min) with a 1.2x urban street grid factor applied to Haversine geodesic distance (${distanceMeters}m straight-line → ~${Math.round(streetWalkMeters)}m street walk).`;

  return {
    station: nearestStation,
    distanceMeters,
    distanceKm: Number(minDistanceKm.toFixed(2)),
    walkingMinutes,
    walkingSpeedKmh: 4.8,
    compassDirection: bearing.label,
    compassDegrees: bearing.degrees,
    googleMapsWalkingUrl: mapsUrl,
    calculationExplanation
  };
}

// Acquire current high-precision device GPS fix
export function getCurrentCoordinates(): Promise<LiveGpsPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracyMeters: Math.round(pos.coords.accuracy || 10),
          speedKmH: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : undefined,
          heading: pos.coords.heading || undefined,
          timestamp: pos.timestamp,
          isSimulated: false
        });
      },
      (err) => {
        reject(err);
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 5000 }
    );
  });
}

// Continuous real-time GPS tracking watcher (for live journey on the train)
export function watchLivePosition(
  onUpdate: (pos: LiveGpsPosition) => void,
  onError?: (err: GeolocationPositionError) => void
): number | null {
  if (!('geolocation' in navigator)) return null;

  return navigator.geolocation.watchPosition(
    (pos) => {
      onUpdate({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracyMeters: Math.round(pos.coords.accuracy || 10),
        speedKmH: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : undefined,
        heading: pos.coords.heading || undefined,
        timestamp: pos.timestamp,
        isSimulated: false
      });
    },
    (err) => {
      if (onError) onError(err);
    },
    { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
  );
}

// Stop continuous live GPS watcher
export function clearLivePositionWatcher(watchId: number | null) {
  if (watchId !== null && 'geolocation' in navigator) {
    navigator.geolocation.clearWatch(watchId);
  }
}
