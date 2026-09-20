import { City, MetroLine, Station, Interchange, TicketProvider } from '../../types/metro';

export const delhiCity: City = {
  city_id: 'delhi',
  city_name: 'Delhi NCR',
  state: 'Delhi NCR',
  country: 'India',
  timezone: 'Asia/Kolkata',
  center_lat: 28.6139,
  center_lng: 77.2090,
  metro_name: 'Delhi Metro (DMRC)',
  tagline: 'The Lifeline of Delhi National Capital Region'
};

export const delhiLines: MetroLine[] = [
  {
    line_id: 'del_yellow',
    metro_id: 'delhi',
    line_name: 'Yellow Line (Samaypur Badli - Millennium City Centre Gurugram)',
    line_color: '#E6A100', // Official DMRC Yellow
    line_code: 'YELLOW',
    stations: [
      'del_samaypur_badli', 'del_vishwavidyalaya', 'del_kashmere_gate', 'del_chandni_chowk',
      'del_new_delhi', 'del_rajiv_chowk', 'del_patel_chowk', 'del_central_sec',
      'del_aiims', 'del_dilli_haat_ina', 'del_hauz_khas', 'del_malviya_nagar',
      'del_saket', 'del_qutab_minar', 'del_chhattarpur', 'del_sikanderpur',
      'del_millennium_city_centre'
    ]
  },
  {
    line_id: 'del_blue',
    metro_id: 'delhi',
    line_name: 'Blue Line (Dwarka Sec 21 - Noida Electronic City / Vaishali)',
    line_color: '#0055A5', // Official DMRC Blue
    line_code: 'BLUE',
    stations: [
      'del_dwarka_sec_21', 'del_janakpuri_west', 'del_rajouri_garden', 'del_kirti_nagar',
      'del_karol_bagh', 'del_rajiv_chowk', 'del_mandi_house', 'del_pragati_maidan',
      'del_yamuna_bank', 'del_noida_sec_18', 'del_botanical_garden', 'del_noida_electronic_city'
    ]
  },
  {
    line_id: 'del_airport',
    metro_id: 'delhi',
    line_name: 'Airport Express (Orange Line: New Delhi - IGI Airport T3 - Yashobhoomi)',
    line_color: '#FF6F00', // Official DMRC Orange Line
    line_code: 'AIRPORT',
    stations: [
      'del_new_delhi', 'del_shivaji_stadium', 'del_dhaula_kuan', 'del_aerocity',
      'del_airport_t3', 'del_yashobhoomi'
    ]
  }
];

export const delhiStations: Station[] = [
  {
    station_id: 'del_samaypur_badli',
    metro_id: 'delhi',
    station_name: 'Samaypur Badli',
    latitude: 28.7450,
    longitude: 77.1350,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Badli Railway Station', 'Sanjay Gandhi Transport Nagar']
  },
  {
    station_id: 'del_vishwavidyalaya',
    metro_id: 'delhi',
    station_name: 'Vishwavidyalaya (Delhi University)',
    latitude: 28.6945,
    longitude: 77.2085,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Delhi University North Campus', 'Kamla Nagar Market']
  },
  {
    station_id: 'del_kashmere_gate',
    metro_id: 'delhi',
    station_name: 'Kashmere Gate',
    latitude: 28.6675,
    longitude: 77.2285,
    lines: ['del_yellow'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'feeder_bus', available: true }
    ],
    landmarks: ['Maharana Pratap ISBT Kashmere Gate', 'St. James Church']
  },
  {
    station_id: 'del_chandni_chowk',
    metro_id: 'delhi',
    station_name: 'Chandni Chowk',
    latitude: 28.6575,
    longitude: 77.2305,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Old Delhi Railway Station', 'Red Fort', 'Jama Masjid', 'Chandni Chowk Bazaar']
  },
  {
    station_id: 'del_new_delhi',
    metro_id: 'delhi',
    station_name: 'New Delhi',
    latitude: 28.6430,
    longitude: 77.2225,
    lines: ['del_yellow', 'del_airport'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'atm', available: true },
      { type: 'feeder_bus', available: true, notes: 'Direct skywalk to New Delhi Railway Station Ajmeri Gate' }
    ],
    landmarks: ['New Delhi Railway Station (NDLS)', 'Airport Express Check-in Lounge']
  },
  {
    station_id: 'del_rajiv_chowk',
    metro_id: 'delhi',
    station_name: 'Rajiv Chowk (Connaught Place)',
    latitude: 28.6328,
    longitude: 77.2195,
    lines: ['del_yellow', 'del_blue'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'atm', available: true },
      { type: 'wheelchair', available: true }
    ],
    landmarks: ['Connaught Place (CP Inner & Outer Circle)', 'Central Park', 'Palika Bazaar']
  },
  {
    station_id: 'del_patel_chowk',
    metro_id: 'delhi',
    station_name: 'Patel Chowk',
    latitude: 28.6235,
    longitude: 77.2135,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Metro Museum', 'Gurudwara Bangla Sahib nearby', 'Reserve Bank of India']
  },
  {
    station_id: 'del_central_sec',
    metro_id: 'delhi',
    station_name: 'Central Secretariat',
    latitude: 28.6148,
    longitude: 77.2120,
    lines: ['del_yellow'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Krishi Bhavan', 'Shastri Bhavan', 'Rashtrapati Bhavan / Kartavya Path nearby']
  },
  {
    station_id: 'del_dilli_haat_ina',
    metro_id: 'delhi',
    station_name: 'Dilli Haat - INA',
    latitude: 28.5745,
    longitude: 77.2095,
    lines: ['del_yellow'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Dilli Haat INA', 'INA Market']
  },
  {
    station_id: 'del_aiims',
    metro_id: 'delhi',
    station_name: 'AIIMS',
    latitude: 28.5685,
    longitude: 77.2075,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'wheelchair', available: true }],
    landmarks: ['All India Institute of Medical Sciences (AIIMS)', 'Safdarjung Hospital']
  },
  {
    station_id: 'del_hauz_khas',
    metro_id: 'delhi',
    station_name: 'Hauz Khas',
    latitude: 28.5430,
    longitude: 77.2065,
    lines: ['del_yellow'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['IIT Delhi', 'Hauz Khas Village & Deer Park']
  },
  {
    station_id: 'del_malviya_nagar',
    metro_id: 'delhi',
    station_name: 'Malviya Nagar',
    latitude: 28.5285,
    longitude: 77.2055,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Select Citywalk Saket nearby', 'PVR Anupam']
  },
  {
    station_id: 'del_saket',
    metro_id: 'delhi',
    station_name: 'Saket',
    latitude: 28.5205,
    longitude: 77.2015,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Saket District Centre', 'Max Super Speciality Hospital']
  },
  {
    station_id: 'del_qutab_minar',
    metro_id: 'delhi',
    station_name: 'Qutab Minar',
    latitude: 28.5130,
    longitude: 77.1855,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Qutab Minar UNESCO World Heritage Site', 'Mehrauli Archaeological Park']
  },
  {
    station_id: 'del_chhattarpur',
    metro_id: 'delhi',
    station_name: 'Chhattarpur',
    latitude: 28.5065,
    longitude: 77.1750,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Chhattarpur Temple Complex']
  },
  {
    station_id: 'del_sikanderpur',
    metro_id: 'delhi',
    station_name: 'Sikanderpur',
    latitude: 28.4815,
    longitude: 77.0930,
    lines: ['del_yellow'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Interchange with Rapid Metro Gurugram', 'Cyber City approach']
  },
  {
    station_id: 'del_millennium_city_centre',
    metro_id: 'delhi',
    station_name: 'Millennium City Centre Gurugram (HUDA City Centre)',
    latitude: 28.4595,
    longitude: 77.0725,
    lines: ['del_yellow'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Fortis Memorial Research Institute', 'Kingdom of Dreams', 'Appu Ghar']
  },

  // Blue Line Stations
  {
    station_id: 'del_dwarka_sec_21',
    metro_id: 'delhi',
    station_name: 'Dwarka Sector 21',
    latitude: 28.5520,
    longitude: 77.0585,
    lines: ['del_blue', 'del_airport'],
    interchange: true,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Pacific D21 Mall', 'Yashobhoomi approach']
  },
  {
    station_id: 'del_janakpuri_west',
    metro_id: 'delhi',
    station_name: 'Janakpuri West',
    latitude: 28.6295,
    longitude: 77.0785,
    lines: ['del_blue'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['District Centre Janakpuri', 'Unity One Mall']
  },
  {
    station_id: 'del_rajouri_garden',
    metro_id: 'delhi',
    station_name: 'Rajouri Garden',
    latitude: 28.6485,
    longitude: 77.1220,
    lines: ['del_blue'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Rajouri Garden Market', 'TDI Mall', 'City Square Mall']
  },
  {
    station_id: 'del_kirti_nagar',
    metro_id: 'delhi',
    station_name: 'Kirti Nagar',
    latitude: 28.6555,
    longitude: 77.1500,
    lines: ['del_blue'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Kirti Nagar Furniture Market', 'Moments Mall']
  },
  {
    station_id: 'del_karol_bagh',
    metro_id: 'delhi',
    station_name: 'Karol Bagh',
    latitude: 28.6440,
    longitude: 77.1900,
    lines: ['del_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Gaffar Market', 'Ajmal Khan Road', 'IAS Coaching Hub']
  },
  {
    station_id: 'del_mandi_house',
    metro_id: 'delhi',
    station_name: 'Mandi House',
    latitude: 28.6255,
    longitude: 77.2340,
    lines: ['del_blue'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['National School of Drama (NSD)', 'Kamani Auditorium', 'Shri Ram Centre']
  },
  {
    station_id: 'del_pragati_maidan',
    metro_id: 'delhi',
    station_name: 'Supreme Court (Pragati Maidan)',
    latitude: 28.6220,
    longitude: 77.2435,
    lines: ['del_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Supreme Court of India', 'Bharat Mandapam (Pragati Maidan)']
  },
  {
    station_id: 'del_yamuna_bank',
    metro_id: 'delhi',
    station_name: 'Yamuna Bank',
    latitude: 28.6235,
    longitude: 77.2680,
    lines: ['del_blue'],
    interchange: true,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Yamuna Depot', 'Trans-Yamuna junction fork']
  },
  {
    station_id: 'del_noida_sec_18',
    metro_id: 'delhi',
    station_name: 'Noida Sector 18',
    latitude: 28.5705,
    longitude: 77.3225,
    lines: ['del_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Mall of India', 'The Great India Place (TGIP)', 'Atta Market']
  },
  {
    station_id: 'del_botanical_garden',
    metro_id: 'delhi',
    station_name: 'Botanical Garden',
    latitude: 28.5645,
    longitude: 77.3340,
    lines: ['del_blue'],
    interchange: true,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Noida Botanical Garden', 'Interchange to Magenta Line']
  },
  {
    station_id: 'del_noida_electronic_city',
    metro_id: 'delhi',
    station_name: 'Noida Electronic City',
    latitude: 28.6275,
    longitude: 77.3755,
    lines: ['del_blue'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Noida Sector 62 IT Hub', 'Indirapuram Ghaziabad border']
  },

  // Airport Express Stations
  {
    station_id: 'del_shivaji_stadium',
    metro_id: 'delhi',
    station_name: 'Shivaji Stadium',
    latitude: 28.6285,
    longitude: 77.2125,
    lines: ['del_airport'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Connaught Place Outer Circle', 'State Emporiums Baba Kharak Singh Marg']
  },
  {
    station_id: 'del_dhaula_kuan',
    metro_id: 'delhi',
    station_name: 'Dhaula Kuan',
    latitude: 28.5915,
    longitude: 77.1610,
    lines: ['del_airport'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['South Campus Colleges', 'Travelator to Durgabai Deshmukh South Campus (Pink Line)']
  },
  {
    station_id: 'del_aerocity',
    metro_id: 'delhi',
    station_name: 'Delhi Aerocity',
    latitude: 28.5495,
    longitude: 77.1215,
    lines: ['del_airport'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Aerocity Hospitality District (JW Marriott, Andaz, Pullman)']
  },
  {
    station_id: 'del_airport_t3',
    metro_id: 'delhi',
    station_name: 'IGI Airport Terminal 3',
    latitude: 28.5565,
    longitude: 77.0865,
    lines: ['del_airport'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'washroom', available: true }, { type: 'wheelchair', available: true }],
    landmarks: ['Indira Gandhi International Airport (Terminal 3 & Terminal 2)']
  },
  {
    station_id: 'del_yashobhoomi',
    metro_id: 'delhi',
    station_name: 'Yashobhoomi Dwarka Sector 25',
    latitude: 28.5535,
    longitude: 77.0380,
    lines: ['del_airport'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['India International Convention & Expo Centre (IICC Yashobhoomi)']
  }
];

export const delhiInterchanges: Interchange[] = [
  {
    station_id: 'del_rajiv_chowk',
    line_from: 'del_yellow',
    line_to: 'del_blue',
    transfer_time_minutes: 5,
    transfer_instructions: 'Take the central stairs/escalators up to Level 1 for the Blue Line platforms.'
  },
  {
    station_id: 'del_rajiv_chowk',
    line_from: 'del_blue',
    line_to: 'del_yellow',
    transfer_time_minutes: 5,
    transfer_instructions: 'Take the stairs down to the lower Level 2 underground Yellow Line platforms.'
  },
  {
    station_id: 'del_new_delhi',
    line_from: 'del_yellow',
    line_to: 'del_airport',
    transfer_time_minutes: 6,
    transfer_instructions: 'Follow orange airport signs through the dedicated underground high-speed concourse.'
  }
];

export const delhiTicketProviders: TicketProvider[] = [
  {
    provider_id: 'del_whatsapp_qr',
    metro_id: 'delhi',
    provider_name: 'DMRC WhatsApp Metro Ticketing',
    provider_type: 'whatsapp',
    booking_url: 'https://wa.me/919650855800?text=Hi',
    badge: 'Official WhatsApp Bot',
    is_official: true,
    description: 'Instant contactless QR ticket directly via DMRC WhatsApp (+91 9650855800).'
  },
  {
    provider_id: 'del_dmrc_saarthi',
    metro_id: 'delhi',
    provider_name: 'DMRC Momentum 2.0 / Saarthi',
    provider_type: 'official_portal',
    booking_url: 'https://www.delhimetrorail.com/',
    badge: 'Official DMRC App',
    is_official: true,
    description: 'Official Delhi Metro portal for mobile tickets, digital lockers, and card recharge.'
  },
  {
    provider_id: 'del_paytm',
    metro_id: 'delhi',
    provider_name: 'Paytm Metro (Delhi)',
    provider_type: 'upi_app',
    booking_url: 'https://paytm.com/metro-card-recharge/delhi-metro',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Purchase DMRC QR tickets or top up metro smart cards.'
  }
];
