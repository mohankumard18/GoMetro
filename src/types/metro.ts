export interface City {
  city_id: string;
  city_name: string;
  state: string;
  country: string;
  timezone: string;
  center_lat: number;
  center_lng: number;
  metro_name: string;
  tagline: string;
}

export interface MetroLine {
  line_id: string;
  metro_id: string;
  line_name: string;
  line_color: string;
  line_code: string;
  stations: string[]; // Ordered station IDs
}

export interface StationFacility {
  type: 'elevator' | 'escalator' | 'parking' | 'washroom' | 'atm' | 'feeder_bus' | 'drinking_water' | 'wheelchair';
  available: boolean;
  notes?: string;
}

export interface Station {
  station_id: string;
  metro_id: string;
  station_name: string;
  latitude: number;
  longitude: number;
  lines: string[]; // line_ids
  interchange: boolean;
  facilities: StationFacility[];
  landmarks?: string[];
  first_train?: string;
  last_train?: string;
}

export interface Connection {
  connection_id: string;
  station_from: string;
  station_to: string;
  line_id: string;
  travel_time_minutes: number;
  distance_km: number;
}

export interface Interchange {
  station_id: string;
  line_from: string;
  line_to: string;
  transfer_time_minutes: number;
  transfer_instructions: string;
}

export interface TicketProvider {
  provider_id: string;
  metro_id: string;
  provider_name: string;
  provider_type: 'official_portal' | 'whatsapp' | 'upi_app' | 'counter';
  booking_url: string;
  badge: string;
  is_official: boolean;
  description: string;
}

export interface RouteSegment {
  type: 'walk_origin' | 'metro' | 'transfer' | 'walk_destination';
  from_station?: Station;
  to_station?: Station;
  line?: MetroLine;
  stops_count?: number;
  stations_in_segment?: Station[];
  duration_minutes: number;
  instructions: string;
  target_direction?: string; // e.g., "Towards Raidurg"
  distance_meters?: number;
  walking_speed_kmh?: number;
  google_maps_url?: string;
  user_gps_coords?: { latitude: number; longitude: number; accuracy?: number };
}

export interface RoutePlan {
  origin_station: Station;
  destination_station: Station;
  walking_to_origin_minutes: number;
  walking_from_dest_minutes: number;
  total_duration_minutes: number;
  total_metro_stops: number;
  transfers_count: number;
  fare_inr: number;
  segments: RouteSegment[];
  all_stations_in_order: Station[];
  summary: string;
}

export type JourneyStatus = 
  | 'PLANNED'
  | 'BOARDING'
  | 'IN_TRANSIT'
  | 'APPROACHING_TRANSFER'
  | 'TRANSFER_PENDING'
  | 'APPROACHING_DESTINATION'
  | 'ARRIVED';

export interface JourneyAlert {
  id: string;
  type: 'prep' | 'two_stops' | 'next_stop' | 'arrival' | 'transfer';
  title: string;
  message: string;
  remaining_stops: number;
  station_name: string;
  timestamp: string;
  is_signature?: boolean; // Highlights the 2-station signature alert
}

export interface ActiveJourney {
  journey_id: string;
  city_id: string;
  route: RoutePlan;
  current_station_index: number;
  status: JourneyStatus;
  started_at: string;
  alert_history: JourneyAlert[];
  last_alert?: JourneyAlert;
}
