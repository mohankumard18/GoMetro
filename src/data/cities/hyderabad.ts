import { City, MetroLine, Station, Interchange, TicketProvider } from '../../types/metro';

export const hyderabadCity: City = {
  city_id: 'hyderabad',
  city_name: 'Hyderabad',
  state: 'Telangana',
  country: 'India',
  timezone: 'Asia/Kolkata',
  center_lat: 17.3850,
  center_lng: 78.4867,
  metro_name: 'Hyderabad Metro Rail (HMR)',
  tagline: 'Connecting Hyderabad with Speed & Comfort'
};

export const hyderabadLines: MetroLine[] = [
  {
    line_id: 'hyd_blue',
    metro_id: 'hyderabad',
    line_name: 'Blue Line (Corridor III)',
    line_color: '#0072CE', // Official HMR Blue
    line_code: 'BLUE',
    stations: [
      'hyd_nagole', 'hyd_uppal', 'hyd_stadium', 'hyd_ngri', 'hyd_habsiguda',
      'hyd_tarnaka', 'hyd_mettuguda', 'hyd_sec_east', 'hyd_parade_ground',
      'hyd_paradise', 'hyd_rasoolpura', 'hyd_prakash_nagar', 'hyd_begumpet',
      'hyd_ameerpet', 'hyd_madhura_nagar', 'hyd_yusufguda', 'hyd_road_no_5',
      'hyd_check_post', 'hyd_peddamma_gudi', 'hyd_madhapur', 'hyd_durgam_cheruvu',
      'hyd_hitec_city', 'hyd_raidurg'
    ]
  },
  {
    line_id: 'hyd_red',
    metro_id: 'hyderabad',
    line_name: 'Red Line (Corridor I)',
    line_color: '#ED1C24', // Official HMR Red
    line_code: 'RED',
    stations: [
      'hyd_miyapur', 'hyd_jntu', 'hyd_kphb', 'hyd_kukatpally', 'hyd_balanagar',
      'hyd_moosapet', 'hyd_bharat_nagar', 'hyd_erragadda', 'hyd_esi_hospital',
      'hyd_sr_nagar', 'hyd_ameerpet', 'hyd_punjagutta', 'hyd_irrum_manzil',
      'hyd_khairatabad', 'hyd_lakdikapul', 'hyd_assembly', 'hyd_nampally',
      'hyd_gandhi_bhavan', 'hyd_omc', 'hyd_mgbs', 'hyd_malakpet', 'hyd_new_market',
      'hyd_musarambagh', 'hyd_dilsukhnagar', 'hyd_chaitanyapuri', 'hyd_victoria_memorial',
      'hyd_lb_nagar'
    ]
  },
  {
    line_id: 'hyd_green',
    metro_id: 'hyderabad',
    line_name: 'Green Line (Corridor II)',
    line_color: '#00A651', // Official HMR Green
    line_code: 'GREEN',
    stations: [
      'hyd_jbs_parade_ground', 'hyd_sec_west', 'hyd_gandhi_hospital', 'hyd_musheerabad',
      'hyd_rtc_x_roads', 'hyd_chikkadpally', 'hyd_narayanguda', 'hyd_sultan_bazaar',
      'hyd_mgbs'
    ]
  }
];

export const hyderabadStations: Station[] = [
  // Blue Line Stations
  {
    station_id: 'hyd_nagole',
    metro_id: 'hyderabad',
    station_name: 'Nagole',
    latitude: 17.3804,
    longitude: 78.5630,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Nagole Bridge', 'Uppal Ring Road nearby']
  },
  {
    station_id: 'hyd_uppal',
    metro_id: 'hyderabad',
    station_name: 'Uppal',
    latitude: 17.4018,
    longitude: 78.5602,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Uppal Junction', 'Kendriya Vidyalaya Uppal']
  },
  {
    station_id: 'hyd_stadium',
    metro_id: 'hyderabad',
    station_name: 'Stadium',
    latitude: 17.4077,
    longitude: 78.5528,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Rajiv Gandhi International Cricket Stadium']
  },
  {
    station_id: 'hyd_ngri',
    metro_id: 'hyderabad',
    station_name: 'NGRI',
    latitude: 17.4140,
    longitude: 78.5445,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['National Geophysical Research Institute']
  },
  {
    station_id: 'hyd_habsiguda',
    metro_id: 'hyderabad',
    station_name: 'Habsiguda',
    latitude: 17.4192,
    longitude: 78.5376,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'atm', available: true }],
    landmarks: ['CCMB', 'IICT', 'Osmania University Gate']
  },
  {
    station_id: 'hyd_tarnaka',
    metro_id: 'hyderabad',
    station_name: 'Tarnaka',
    latitude: 17.4286,
    longitude: 78.5298,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Tarnaka Flyover', 'NIN', 'EFLU nearby']
  },
  {
    station_id: 'hyd_mettuguda',
    metro_id: 'hyderabad',
    station_name: 'Mettuguda',
    latitude: 17.4377,
    longitude: 78.5192,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Railway Officers Colony']
  },
  {
    station_id: 'hyd_sec_east',
    metro_id: 'hyderabad',
    station_name: 'Secunderabad East',
    latitude: 17.4344,
    longitude: 78.5036,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }, { type: 'atm', available: true }],
    landmarks: ['Secunderabad Railway Station (Gate 1)', 'St. Ann’s High School']
  },
  {
    station_id: 'hyd_parade_ground',
    metro_id: 'hyderabad',
    station_name: 'Parade Ground',
    latitude: 17.4428,
    longitude: 78.4975,
    lines: ['hyd_blue', 'hyd_green'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'washroom', available: true }, { type: 'wheelchair', available: true }],
    landmarks: ['Parade Ground', 'YMCA Secunderabad', 'Gymkhana Grounds']
  },
  {
    station_id: 'hyd_paradise',
    metro_id: 'hyderabad',
    station_name: 'Paradise',
    latitude: 17.4422,
    longitude: 78.4870,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'atm', available: true }],
    landmarks: ['Paradise Biryani Hotel', 'MG Road Secunderabad']
  },
  {
    station_id: 'hyd_rasoolpura',
    metro_id: 'hyderabad',
    station_name: 'Rasoolpura',
    latitude: 17.4440,
    longitude: 78.4770,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Prakash Nagar Police Station', 'Begumpet Airport entrance']
  },
  {
    station_id: 'hyd_prakash_nagar',
    metro_id: 'hyderabad',
    station_name: 'Prakash Nagar',
    latitude: 17.4452,
    longitude: 78.4682,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Begumpet Airport Flyover']
  },
  {
    station_id: 'hyd_begumpet',
    metro_id: 'hyderabad',
    station_name: 'Begumpet',
    latitude: 17.4418,
    longitude: 78.4590,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Begumpet Railway Station', 'Shoppers Stop Begumpet']
  },
  {
    station_id: 'hyd_ameerpet',
    metro_id: 'hyderabad',
    station_name: 'Ameerpet',
    latitude: 17.4363,
    longitude: 78.4444,
    lines: ['hyd_blue', 'hyd_red'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true, notes: 'Dual-level elevators for Red & Blue lines' },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'atm', available: true },
      { type: 'feeder_bus', available: true },
      { type: 'wheelchair', available: true }
    ],
    landmarks: ['Ameerpet Junction', 'Sarathi Studios', 'Coaching Hubs']
  },
  {
    station_id: 'hyd_madhura_nagar',
    metro_id: 'hyderabad',
    station_name: 'Madhura Nagar',
    latitude: 17.4326,
    longitude: 78.4354,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Taruni Madhura Nagar', 'SR Nagar extension']
  },
  {
    station_id: 'hyd_yusufguda',
    metro_id: 'hyderabad',
    station_name: 'Yusufguda',
    latitude: 17.4352,
    longitude: 78.4239,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Yusufguda Police Battalion Grounds', 'Krishna Nagar']
  },
  {
    station_id: 'hyd_road_no_5',
    metro_id: 'hyderabad',
    station_name: 'Jubilee Hills Road No. 5',
    latitude: 17.4356,
    longitude: 78.4116,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Annapurna Studios', 'Jubilee Hills Check Post junction approach']
  },
  {
    station_id: 'hyd_check_post',
    metro_id: 'hyderabad',
    station_name: 'Jubilee Hills Check Post',
    latitude: 17.4298,
    longitude: 78.4068,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['KBR Park Entrance', 'Jubilee Hills Club']
  },
  {
    station_id: 'hyd_peddamma_gudi',
    metro_id: 'hyderabad',
    station_name: 'Peddamma Gudi',
    latitude: 17.4312,
    longitude: 78.3978,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Peddamma Temple', 'Road No. 36 Commercial Center']
  },
  {
    station_id: 'hyd_madhapur',
    metro_id: 'hyderabad',
    station_name: 'Madhapur',
    latitude: 17.4398,
    longitude: 78.3912,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Madhapur Police Station', 'Avasa Hotel', 'Cyber Towers Road']
  },
  {
    station_id: 'hyd_durgam_cheruvu',
    metro_id: 'hyderabad',
    station_name: 'Durgam Cheruvu',
    latitude: 17.4435,
    longitude: 78.3840,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Durgam Cheruvu Cable Bridge', 'Inorbit Mall nearby']
  },
  {
    station_id: 'hyd_hitec_city',
    metro_id: 'hyderabad',
    station_name: 'Hitec City',
    latitude: 17.4475,
    longitude: 78.3762,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'atm', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Cyber Towers', 'L&T Next Galleria Mall Hitec', 'Novotel Hyderabad Convention']
  },
  {
    station_id: 'hyd_raidurg',
    metro_id: 'hyderabad',
    station_name: 'Raidurg',
    latitude: 17.4428,
    longitude: 78.3688,
    lines: ['hyd_blue'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }, { type: 'washroom', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Mindspace IT Park', 'IKEA Hyderabad', 'Knowledge City']
  },

  // Red Line Stations
  {
    station_id: 'hyd_miyapur',
    metro_id: 'hyderabad',
    station_name: 'Miyapur',
    latitude: 17.4965,
    longitude: 78.3602,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Miyapur Bus Depot', 'NH 65']
  },
  {
    station_id: 'hyd_jntu',
    metro_id: 'hyderabad',
    station_name: 'JNTU College',
    latitude: 17.4930,
    longitude: 78.3887,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Jawaharlal Nehru Technological University']
  },
  {
    station_id: 'hyd_kphb',
    metro_id: 'hyderabad',
    station_name: 'KPHB Colony',
    latitude: 17.4878,
    longitude: 78.3982,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'parking', available: true }, { type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Nexus Hyderabad Mall (Forum Sujana)', 'Remedy Hospital']
  },
  {
    station_id: 'hyd_kukatpally',
    metro_id: 'hyderabad',
    station_name: 'Kukatpally',
    latitude: 17.4820,
    longitude: 78.4095,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Kukatpally Y Junction', 'BJP Office']
  },
  {
    station_id: 'hyd_balanagar',
    metro_id: 'hyderabad',
    station_name: 'Balanagar',
    latitude: 17.4725,
    longitude: 78.4230,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['HAL Balanagar', 'Balanagar Crossroads']
  },
  {
    station_id: 'hyd_moosapet',
    metro_id: 'hyderabad',
    station_name: 'Moosapet',
    latitude: 17.4645,
    longitude: 78.4320,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Moosapet Crossroads', 'Pratap Nagar']
  },
  {
    station_id: 'hyd_bharat_nagar',
    metro_id: 'hyderabad',
    station_name: 'Bharat Nagar',
    latitude: 17.4580,
    longitude: 78.4360,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Bharat Nagar MMTS Station nearby', 'Flyover']
  },
  {
    station_id: 'hyd_erragadda',
    metro_id: 'hyderabad',
    station_name: 'Erragadda',
    latitude: 17.4520,
    longitude: 78.4410,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Institute of Mental Health', 'Erragadda Rythu Bazaar']
  },
  {
    station_id: 'hyd_esi_hospital',
    metro_id: 'hyderabad',
    station_name: 'ESI Hospital',
    latitude: 17.4470,
    longitude: 78.4428,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['ESI Hospital Sanathnagar', 'Heritage Foods']
  },
  {
    station_id: 'hyd_sr_nagar',
    metro_id: 'hyderabad',
    station_name: 'SR Nagar',
    latitude: 17.4415,
    longitude: 78.4440,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Sanjeeva Reddy Nagar Post Office', 'Maitrivanam nearby']
  },
  {
    station_id: 'hyd_punjagutta',
    metro_id: 'hyderabad',
    station_name: 'Punjagutta',
    latitude: 17.4285,
    longitude: 78.4502,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Hyderabad Central Mall', 'NIMS Hospital', 'Punjagutta Circle']
  },
  {
    station_id: 'hyd_irrum_manzil',
    metro_id: 'hyderabad',
    station_name: 'Irrum Manzil',
    latitude: 17.4208,
    longitude: 78.4540,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Next Galleria Mall Irrum Manzil', 'Taj Krishna nearby']
  },
  {
    station_id: 'hyd_khairatabad',
    metro_id: 'hyderabad',
    station_name: 'Khairatabad',
    latitude: 17.4118,
    longitude: 78.4595,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Khairatabad Ganesh Junction', 'Institution of Engineers', 'Raj Bhavan Road']
  },
  {
    station_id: 'hyd_lakdikapul',
    metro_id: 'hyderabad',
    station_name: 'Lakdikapul',
    latitude: 17.4042,
    longitude: 78.4650,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Ravindra Bharathi', 'DGP Office Telangana', 'Hotel Dwaraka']
  },
  {
    station_id: 'hyd_assembly',
    metro_id: 'hyderabad',
    station_name: 'Assembly',
    latitude: 17.3970,
    longitude: 78.4690,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Telangana Legislative Assembly', 'Public Gardens', 'State Museum']
  },
  {
    station_id: 'hyd_nampally',
    metro_id: 'hyderabad',
    station_name: 'Nampally',
    latitude: 17.3912,
    longitude: 78.4715,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Hyderabad Deccan Railway Station (Nampally)', 'Exhibition Grounds']
  },
  {
    station_id: 'hyd_gandhi_bhavan',
    metro_id: 'hyderabad',
    station_name: 'Gandhi Bhavan',
    latitude: 17.3855,
    longitude: 78.4735,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Gandhi Bhavan Head Office', 'Mozamjahi Market']
  },
  {
    station_id: 'hyd_omc',
    metro_id: 'hyderabad',
    station_name: 'Osmania Medical College',
    latitude: 17.3812,
    longitude: 78.4795,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Osmania Medical College Hospital', 'Koti Women’s College']
  },
  {
    station_id: 'hyd_mgbs',
    metro_id: 'hyderabad',
    station_name: 'MGBS',
    latitude: 17.3750,
    longitude: 78.4835,
    lines: ['hyd_red', 'hyd_green'],
    interchange: true,
    facilities: [
      { type: 'elevator', available: true },
      { type: 'escalator', available: true },
      { type: 'washroom', available: true },
      { type: 'feeder_bus', available: true, notes: 'Direct skywalk to Mahatma Gandhi Bus Station' }
    ],
    landmarks: ['Mahatma Gandhi Bus Station (Imlibun)', 'Musi River', 'Charminar (2 km)']
  },
  {
    station_id: 'hyd_malakpet',
    metro_id: 'hyderabad',
    station_name: 'Malakpet',
    latitude: 17.3725,
    longitude: 78.4980,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Malakpet Gunj', 'Race Course nearby']
  },
  {
    station_id: 'hyd_new_market',
    metro_id: 'hyderabad',
    station_name: 'New Market',
    latitude: 17.3695,
    longitude: 78.5065,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Chaderghat Market', 'Yashoda Hospital Malakpet']
  },
  {
    station_id: 'hyd_musarambagh',
    metro_id: 'hyderabad',
    station_name: 'Musarambagh',
    latitude: 17.3680,
    longitude: 78.5145,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Musarambagh Bridge', 'Dilsukhnagar approach']
  },
  {
    station_id: 'hyd_dilsukhnagar',
    metro_id: 'hyderabad',
    station_name: 'Dilsukhnagar',
    latitude: 17.3688,
    longitude: 78.5255,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }],
    landmarks: ['Dilsukhnagar Bus Stand', 'Konark Theater']
  },
  {
    station_id: 'hyd_chaitanyapuri',
    metro_id: 'hyderabad',
    station_name: 'Chaitanyapuri',
    latitude: 17.3670,
    longitude: 78.5375,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Omni Hospital', 'Chaitanyapuri Petrol Bunk']
  },
  {
    station_id: 'hyd_victoria_memorial',
    metro_id: 'hyderabad',
    station_name: 'Victoria Memorial',
    latitude: 17.3610,
    longitude: 78.5460,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Victoria Memorial Home', 'Kothapet Fruit Market']
  },
  {
    station_id: 'hyd_lb_nagar',
    metro_id: 'hyderabad',
    station_name: 'LB Nagar',
    latitude: 17.3502,
    longitude: 78.5520,
    lines: ['hyd_red'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'parking', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['LB Nagar Ring Road', 'Vijayawada Highway start']
  },

  // Green Line specific stations
  {
    station_id: 'hyd_jbs_parade_ground',
    metro_id: 'hyderabad',
    station_name: 'JBS Parade Ground',
    latitude: 17.4445,
    longitude: 78.4985,
    lines: ['hyd_green'],
    interchange: true,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }, { type: 'feeder_bus', available: true }],
    landmarks: ['Jubilee Bus Station (JBS)', 'Secunderabad Club']
  },
  {
    station_id: 'hyd_sec_west',
    metro_id: 'hyderabad',
    station_name: 'Secunderabad West',
    latitude: 17.4380,
    longitude: 78.5015,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Secunderabad Railway Station (West Entrance)']
  },
  {
    station_id: 'hyd_gandhi_hospital',
    metro_id: 'hyderabad',
    station_name: 'Gandhi Hospital',
    latitude: 17.4260,
    longitude: 78.5030,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Gandhi Medical College & Hospital']
  },
  {
    station_id: 'hyd_musheerabad',
    metro_id: 'hyderabad',
    station_name: 'Musheerabad',
    latitude: 17.4180,
    longitude: 78.5020,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Musheerabad Jail Memorial', 'RTC Hospital']
  },
  {
    station_id: 'hyd_rtc_x_roads',
    metro_id: 'hyderabad',
    station_name: 'RTC X Roads',
    latitude: 17.4095,
    longitude: 78.4980,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['RTC Cross Roads Theaters (Sudarshan, Sandhya)', 'Bawarchi Restaurant']
  },
  {
    station_id: 'hyd_chikkadpally',
    metro_id: 'hyderabad',
    station_name: 'Chikkadpally',
    latitude: 17.4010,
    longitude: 78.4950,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['City Central Library', 'Venkateshwara Temple']
  },
  {
    station_id: 'hyd_narayanguda',
    metro_id: 'hyderabad',
    station_name: 'Narayanguda',
    latitude: 17.3940,
    longitude: 78.4920,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Blood Bank Narayanguda', 'Deepak Theater']
  },
  {
    station_id: 'hyd_sultan_bazaar',
    metro_id: 'hyderabad',
    station_name: 'Sultan Bazaar',
    latitude: 17.3850,
    longitude: 78.4870,
    lines: ['hyd_green'],
    interchange: false,
    facilities: [{ type: 'elevator', available: true }, { type: 'escalator', available: true }],
    landmarks: ['Koti Sultan Bazaar Market', 'Badruka College']
  }
];

export const hyderabadInterchanges: Interchange[] = [
  {
    station_id: 'hyd_ameerpet',
    line_from: 'hyd_blue',
    line_to: 'hyd_red',
    transfer_time_minutes: 4,
    transfer_instructions: 'Take the internal escalator or central lift down to Platform 1/2 for Red Line (Towards Miyapur or LB Nagar).'
  },
  {
    station_id: 'hyd_ameerpet',
    line_from: 'hyd_red',
    line_to: 'hyd_blue',
    transfer_time_minutes: 4,
    transfer_instructions: 'Take the escalator up to the upper deck Platform 3/4 for Blue Line (Towards Raidurg or Nagole).'
  },
  {
    station_id: 'hyd_parade_ground',
    line_from: 'hyd_blue',
    line_to: 'hyd_green',
    transfer_time_minutes: 5,
    transfer_instructions: 'Walk through the interchange skywalk concourse to JBS Green Line platform.'
  },
  {
    station_id: 'hyd_mgbs',
    line_from: 'hyd_red',
    line_to: 'hyd_green',
    transfer_time_minutes: 5,
    transfer_instructions: 'Head to the lower concourse and follow green signage to Corridor II (JBS direction).'
  }
];

export const hyderabadTicketProviders: TicketProvider[] = [
  {
    provider_id: 'hyd_hmr_whatsapp',
    metro_id: 'hyderabad',
    provider_name: 'Hyderabad Metro WhatsApp Bot',
    provider_type: 'whatsapp',
    booking_url: 'https://wa.me/918341146464?text=Hi%20GoMetro',
    badge: 'Official WhatsApp QR',
    is_official: true,
    description: 'Instant contactless QR ticket directly inside WhatsApp without app installation.'
  },
  {
    provider_id: 'hyd_official_portal',
    metro_id: 'hyderabad',
    provider_name: 'L&T Metro Rail Official Web',
    provider_type: 'official_portal',
    booking_url: 'https://www.ltmetro.com/',
    badge: 'Official Operator',
    is_official: true,
    description: 'Official transit portal for smart card recharge, rules, and metro schedules.'
  },
  {
    provider_id: 'hyd_paytm',
    metro_id: 'hyderabad',
    provider_name: 'Paytm Metro Booking',
    provider_type: 'upi_app',
    booking_url: 'https://paytm.com/metro-card-recharge/hyderabad-metro',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Buy single journey QR tickets or recharge smart cards using UPI.'
  },
  {
    provider_id: 'hyd_phonepe',
    metro_id: 'hyderabad',
    provider_name: 'PhonePe Transit QR',
    provider_type: 'upi_app',
    booking_url: 'https://www.phonepe.com/',
    badge: 'Authorized Partner',
    is_official: false,
    description: 'Purchase instant QR metro tickets directly from PhonePe app.'
  }
];
