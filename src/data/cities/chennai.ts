import { City, MetroLine, Station, Interchange, TicketProvider } from '../../types/metro';

export const chennaiCity: City = {
  city_id: 'chennai',
  city_name: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  timezone: 'Asia/Kolkata',
  center_lat: 13.0827,
  center_lng: 80.2707,
  metro_name: 'Chennai Metro Rail (CMRL)',
  tagline: 'Singara Chennai with Swift Underground & Elevated Metro'
};

export const chennaiLines: MetroLine[] = [
  {
    line_id: 'chn_blue',
    metro_id: 'chennai',
    line_name: 'Blue Line (Corridor 1: Wimco Nagar - Airport)',
    line_color: '#0288D1', // Official CMRL Blue
    line_code: 'BLUE',
    stations: [
      'chn_wimco_nagar', 'chn_tollgate', 'chn_washermanpet', 'chn_high_court',
      'chn_central', 'chn_govt_estate', 'chn_lic', 'chn_thousand_lights',
      'chn_ag_dms', 'chn_teynampet', 'chn_nandanam', 'chn_saidapet',
      'chn_guindy', 'chn_alandur', 'chn_meenambakkam', 'chn_airport'
    ]
  },
  {
    line_id: 'chn_green',
    metro_id: 'chennai',
    line_name: 'Green Line (Corridor 2: Central - St. Thomas Mount)',
    line_color: '#2E7D32', // Official CMRL Green
    line_code: 'GREEN',
    stations: [
      'chn_central', 'chn_egmore', 'chn_nehru_park', 'chn_kilpauk',
      'chn_shenoy_nagar', 'chn_anna_nagar_e', 'chn_anna_nagar_tower', 'chn_thirumangalam',
      'chn_koyambedu', 'chn_cmbt', 'chn_vadapalani', 'chn_ashok_nagar',
      'chn_alandur', 'chn_st_thomas_mount'
    ]
  }
];

export const chennaiStations: Station[] = [
  {
    station_id: 'chn_wimco_nagar',
    metro_id: 'chennai',
    station_name: 'Wimco Nagar Depot',
    latitude: 13.1700,
    longitude: 80.3015,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Ennore High Road', 'Wimco Nagar Railway Station']
  },
  {
    station_id: 'chn_tollgate',
    metro_id: 'chennai',
    station_name: 'Tollgate',
    latitude: 13.1380,
    longitude: 80.2980,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Tondiarpet High Road']
  },
  {
    station_id: 'chn_washermanpet',
    metro_id: 'chennai',
    station_name: 'Washermanpet',
    latitude: 13.1110,
    longitude: 80.2855,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Washermanpet Railway Station', 'Sir Theagaraya Road']
  },
  {
    station_id: 'chn_high_court',
    metro_id: 'chennai',
    station_name: 'High Court',
    latitude: 13.0880,
    longitude: 80.2880,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Madras High Court', 'Parrys Corner Bus Stand']
  },
  {
    station_id: 'chn_central',
    metro_id: 'chennai',
    station_name: 'Puratchi Thalaivar Dr. M.G.R Central (Chennai Central)',
    latitude: 13.0818,
    longitude: 80.2755,
    lines: ['chn_blue', 'chn_green'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'feeder_bus', available: true },
      { type: 'atm', available: true },
      { type: 'wheelchair', available: true }
    ],
    landmarks: ['Chennai Central Railway Station', 'Southern Railway HQ', 'Ripon Building', 'Park Station']
  },
  {
    station_id: 'chn_govt_estate',
    metro_id: 'chennai',
    station_name: 'Government Estate',
    latitude: 13.0685,
    longitude: 80.2740,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Omandurar Multi-Speciality Hospital', 'Kalaivanar Arangam']
  },
  {
    station_id: 'chn_lic',
    metro_id: 'chennai',
    station_name: 'LIC',
    latitude: 13.0630,
    longitude: 80.2670,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['LIC Building Anna Salai', 'Spencer Plaza Mall']
  },
  {
    station_id: 'chn_thousand_lights',
    metro_id: 'chennai',
    station_name: 'Thousand Lights',
    latitude: 13.0560,
    longitude: 80.2570,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Thousand Lights Mosque', 'Apollo Hospital Greams Road']
  },
  {
    station_id: 'chn_ag_dms',
    metro_id: 'chennai',
    station_name: 'AG-DMS',
    latitude: 13.0470,
    longitude: 80.2490,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['DMS Complex', 'Semmozhi Poonga Botanical Garden']
  },
  {
    station_id: 'chn_teynampet',
    metro_id: 'chennai',
    station_name: 'Teynampet',
    latitude: 13.0410,
    longitude: 80.2440,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['SIET College', 'Eldams Road Junction']
  },
  {
    station_id: 'chn_nandanam',
    metro_id: 'chennai',
    station_name: 'Nandanam',
    latitude: 13.0320,
    longitude: 80.2385,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['YMCA Grounds Nandanam', 'Anna Salai Junction']
  },
  {
    station_id: 'chn_saidapet',
    metro_id: 'chennai',
    station_name: 'Saidapet',
    latitude: 13.0230,
    longitude: 80.2280,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Saidapet Railway Station', 'Saidapet Court']
  },
  {
    station_id: 'chn_guindy',
    metro_id: 'chennai',
    station_name: 'Guindy',
    latitude: 13.0090,
    longitude: 80.2130,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Guindy Railway Station', 'Guindy National Park', 'Race Course']
  },
  {
    station_id: 'chn_alandur',
    metro_id: 'chennai',
    station_name: 'Arignar Anna Alandur',
    latitude: 13.0035,
    longitude: 80.2015,
    lines: ['chn_blue', 'chn_green'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Kathipara Flyover Cloverleaf', 'St. Thomas Mount approach']
  },
  {
    station_id: 'chn_meenambakkam',
    metro_id: 'chennai',
    station_name: 'Meenambakkam',
    latitude: 12.9870,
    longitude: 80.1760,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Airports Authority of India Quarters']
  },
  {
    station_id: 'chn_airport',
    metro_id: 'chennai',
    station_name: 'Chennai International Airport',
    latitude: 12.9795,
    longitude: 80.1685,
    lines: ['chn_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }, { type: 'washroom', available: true }, { type: 'wheelchair', available: true }],
    landmarks: ['Chennai Airport Domestic (T1/T4) & International (T2) Terminals']
  },

  // Green Line specific
  {
    station_id: 'chn_egmore',
    metro_id: 'chennai',
    station_name: 'Puratchi Thalaivi Dr. J. Jayalalithaa Egmore',
    latitude: 13.0780,
    longitude: 80.2610,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Chennai Egmore Railway Station', 'Government Museum Egmore']
  },
  {
    station_id: 'chn_nehru_park',
    metro_id: 'chennai',
    station_name: 'Nehru Park',
    latitude: 13.0785,
    longitude: 80.2490,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Nehru Park Sports Complex', 'Poonamallee High Road']
  },
  {
    station_id: 'chn_kilpauk',
    metro_id: 'chennai',
    station_name: 'Kilpauk Medical College',
    latitude: 13.0785,
    longitude: 80.2405,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Kilpauk Medical College Hospital']
  },
  {
    station_id: 'chn_shenoy_nagar',
    metro_id: 'chennai',
    station_name: 'Shenoy Nagar',
    latitude: 13.0790,
    longitude: 80.2280,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Thiru Vi Ka Park Shenoy Nagar']
  },
  {
    station_id: 'chn_anna_nagar_e',
    metro_id: 'chennai',
    station_name: 'Anna Nagar East',
    latitude: 13.0850,
    longitude: 80.2185,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Anna Nagar Roundtana', 'Chintamani Signal']
  },
  {
    station_id: 'chn_anna_nagar_tower',
    metro_id: 'chennai',
    station_name: 'Anna Nagar Tower',
    latitude: 13.0865,
    longitude: 80.2100,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Anna Nagar Tower Park']
  },
  {
    station_id: 'chn_thirumangalam',
    metro_id: 'chennai',
    station_name: 'Thirumangalam',
    latitude: 13.0855,
    longitude: 80.1980,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }],
    landmarks: ['VR Chennai Mall (directly accessible)', 'Thirumangalam Junction']
  },
  {
    station_id: 'chn_koyambedu',
    metro_id: 'chennai',
    station_name: 'Koyambedu',
    latitude: 13.0735,
    longitude: 80.1945,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Koyambedu Wholesale Market Complex (KWMC)']
  },
  {
    station_id: 'chn_cmbt',
    metro_id: 'chennai',
    station_name: 'Puratchi Thalaivar Dr. M.G.R. Bus Terminus (CMBT)',
    latitude: 13.0680,
    longitude: 80.2030,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Chennai Mofussil Bus Terminus (CMBT Koyambedu)']
  },
  {
    station_id: 'chn_vadapalani',
    metro_id: 'chennai',
    station_name: 'Vadapalani',
    latitude: 13.0515,
    longitude: 80.2120,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Nexus Vijaya Mall (Direct skywalk)', 'Vadapalani Murugan Temple', 'Film City']
  },
  {
    station_id: 'chn_ashok_nagar',
    metro_id: 'chennai',
    station_name: 'Ashok Nagar',
    latitude: 13.0365,
    longitude: 80.2115,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Ashok Pillar', 'ESI Hospital KK Nagar nearby']
  },
  {
    station_id: 'chn_st_thomas_mount',
    metro_id: 'chennai',
    station_name: 'St. Thomas Mount',
    latitude: 12.9950,
    longitude: 80.1980,
    lines: ['chn_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }],
    landmarks: ['St. Thomas Mount Railway Station (Suburban & MRTS connection)']
  }
];

export const chennaiInterchanges: Interchange[] = [
  {
    station_id: 'chn_central',
    line_from: 'chn_blue',
    line_to: 'chn_green',
    transfer_time_minutes: 4,
    transfer_instructions: 'Take the central interchange escalators to the lower Green Line platforms.'
  },
  {
    station_id: 'chn_alandur',
    line_from: 'chn_green',
    line_to: 'chn_blue',
    transfer_time_minutes: 3,
    transfer_instructions: 'Switch platforms across the elevated bi-level tracks towards Airport or Central.'
  }
];

export const chennaiTicketProviders: TicketProvider[] = [
  {
    provider_id: 'chn_whatsapp_qr',
    metro_id: 'chennai',
    provider_name: 'CMRL WhatsApp QR Booking',
    provider_type: 'whatsapp',
    booking_url: 'https://wa.me/918300086000?text=Hi%20Chennai%20Metro',
    badge: 'Official WhatsApp Bot',
    is_official: true,
    description: 'Get an instant 20% discount on single journeys using CMRL official WhatsApp bot.'
  },
  {
    provider_id: 'chn_cmrl_app',
    metro_id: 'chennai',
    provider_name: 'CMRL Official Metro App & Portal',
    provider_type: 'official_portal',
    booking_url: 'https://chennaimetrorail.org/',
    badge: 'Official Operator',
    is_official: true,
    description: 'Direct CMRL official portal for online passes, smart cards, and trip planners.'
  },
  {
    provider_id: 'chn_paytm',
    metro_id: 'chennai',
    provider_name: 'Paytm Metro (Chennai)',
    provider_type: 'upi_app',
    booking_url: 'https://paytm.com/metro-card-recharge/chennai-metro',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Fast UPI-based QR ticket generation with cashback.'
  }
];
