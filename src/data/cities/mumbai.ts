import { City, MetroLine, Station, Interchange, TicketProvider } from '../../types/metro';

export const mumbaiCity: City = {
  city_id: 'mumbai',
  city_name: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  timezone: 'Asia/Kolkata',
  center_lat: 19.0760,
  center_lng: 72.8777,
  metro_name: 'Maha Mumbai Metro (MMRDA / Reliance Metro)',
  tagline: 'Rapid transit across Maximum City'
};

export const mumbaiLines: MetroLine[] = [
  {
    line_id: 'mum_line1',
    metro_id: 'mumbai',
    line_name: 'Line 1 (Blue Line: Versova - Andheri - Ghatkopar)',
    line_color: '#005BAB', // Official Line 1 Blue
    line_code: 'LINE 1',
    stations: [
      'mum_versova', 'mum_dn_nagar', 'mum_azad_nagar', 'mum_andheri',
      'mum_weh', 'mum_chakala', 'mum_airport_rd', 'mum_marol_naka',
      'mum_saki_naka', 'mum_asalpha', 'mum_jagruti_nagar', 'mum_ghatkopar'
    ]
  },
  {
    line_id: 'mum_line2a',
    metro_id: 'mumbai',
    line_name: 'Line 2A (Yellow Line: Dahisar East - Andheri West)',
    line_color: '#F4B400', // Official Line 2A Yellow
    line_code: 'LINE 2A',
    stations: [
      'mum_dahisar_e', 'mum_anand_nagar', 'mum_kandivali_w', 'mum_malad_w',
      'mum_oshivara', 'mum_dn_nagar'
    ]
  },
  {
    line_id: 'mum_line7',
    metro_id: 'mumbai',
    line_name: 'Line 7 (Red Line: Dahisar East - Gundavali/WEH)',
    line_color: '#E53935', // Official Line 7 Red
    line_code: 'LINE 7',
    stations: [
      'mum_dahisar_e', 'mum_magathane', 'mum_dindoshi', 'mum_goregaon_e',
      'mum_aarey', 'mum_gundavali'
    ]
  }
];

export const mumbaiStations: Station[] = [
  // Line 1
  {
    station_id: 'mum_versova',
    metro_id: 'mumbai',
    station_name: 'Versova',
    latitude: 19.1350,
    longitude: 72.8190,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Versova Beach', 'Seven Bungalows']
  },
  {
    station_id: 'mum_dn_nagar',
    metro_id: 'mumbai',
    station_name: 'D.N. Nagar (Andheri West)',
    latitude: 19.1310,
    longitude: 72.8335,
    lines: ['mum_line1', 'mum_line2a'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'washroom', available: true }],
    landmarks: ['Bhavan’s College', 'Andheri Sports Complex']
  },
  {
    station_id: 'mum_azad_nagar',
    metro_id: 'mumbai',
    station_name: 'Azad Nagar',
    latitude: 19.1275,
    longitude: 72.8415,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Veera Desai Road', 'Fun Republic Cinema']
  },
  {
    station_id: 'mum_andheri',
    metro_id: 'mumbai',
    station_name: 'Andheri',
    latitude: 19.1205,
    longitude: 72.8530,
    lines: ['mum_line1'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'atm', available: true },
      { type: 'feeder_bus', available: true, notes: 'Direct skywalk to Andheri Western Suburban Railway Station' }
    ],
    landmarks: ['Andheri Western Railway Station', 'Swami Vivekananda Road (SV Road)']
  },
  {
    station_id: 'mum_weh',
    metro_id: 'mumbai',
    station_name: 'Western Express Highway (WEH)',
    latitude: 19.1170,
    longitude: 72.8595,
    lines: ['mum_line1'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Western Express Highway Flyover', 'Footbridge to Line 7 Gundavali']
  },
  {
    station_id: 'mum_chakala',
    metro_id: 'mumbai',
    station_name: 'Chakala (J.B. Nagar)',
    latitude: 19.1130,
    longitude: 72.8685,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Solitaire Corporate Park', 'Courtyard by Marriott']
  },
  {
    station_id: 'mum_airport_rd',
    metro_id: 'mumbai',
    station_name: 'Airport Road',
    latitude: 19.1095,
    longitude: 72.8765,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Chhatrapati Shivaji Maharaj International Airport (T2 approach)']
  },
  {
    station_id: 'mum_marol_naka',
    metro_id: 'mumbai',
    station_name: 'Marol Naka',
    latitude: 19.1070,
    longitude: 72.8835,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Andheri-Kurla Road Hub', 'SEEPZ road connection']
  },
  {
    station_id: 'mum_saki_naka',
    metro_id: 'mumbai',
    station_name: 'Saki Naka',
    latitude: 19.1030,
    longitude: 72.8885,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Saki Naka Junction', 'Powai link road']
  },
  {
    station_id: 'mum_asalpha',
    metro_id: 'mumbai',
    station_name: 'Asalpha',
    latitude: 19.0980,
    longitude: 72.8980,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Asalpha Village']
  },
  {
    station_id: 'mum_jagruti_nagar',
    metro_id: 'mumbai',
    station_name: 'Jagruti Nagar',
    latitude: 19.0920,
    longitude: 72.9030,
    lines: ['mum_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Pant Nagar', 'LBS Marg nearby']
  },
  {
    station_id: 'mum_ghatkopar',
    metro_id: 'mumbai',
    station_name: 'Ghatkopar',
    latitude: 19.0860,
    longitude: 72.9080,
    lines: ['mum_line1'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'atm', available: true },
      { type: 'feeder_bus', available: true, notes: 'Direct skywalk to Central Railway Ghatkopar Station' }
    ],
    landmarks: ['Ghatkopar Central Railway Station', 'R City Mall (1.5 km)']
  },

  // Line 2A & 7 key stations
  {
    station_id: 'mum_dahisar_e',
    metro_id: 'mumbai',
    station_name: 'Dahisar East',
    latitude: 19.2570,
    longitude: 72.8630,
    lines: ['mum_line2a', 'mum_line7'],
    interchange: true,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Dahisar Toll Naka', 'National Park North Gate']
  },
  {
    station_id: 'mum_anand_nagar',
    metro_id: 'mumbai',
    station_name: 'Anand Nagar',
    latitude: 19.2450,
    longitude: 72.8520,
    lines: ['mum_line2a'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Link Road Dahisar']
  },
  {
    station_id: 'mum_kandivali_w',
    metro_id: 'mumbai',
    station_name: 'Kandivali West',
    latitude: 19.2080,
    longitude: 72.8360,
    lines: ['mum_line2a'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Mahavir Nagar', 'Link Road']
  },
  {
    station_id: 'mum_malad_w',
    metro_id: 'mumbai',
    station_name: 'Malad West',
    latitude: 19.1860,
    longitude: 72.8330,
    lines: ['mum_line2a'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Infiniti Mall Malad nearby', 'Inorbit Mall Malad']
  },
  {
    station_id: 'mum_oshivara',
    metro_id: 'mumbai',
    station_name: 'Oshiwara',
    latitude: 19.1480,
    longitude: 72.8340,
    lines: ['mum_line2a'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Lokhandwala Complex approach']
  },
  {
    station_id: 'mum_gundavali',
    metro_id: 'mumbai',
    station_name: 'Gundavali (WEH Interchange)',
    latitude: 19.1165,
    longitude: 72.8590,
    lines: ['mum_line7'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Connected via foot-overbridge to WEH Line 1']
  },
  {
    station_id: 'mum_aarey',
    metro_id: 'mumbai',
    station_name: 'Aarey',
    latitude: 19.1460,
    longitude: 72.8580,
    lines: ['mum_line7'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Aarey Colony Entrance', 'Hub Mall Goregaon']
  },
  {
    station_id: 'mum_goregaon_e',
    metro_id: 'mumbai',
    station_name: 'Goregaon East',
    latitude: 19.1650,
    longitude: 72.8585,
    lines: ['mum_line7'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Nesco Exhibition Centre', 'Oberoi Mall']
  },
  {
    station_id: 'mum_dindoshi',
    metro_id: 'mumbai',
    station_name: 'Dindoshi',
    latitude: 19.1780,
    longitude: 72.8600,
    lines: ['mum_line7'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Dindoshi Bus Depot', 'City Centre']
  },
  {
    station_id: 'mum_magathane',
    metro_id: 'mumbai',
    station_name: 'Magathane (Borivali East)',
    latitude: 19.2230,
    longitude: 72.8635,
    lines: ['mum_line7'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Tata Power Magathane', 'National Park Main Gate nearby']
  }
];

export const mumbaiInterchanges: Interchange[] = [
  {
    station_id: 'mum_dn_nagar',
    line_from: 'mum_line1',
    line_to: 'mum_line2a',
    transfer_time_minutes: 4,
    transfer_instructions: 'Take the elevated skywalk connection between Line 1 and Line 2A concourses.'
  },
  {
    station_id: 'mum_weh',
    line_from: 'mum_line1',
    line_to: 'mum_line7',
    transfer_time_minutes: 5,
    transfer_instructions: 'Cross via the integrated elevated footbridge directly to Gundavali Line 7 platform.'
  }
];

export const mumbaiTicketProviders: TicketProvider[] = [
  {
    provider_id: 'mum_whatsapp_qr',
    metro_id: 'mumbai',
    provider_name: 'Mumbai Metro WhatsApp QR',
    provider_type: 'whatsapp',
    booking_url: 'https://wa.me/919670008889?text=Hi%20Mumbai%20Metro',
    badge: 'Official WhatsApp Bot',
    is_official: true,
    description: 'Instant paperless WhatsApp QR token directly delivered on your phone.'
  },
  {
    provider_id: 'mum_maha_metro_app',
    metro_id: 'mumbai',
    provider_name: 'Mumbai 1 Metro App / Portal',
    provider_type: 'official_portal',
    booking_url: 'https://www.reliancemumbaimetro.com/',
    badge: 'Official Metro Operator',
    is_official: true,
    description: 'Smart card recharge, monthly pass, and single transit e-ticket booking.'
  },
  {
    provider_id: 'mum_paytm',
    metro_id: 'mumbai',
    provider_name: 'Paytm Metro (Mumbai Metro)',
    provider_type: 'upi_app',
    booking_url: 'https://paytm.com/metro-card-recharge/mumbai-metro',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Recharge Mumbai Metro smart cards or generate single journey QR tickets.'
  }
];
