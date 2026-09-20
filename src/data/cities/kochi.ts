import { City, MetroLine, Station, Interchange, TicketProvider } from '../../types/metro';

export const kochiCity: City = {
  city_id: 'kochi',
  city_name: 'Kochi',
  state: 'Kerala',
  country: 'India',
  timezone: 'Asia/Kolkata',
  center_lat: 9.9312,
  center_lng: 76.2673,
  metro_name: 'Kochi Metro Rail (KMRL)',
  tagline: 'Kerala’s modern eco-friendly rapid transit and water metro network'
};

export const kochiLines: MetroLine[] = [
  {
    line_id: 'koc_line1',
    metro_id: 'kochi',
    line_name: 'Line 1 (Cyan Line: Aluva - Tripunithura Terminal)',
    line_color: '#00A3AD', // Official KMRL Aqua
    line_code: 'LINE 1',
    stations: [
      'koc_aluva', 'koc_pulinchodu', 'koc_companypady', 'koc_ambattukavu',
      'koc_muttom', 'koc_kalamassery', 'koc_cusat', 'koc_pathadipalam',
      'koc_edapally', 'koc_changampuzha', 'koc_palarivattom', 'koc_jln_stadium',
      'koc_kaloor', 'koc_lissie', 'koc_mg_road', 'koc_maharajas',
      'koc_ernakulam_south', 'koc_kadavanthra', 'koc_elamkulam', 'koc_vyttila',
      'koc_thykoodam', 'koc_petta', 'koc_vadakkekotta', 'koc_sn_junction',
      'koc_tripunithura'
    ]
  }
];

export const kochiStations: Station[] = [
  {
    station_id: 'koc_aluva',
    metro_id: 'kochi',
    station_name: 'Aluva',
    latitude: 10.1085,
    longitude: 76.3565,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Periyar River', 'Aluva KSRTC Bus Stand', 'Aluva Railway Station']
  },
  {
    station_id: 'koc_pulinchodu',
    metro_id: 'kochi',
    station_name: 'Pulinchodu',
    latitude: 10.0980,
    longitude: 76.3500,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Aluva bypass']
  },
  {
    station_id: 'koc_companypady',
    metro_id: 'kochi',
    station_name: 'Companypady',
    latitude: 10.0890,
    longitude: 76.3420,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Industrial area Companypady']
  },
  {
    station_id: 'koc_ambattukavu',
    metro_id: 'kochi',
    station_name: 'Ambattukavu',
    latitude: 10.0815,
    longitude: 76.3355,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Ambattukavu Temple']
  },
  {
    station_id: 'koc_muttom',
    metro_id: 'kochi',
    station_name: 'Muttom',
    latitude: 10.0730,
    longitude: 76.3280,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Kochi Metro Operation Control Centre & Depot']
  },
  {
    station_id: 'koc_kalamassery',
    metro_id: 'kochi',
    station_name: 'Kalamassery',
    latitude: 10.0570,
    longitude: 76.3210,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['HMT Colony', 'St. Paul’s College Kalamassery']
  },
  {
    station_id: 'koc_cusat',
    metro_id: 'kochi',
    station_name: 'Cochin University (CUSAT)',
    latitude: 10.0460,
    longitude: 76.3180,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Cochin University of Science and Technology (CUSAT)']
  },
  {
    station_id: 'koc_pathadipalam',
    metro_id: 'kochi',
    station_name: 'Pathadipalam',
    latitude: 10.0360,
    longitude: 76.3140,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Pathadipalam Bridge', 'Kerala State Pollution Control Board']
  },
  {
    station_id: 'koc_edapally',
    metro_id: 'kochi',
    station_name: 'Edapally',
    latitude: 10.0260,
    longitude: 76.3090,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'feeder_bus', available: true, notes: 'Direct skywalk inside LuLu Mall Kochi' }
    ],
    landmarks: ['LuLu International Shopping Mall Kochi', 'Edappally Church']
  },
  {
    station_id: 'koc_changampuzha',
    metro_id: 'kochi',
    station_name: 'Changampuzha Park',
    latitude: 10.0150,
    longitude: 76.3050,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Changampuzha Smaraka Park', 'Edappally Raghavan Pillai Memorial']
  },
  {
    station_id: 'koc_palarivattom',
    metro_id: 'kochi',
    station_name: 'Palarivattom',
    latitude: 10.0050,
    longitude: 76.3030,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Palarivattom Junction Flyover', 'Al-Ameen Public School']
  },
  {
    station_id: 'koc_jln_stadium',
    metro_id: 'kochi',
    station_name: 'JLN Stadium (Kaloor)',
    latitude: 9.9985,
    longitude: 76.3005,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Jawaharlal Nehru International Stadium (Kaloor Stadium)']
  },
  {
    station_id: 'koc_kaloor',
    metro_id: 'kochi',
    station_name: 'Kaloor',
    latitude: 9.9920,
    longitude: 76.2930,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Kaloor Private Bus Stand', 'Gokulam Park Hotel']
  },
  {
    station_id: 'koc_lissie',
    metro_id: 'kochi',
    station_name: 'Town Hall (Lissie)',
    latitude: 9.9875,
    longitude: 76.2865,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Ernakulam Town Hall', 'Lisie Hospital', 'Ernakulam Town (North) Railway Station (600m)']
  },
  {
    station_id: 'koc_mg_road',
    metro_id: 'kochi',
    station_name: 'M.G. Road',
    latitude: 9.9790,
    longitude: 76.2830,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'atm', available: true }],
    landmarks: ['Centre Square Mall', 'Kochi MG Road Shopping Precinct']
  },
  {
    station_id: 'koc_maharajas',
    metro_id: 'kochi',
    station_name: 'Maharaja’s College',
    latitude: 9.9720,
    longitude: 76.2840,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Maharaja’s College Ground', 'Subhash Bose Park nearby']
  },
  {
    station_id: 'koc_ernakulam_south',
    metro_id: 'kochi',
    station_name: 'Ernakulam South',
    latitude: 9.9675,
    longitude: 76.2885,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Ernakulam Junction Railway Station (South Station)', 'KSRTC Central Bus Station']
  },
  {
    station_id: 'koc_kadavanthra',
    metro_id: 'kochi',
    station_name: 'Kadavanthra',
    latitude: 9.9640,
    longitude: 76.2970,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Kadavanthra Junction', 'Rajiv Gandhi Indoor Stadium']
  },
  {
    station_id: 'koc_elamkulam',
    metro_id: 'kochi',
    station_name: 'Elamkulam',
    latitude: 9.9610,
    longitude: 76.3075,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['SA Road', 'Subramanya Swamy Temple']
  },
  {
    station_id: 'koc_vyttila',
    metro_id: 'kochi',
    station_name: 'Vyttila Mobility Hub',
    latitude: 9.9660,
    longitude: 76.3215,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [
      { type: 'parking', available: true },
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'feeder_bus', available: true, notes: 'Multi-modal transit hub connecting Metro, Intercity Buses, and Water Metro' }
    ],
    landmarks: ['Vyttila Mobility Hub', 'Kochi Water Metro Jetty', 'KSRTC Intercity Bay']
  },
  {
    station_id: 'koc_thykoodam',
    metro_id: 'kochi',
    station_name: 'Thykoodam',
    latitude: 9.9575,
    longitude: 76.3280,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Champakkara Fish Market', 'Thykoodam Bridge']
  },
  {
    station_id: 'koc_petta',
    metro_id: 'kochi',
    station_name: 'Petta',
    latitude: 9.9510,
    longitude: 76.3360,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Petta Junction', 'Tripunithura Gateway']
  },
  {
    station_id: 'koc_vadakkekotta',
    metro_id: 'kochi',
    station_name: 'Vadakkekotta',
    latitude: 9.9480,
    longitude: 76.3450,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Historical Fort of Tripunithura Royal Heritage']
  },
  {
    station_id: 'koc_sn_junction',
    metro_id: 'kochi',
    station_name: 'SN Junction',
    latitude: 9.9460,
    longitude: 76.3510,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Sree Narayana Junction', 'Hill Palace Road']
  },
  {
    station_id: 'koc_tripunithura',
    metro_id: 'kochi',
    station_name: 'Tripunithura Terminal',
    latitude: 9.9425,
    longitude: 76.3575,
    lines: ['koc_line1'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Tripunithura Railway Station', 'Hill Palace Museum (2 km)']
  }
];

export const kochiInterchanges: Interchange[] = []; // Single unified corridor with Water Metro connection at Vyttila

export const kochiTicketProviders: TicketProvider[] = [
  {
    provider_id: 'koc_whatsapp_qr',
    metro_id: 'kochi',
    provider_name: 'Kochi Metro WhatsApp QR',
    provider_type: 'whatsapp',
    booking_url: 'https://wa.me/919188459459?text=Hi%20Kochi%20Metro',
    badge: 'Official WhatsApp Bot',
    is_official: true,
    description: 'Quick paperless QR ticket straight from KMRL verified WhatsApp bot.'
  },
  {
    provider_id: 'koc_kochi1_app',
    metro_id: 'kochi',
    provider_name: 'Kochi1 Card & App',
    provider_type: 'official_portal',
    booking_url: 'https://kochimetro.org/',
    badge: 'Official KMRL Operator',
    is_official: true,
    description: 'Official transit portal for multi-modal travel across Metro & Water Metro.'
  },
  {
    provider_id: 'koc_paytm',
    metro_id: 'kochi',
    provider_name: 'Paytm Metro (Kochi)',
    provider_type: 'upi_app',
    booking_url: 'https://paytm.com/metro-card-recharge/kochi-metro',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Purchase single trip transit tokens via UPI payment.'
  }
];
