import { City, MetroLine, Station, Interchange, TicketProvider } from '../../types/metro';

export const bangaloreCity: City = {
  city_id: 'bangalore',
  city_name: 'Bengaluru',
  state: 'Karnataka',
  country: 'India',
  timezone: 'Asia/Kolkata',
  center_lat: 12.9716,
  center_lng: 77.5946,
  metro_name: 'Namma Metro (BMRCL)',
  tagline: 'Ride with pride on Bengaluru Namma Metro'
};

export const bangaloreLines: MetroLine[] = [
  {
    line_id: 'blr_purple',
    metro_id: 'bangalore',
    line_name: 'Purple Line (East-West Corridor)',
    line_color: '#7B1FA2', // Official BMRCL Purple
    line_code: 'PURPLE',
    stations: [
      'blr_whitefield', 'blr_itpl', 'blr_kr_puram', 'blr_baiyappanahalli',
      'blr_indiranagar', 'blr_halasuru', 'blr_trinity', 'blr_mg_road',
      'blr_cubbon_park', 'blr_vidhana_soudha', 'blr_majestic', 'blr_city_railway',
      'blr_magadi_road', 'blr_vijayanagar', 'blr_deepanjali_nagar', 'blr_mysore_road',
      'blr_kengeri', 'blr_challaghatta'
    ]
  },
  {
    line_id: 'blr_green',
    metro_id: 'bangalore',
    line_name: 'Green Line (North-South Corridor)',
    line_color: '#00843D', // Official BMRCL Green
    line_code: 'GREEN',
    stations: [
      'blr_nagasandra', 'blr_yeshwanthpur', 'blr_sandal_soap', 'blr_rajajinagar',
      'blr_kuvempu_road', 'blr_majestic', 'blr_chickpete', 'blr_kr_market',
      'blr_national_college', 'blr_lalbagh', 'blr_south_end', 'blr_jayanagar',
      'blr_rv_road', 'blr_banashankari', 'blr_jp_nagar', 'blr_yelachenahalli',
      'blr_silk_institute'
    ]
  }
];

export const bangaloreStations: Station[] = [
  // Purple Line
  {
    station_id: 'blr_whitefield',
    metro_id: 'bangalore',
    station_name: 'Whitefield (Kadugodi)',
    latitude: 12.9965,
    longitude: 77.7610,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Kadugodi Bus Stand', 'Whitefield Railway Station']
  },
  {
    station_id: 'blr_itpl',
    metro_id: 'bangalore',
    station_name: 'ITPL (Pattandur Agrahara)',
    latitude: 12.9880,
    longitude: 77.7410,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['International Tech Park Bangalore (ITPL)', 'Park Square Mall']
  },
  {
    station_id: 'blr_kr_puram',
    metro_id: 'bangalore',
    station_name: 'KR Pura (Krishnarajapuram)',
    latitude: 12.9982,
    longitude: 77.6765,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['KR Puram Hanging Bridge', 'KR Puram Railway Station']
  },
  {
    station_id: 'blr_baiyappanahalli',
    metro_id: 'bangalore',
    station_name: 'Baiyappanahalli',
    latitude: 12.9912,
    longitude: 77.6525,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['SMVT Railway Terminal approach', 'Old Madras Road']
  },
  {
    station_id: 'blr_indiranagar',
    metro_id: 'bangalore',
    station_name: 'Indiranagar',
    latitude: 12.9784,
    longitude: 77.6387,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['100 Feet Road Indiranagar', 'CMH Hospital']
  },
  {
    station_id: 'blr_halasuru',
    metro_id: 'bangalore',
    station_name: 'Halasuru (Ulsoor)',
    latitude: 12.9765,
    longitude: 77.6265,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Ulsoor Lake', 'Someshwara Temple']
  },
  {
    station_id: 'blr_trinity',
    metro_id: 'bangalore',
    station_name: 'Trinity',
    latitude: 12.9725,
    longitude: 77.6170,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Trinity Circle', 'Taj MG Road']
  },
  {
    station_id: 'blr_mg_road',
    metro_id: 'bangalore',
    station_name: 'MG Road',
    latitude: 12.9755,
    longitude: 77.6067,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'atm', available: true }],
    landmarks: ['Brigade Road', 'Church Street', 'Rangoli Metro Art Center']
  },
  {
    station_id: 'blr_cubbon_park',
    metro_id: 'bangalore',
    station_name: 'Cubbon Park',
    latitude: 12.9806,
    longitude: 77.5975,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Cubbon Park', 'High Court of Karnataka', 'Chinnaswamy Stadium']
  },
  {
    station_id: 'blr_vidhana_soudha',
    metro_id: 'bangalore',
    station_name: 'Vidhana Soudha',
    latitude: 12.9798,
    longitude: 77.5912,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Vidhana Soudha', 'Vikas Soudha', 'General Post Office (GPO)']
  },
  {
    station_id: 'blr_majestic',
    metro_id: 'bangalore',
    station_name: 'Nadaprabhu Kempegowda (Majestic)',
    latitude: 12.9756,
    longitude: 77.5728,
    lines: ['blr_purple', 'blr_green'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'feeder_bus', available: true },
      { type: 'atm', available: true },
      { type: 'wheelchair', available: true }
    ],
    landmarks: ['KSR Bengaluru City Railway Station', 'Kempegowda Bus Station (BMTC & KSRTC)']
  },
  {
    station_id: 'blr_city_railway',
    metro_id: 'bangalore',
    station_name: 'Krantivira Sangolli Rayanna (City Railway)',
    latitude: 12.9778,
    longitude: 77.5670,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['KSR Bangalore Main Railway Concourse']
  },
  {
    station_id: 'blr_magadi_road',
    metro_id: 'bangalore',
    station_name: 'Magadi Road',
    latitude: 12.9750,
    longitude: 77.5550,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Magadi Road Toll Gate']
  },
  {
    station_id: 'blr_vijayanagar',
    metro_id: 'bangalore',
    station_name: 'Vijayanagar',
    latitude: 12.9702,
    longitude: 77.5375,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Vijayanagar Bus Stand', 'Maruti Mandir']
  },
  {
    station_id: 'blr_deepanjali_nagar',
    metro_id: 'bangalore',
    station_name: 'Deepanjali Nagar',
    latitude: 12.9525,
    longitude: 77.5340,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Deepanjali Nagar Industrial area']
  },
  {
    station_id: 'blr_mysore_road',
    metro_id: 'bangalore',
    station_name: 'Mysuru Road',
    latitude: 12.9460,
    longitude: 77.5270,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Satellite Bus Station (Mysore Road)']
  },
  {
    station_id: 'blr_kengeri',
    metro_id: 'bangalore',
    station_name: 'Kengeri Bus Terminal',
    latitude: 12.9080,
    longitude: 77.4780,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Kengeri TTMC Bus Terminal']
  },
  {
    station_id: 'blr_challaghatta',
    metro_id: 'bangalore',
    station_name: 'Challaghatta',
    latitude: 12.8980,
    longitude: 77.4640,
    lines: ['blr_purple'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Rajarajeswari Medical College & Hospital']
  },

  // Green Line
  {
    station_id: 'blr_nagasandra',
    metro_id: 'bangalore',
    station_name: 'Nagasandra',
    latitude: 13.0480,
    longitude: 77.5000,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Bangalore International Exhibition Centre (BIEC) approach']
  },
  {
    station_id: 'blr_yeshwanthpur',
    metro_id: 'bangalore',
    station_name: 'Yeshwanthpur',
    latitude: 13.0232,
    longitude: 77.5501,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Yeshwanthpur Railway Station', 'Govardhan Theater']
  },
  {
    station_id: 'blr_sandal_soap',
    metro_id: 'bangalore',
    station_name: 'Sandal Soap Factory',
    latitude: 13.0145,
    longitude: 77.5535,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Karnataka Soaps and Detergents Ltd (Mysore Sandal)', 'Orion Mall nearby']
  },
  {
    station_id: 'blr_rajajinagar',
    metro_id: 'bangalore',
    station_name: 'Rajajinagar',
    latitude: 13.0035,
    longitude: 77.5555,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Rajajinagar 1st Block', 'ESI Hospital Rajajinagar']
  },
  {
    station_id: 'blr_kuvempu_road',
    metro_id: 'bangalore',
    station_name: 'Kuvempu Road',
    latitude: 12.9940,
    longitude: 77.5590,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Navrang Theater Circle']
  },
  {
    station_id: 'blr_chickpete',
    metro_id: 'bangalore',
    station_name: 'Chickpete',
    latitude: 12.9680,
    longitude: 77.5750,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Chickpet Saree Bazaar', 'BVK Iyengar Road']
  },
  {
    station_id: 'blr_kr_market',
    metro_id: 'bangalore',
    station_name: 'Krishna Rajendra Market',
    latitude: 12.9610,
    longitude: 77.5760,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['KR Market Flower Market', 'Bangalore Fort', 'Victoria Hospital']
  },
  {
    station_id: 'blr_national_college',
    metro_id: 'bangalore',
    station_name: 'National College',
    latitude: 12.9505,
    longitude: 77.5720,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['National College Basavanagudi', 'Gandhi Bazaar nearby']
  },
  {
    station_id: 'blr_lalbagh',
    metro_id: 'bangalore',
    station_name: 'Lalbagh',
    latitude: 12.9460,
    longitude: 77.5800,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Lalbagh Botanical Garden West Gate']
  },
  {
    station_id: 'blr_south_end',
    metro_id: 'bangalore',
    station_name: 'South End Circle',
    latitude: 12.9370,
    longitude: 77.5800,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['South End Circle', 'Surana College']
  },
  {
    station_id: 'blr_jayanagar',
    metro_id: 'bangalore',
    station_name: 'Jayanagar',
    latitude: 12.9290,
    longitude: 77.5800,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Jayanagar 4th Block Complex', 'Shopping Street']
  },
  {
    station_id: 'blr_rv_road',
    metro_id: 'bangalore',
    station_name: 'Rashtreeya Vidyalaya Road (RV Road)',
    latitude: 12.9215,
    longitude: 77.5800,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['RV Teachers College', 'NMKRV College']
  },
  {
    station_id: 'blr_banashankari',
    metro_id: 'bangalore',
    station_name: 'Banashankari',
    latitude: 12.9150,
    longitude: 77.5735,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'parking', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Banashankari Amma Temple', 'Banashankari TTMC Bus Terminal']
  },
  {
    station_id: 'blr_jp_nagar',
    metro_id: 'bangalore',
    station_name: 'Jaya Prakash Nagar (JP Nagar)',
    latitude: 12.9070,
    longitude: 77.5730,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Sarakki Signal', 'JP Nagar 6th Phase']
  },
  {
    station_id: 'blr_yelachenahalli',
    metro_id: 'bangalore',
    station_name: 'Yelachenahalli',
    latitude: 12.8950,
    longitude: 77.5700,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }],
    landmarks: ['Kanakapura Road Junction']
  },
  {
    station_id: 'blr_silk_institute',
    metro_id: 'bangalore',
    station_name: 'Silk Institute',
    latitude: 12.8620,
    longitude: 77.5380,
    lines: ['blr_green'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }],
    landmarks: ['Art of Living Ashram nearby', 'Kanakapura Highway']
  }
];

export const bangaloreInterchanges: Interchange[] = [
  {
    station_id: 'blr_majestic',
    line_from: 'blr_purple',
    line_to: 'blr_green',
    transfer_time_minutes: 5,
    transfer_instructions: 'Take the central interchange escalators down to the Green Line underground platforms.'
  },
  {
    station_id: 'blr_majestic',
    line_from: 'blr_green',
    line_to: 'blr_purple',
    transfer_time_minutes: 5,
    transfer_instructions: 'Follow purple floor signage to the upper concourse level for the Purple Line.'
  }
];

export const bangaloreTicketProviders: TicketProvider[] = [
  {
    provider_id: 'blr_namma_whatsapp',
    metro_id: 'bangalore',
    provider_name: 'Namma Metro WhatsApp QR Ticketing',
    provider_type: 'whatsapp',
    booking_url: 'https://wa.me/918105556677?text=Hi%20Namma%20Metro',
    badge: 'Official WhatsApp QR',
    is_official: true,
    description: 'Get an instant 5% discounted QR ticket directly within WhatsApp without downloading any app.'
  },
  {
    provider_id: 'blr_bmrcl_official',
    metro_id: 'bangalore',
    provider_name: 'BMRCL Official Portal',
    provider_type: 'official_portal',
    booking_url: 'https://english.bmrc.co.in/',
    badge: 'Official Authority',
    is_official: true,
    description: 'Official transit portal for smart card recharges and network updates.'
  },
  {
    provider_id: 'blr_paytm',
    metro_id: 'bangalore',
    provider_name: 'Paytm Metro (Namma Metro)',
    provider_type: 'upi_app',
    booking_url: 'https://paytm.com/metro-card-recharge/namma-metro',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Recharge smart cards or purchase single transit QR tokens.'
  }
];
