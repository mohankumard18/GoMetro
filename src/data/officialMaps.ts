export interface OfficialMapData {
  cityId: string;
  cityName: string;
  authorityName: string;
  authorityShort: string;
  mapTitle: string;
  description: string;
  officialPortalUrl: string;
  pdfDownloadUrl: string;
  totalNetworkLength: string;
  dailyRidership: string;
  operationalCorridors: { name: string; color: string; terminals: string; stationsCount: number }[];
  majorInterchanges: { name: string; connectingLines: string[]; description: string }[];
  emergencyContact: string;
}

export const OFFICIAL_METRO_MAPS: Record<string, OfficialMapData> = {
  hyderabad: {
    cityId: 'hyderabad',
    cityName: 'Hyderabad',
    authorityName: 'Hyderabad Metro Rail Limited (HMRL) & L&T Metro',
    authorityShort: 'HMR / HMRL',
    mapTitle: 'Official Hyderabad Metro Phase 1 Network Map',
    description: 'The world’s largest Public-Private Partnership (PPP) metro transit system, featuring 3 elevated corridors spanning 69 km with state-of-the-art CBTC signaling.',
    officialPortalUrl: 'https://www.ltmetro.com/',
    pdfDownloadUrl: 'https://www.ltmetro.com/our-network/',
    totalNetworkLength: '69.2 km (Phase 1 Operational)',
    dailyRidership: '520,000+ commuters',
    emergencyContact: '040-2333 2555 / 14433',
    operationalCorridors: [
      { name: 'Corridor I (Red Line)', color: '#ED1C24', terminals: 'Miyapur ⇄ LB Nagar', stationsCount: 27 },
      { name: 'Corridor II (Green Line)', color: '#00A651', terminals: 'JBS Parade Ground ⇄ MGBS', stationsCount: 9 },
      { name: 'Corridor III (Blue Line)', color: '#0072CE', terminals: 'Nagole ⇄ Raidurg (Hitec City)', stationsCount: 23 }
    ],
    majorInterchanges: [
      { name: 'Ameerpet Super-Hub', connectingLines: ['Red Line', 'Blue Line'], description: 'Multi-level elevated interchange connecting North-South and East-West corridors.' },
      { name: 'MGBS (Mahatma Gandhi Bus Station)', connectingLines: ['Red Line', 'Green Line'], description: 'Seamless integrated connectivity to Telangana & AP intercity bus terminal.' },
      { name: 'Parade Ground / JBS', connectingLines: ['Blue Line', 'Green Line'], description: 'Pedestrian skywalk connection linking Secunderabad twin-city corridors.' }
    ]
  },
  bangalore: {
    cityId: 'bangalore',
    cityName: 'Bengaluru',
    authorityName: 'Bangalore Metro Rail Corporation Limited',
    authorityShort: 'BMRCL (Namma Metro)',
    mapTitle: 'Official Namma Metro Phase 1 & 2 Network Route Map',
    description: 'Bengaluru’s pride transit lifeline connecting Whitefield tech hub to Challaghatta, and North Bengaluru to South Bengaluru with deep underground and elevated sections.',
    officialPortalUrl: 'https://english.bmrc.co.in/',
    pdfDownloadUrl: 'https://english.bmrc.co.in/',
    totalNetworkLength: '73.8 km operational (2nd longest in India)',
    dailyRidership: '750,000+ commuters',
    emergencyContact: '1800-425-12345 / 080-2519 1091',
    operationalCorridors: [
      { name: 'Purple Line (East-West)', color: '#7B1FA2', terminals: 'Whitefield (Kadugodi) ⇄ Challaghatta', stationsCount: 37 },
      { name: 'Green Line (North-South)', color: '#00843D', terminals: 'Madavara / Nagasandra ⇄ Silk Institute', stationsCount: 32 }
    ],
    majorInterchanges: [
      { name: 'Nadaprabhu Kempegowda Stn (Majestic)', connectingLines: ['Purple Line', 'Green Line'], description: 'India’s largest underground metro hub linking KSR Bengaluru Railway Station & KSRTC / BMTC bus terminals.' },
      { name: 'Yeshwanthpur', connectingLines: ['Green Line', 'Indian Railways'], description: 'Direct integrated FOB to Yeshwanthpur Junction Railway Station.' },
      { name: 'KR Puram / Baiyappanahalli', connectingLines: ['Purple Line', 'Future Blue Line (Airport)'], description: 'East Bengaluru multimodal transit nexus.' }
    ]
  },
  mumbai: {
    cityId: 'mumbai',
    cityName: 'Mumbai',
    authorityName: 'Mumbai Metropolitan Region Development Authority & MMMOCL',
    authorityShort: 'MMRDA / Maha Mumbai Metro',
    mapTitle: 'Official Maha Mumbai Metro Master System Map',
    description: 'Rapid transit transformation across Maximum City integrating Line 1 (Versova-Ghatkopar), Line 2A (Yellow), Line 7 (Red), and underground Line 3 (Aqua Line).',
    officialPortalUrl: 'https://www.mmmocl.co.in/',
    pdfDownloadUrl: 'https://www.mmmocl.co.in/',
    totalNetworkLength: '58.5+ km operational (337 km planned master network)',
    dailyRidership: '600,000+ commuters',
    emergencyContact: '022-2684 0404 / 1800-889-0505',
    operationalCorridors: [
      { name: 'Line 1 (Blue Line)', color: '#005BAB', terminals: 'Versova ⇄ Andheri ⇄ Ghatkopar', stationsCount: 12 },
      { name: 'Line 2A (Yellow Line)', color: '#F4B400', terminals: 'Dahisar East ⇄ Andheri West (DN Nagar)', stationsCount: 17 },
      { name: 'Line 7 (Red Line)', color: '#E53935', terminals: 'Dahisar East ⇄ Gundavali (WEH)', stationsCount: 14 }
    ],
    majorInterchanges: [
      { name: 'DN Nagar / Andheri West', connectingLines: ['Line 1 (Blue)', 'Line 2A (Yellow)'], description: 'Elevated skybridge interchange connecting Versova-Ghatkopar to Western suburbs.' },
      { name: 'Gundavali / Western Express Highway', connectingLines: ['Line 1 (Blue)', 'Line 7 (Red)'], description: 'Seamless 200m dedicated pedestrian skywalk with travelators.' },
      { name: 'Ghatkopar', connectingLines: ['Line 1 (Blue)', 'Central Railway Suburban'], description: 'High-density commuter interchange to Mumbai suburban local trains.' },
      { name: 'Dahisar East', connectingLines: ['Line 2A (Yellow)', 'Line 7 (Red)'], description: 'Northern junction connecting Link Road and Western Express Highway metro corridors.' }
    ]
  },
  delhi: {
    cityId: 'delhi',
    cityName: 'Delhi NCR',
    authorityName: 'Delhi Metro Rail Corporation',
    authorityShort: 'DMRC',
    mapTitle: 'Official Delhi Metro Rail Corporation (DMRC) Network Map',
    description: 'The golden standard of Indian urban transit spanning Delhi, Noida, Gurugram, Faridabad, Ghaziabad, and Bahadurgarh across 12 distinct corridors and 392+ km.',
    officialPortalUrl: 'https://www.delhimetrorail.com/',
    pdfDownloadUrl: 'https://www.delhimetrorail.com/network_map',
    totalNetworkLength: '392.4 km (350+ Stations across NCR)',
    dailyRidership: '6,200,000+ commuters',
    emergencyContact: '155370 / 011-2341 7910',
    operationalCorridors: [
      { name: 'Yellow Line (Line 2)', color: '#E6A100', terminals: 'Samaypur Badli ⇄ Millennium City Centre Gurugram', stationsCount: 37 },
      { name: 'Blue Line (Line 3/4)', color: '#0055A5', terminals: 'Dwarka Sector 21 ⇄ Noida Electronic City / Vaishali', stationsCount: 50 },
      { name: 'Airport Express (Orange Line)', color: '#FF6F00', terminals: 'New Delhi ⇄ IGI Airport T3 ⇄ Yashobhoomi', stationsCount: 7 }
    ],
    majorInterchanges: [
      { name: 'Rajiv Chowk (Connaught Place)', connectingLines: ['Yellow Line', 'Blue Line'], description: 'The busiest transit nexus in Delhi NCR beneath historical Connaught Place.' },
      { name: 'Kashmere Gate', connectingLines: ['Red Line', 'Yellow Line', 'Violet Line'], description: 'India’s only 3-line interchange hub integrating with ISBT Kashmere Gate.' },
      { name: 'New Delhi Station', connectingLines: ['Yellow Line', 'Airport Express', 'Indian Railways'], description: 'Direct 19-minute high-speed connection from New Delhi Railway Station to IGI Airport.' }
    ]
  },
  chennai: {
    cityId: 'chennai',
    cityName: 'Chennai',
    authorityName: 'Chennai Metro Rail Limited',
    authorityShort: 'CMRL',
    mapTitle: 'Official Chennai Metro Rail Phase 1 & Extension Network Map',
    description: 'Providing air-conditioned rapid transit linking North Chennai, Chennai Central, Puratchi Thalaivar Dr. M.G. Ramachandran Central, Koyambedu CMBT, and Chennai International Airport.',
    officialPortalUrl: 'https://chennaimetrorail.org/',
    pdfDownloadUrl: 'https://chennaimetrorail.org/route-map/',
    totalNetworkLength: '54.1 km operational (Phase 2 116 km underway)',
    dailyRidership: '280,000+ commuters',
    emergencyContact: '1860-425-1515 / 044-2437 7777',
    operationalCorridors: [
      { name: 'Blue Line (Corridor 1)', color: '#0072CE', terminals: 'Wimco Nagar Depot ⇄ Chennai International Airport', stationsCount: 26 },
      { name: 'Green Line (Corridor 2)', color: '#00843D', terminals: 'Puratchi Thalaivar Dr. MGR Central ⇄ St. Thomas Mount', stationsCount: 17 }
    ],
    majorInterchanges: [
      { name: 'Puratchi Thalaivar Dr. MGR Central', connectingLines: ['Blue Line', 'Green Line', 'Southern Railway'], description: 'Underground junction linking Chennai Central & Suburban railway terminals.' },
      { name: 'Alandur', connectingLines: ['Blue Line', 'Green Line'], description: 'Elevated two-level multi-directional interchange station.' },
      { name: 'Chennai International Airport', connectingLines: ['Blue Line', 'Airport Terminals T1/T2/T4'], description: 'Direct air-conditioned skywalk access to domestic and international departure gates.' }
    ]
  },
  kochi: {
    cityId: 'kochi',
    cityName: 'Kochi',
    authorityName: 'Kochi Metro Rail Limited',
    authorityShort: 'KMRL',
    mapTitle: 'Official Kochi Metro & Water Metro Integrated Transit Map',
    description: 'India’s most scenic modern transit system featuring 25 rapid rail stations and Asia’s first integrated battery-powered electric Water Metro boat network.',
    officialPortalUrl: 'https://kochimetro.org/',
    pdfDownloadUrl: 'https://kochimetro.org/',
    totalNetworkLength: '28.1 km rail + 76 km Water Metro routes',
    dailyRidership: '100,000+ commuters',
    emergencyContact: '1800-425-0355 / 0484-284 6700',
    operationalCorridors: [
      { name: 'Line 1 (Cyan Corridor)', color: '#00A8B5', terminals: 'Aluva ⇄ MG Road ⇄ Vyttila ⇄ SN Junction', stationsCount: 25 }
    ],
    majorInterchanges: [
      { name: 'Vyttila Mobility Hub', connectingLines: ['Kochi Metro Rail', 'Kochi Water Metro', 'KSRTC Intercity Buses'], description: 'India’s pioneer integrated intermodal transit hub uniting rail, road, and water boats.' },
      { name: 'Edapally', connectingLines: ['Kochi Metro', 'LuLu International Shopping Mall'], description: 'Direct pedestrian skybridge right into LuLu Mall entrance.' },
      { name: 'Aluva Terminal', connectingLines: ['Kochi Metro', 'Periyar Riverfront & Airport Feeder'], description: 'Northern gateway with non-stop electric AC feeder buses to Cochin International Airport (CIAL).' }
    ]
  }
};
