import { City, MetroLine, Station, Interchange, TicketProvider } from '../types/metro';
import { hyderabadCity, hyderabadLines, hyderabadStations, hyderabadInterchanges, hyderabadTicketProviders } from './cities/hyderabad';
import { bangaloreCity, bangaloreLines, bangaloreStations, bangaloreInterchanges, bangaloreTicketProviders } from './cities/bangalore';
import { mumbaiCity, mumbaiLines, mumbaiStations, mumbaiInterchanges, mumbaiTicketProviders } from './cities/mumbai';
import { chennaiCity, chennaiLines, chennaiStations, chennaiInterchanges, chennaiTicketProviders } from './cities/chennai';
import { delhiCity, delhiLines, delhiStations, delhiInterchanges, delhiTicketProviders } from './cities/delhi';
import { kochiCity, kochiLines, kochiStations, kochiInterchanges, kochiTicketProviders } from './cities/kochi';

export interface CityMetroData {
  city: City;
  lines: MetroLine[];
  stations: Station[];
  interchanges: Interchange[];
  ticketProviders: TicketProvider[];
  knowledge: string[];
}

export const CITIES: City[] = [
  hyderabadCity,
  bangaloreCity,
  delhiCity,
  mumbaiCity,
  chennaiCity,
  kochiCity
];

export const CITY_DATA_MAP: Record<string, CityMetroData> = {
  hyderabad: {
    city: hyderabadCity,
    lines: hyderabadLines,
    stations: hyderabadStations,
    interchanges: hyderabadInterchanges,
    ticketProviders: hyderabadTicketProviders,
    knowledge: [
      "Hyderabad Metro Rail (HMR) operates 3 major corridors: Red Line (Miyapur to LB Nagar), Blue Line (Nagole to Raidurg), and Green Line (JBS Parade Ground to MGBS).",
      "Major interchange stations in Hyderabad are Ameerpet (Red Line & Blue Line), MGBS (Red Line & Green Line), and Parade Ground (Blue Line & Green Line).",
      "Metro operating hours are typically 06:00 AM to 11:00 PM every day.",
      "The signature Ameerpet interchange is a two-level elevated station where passengers can switch between Miyapur/LB Nagar and Nagole/Raidurg without exiting ticket gates.",
      "All stations are equipped with elevators, escalators, tactile paths for the visually impaired, and automated fare collection gates.",
      "Ticketing: QR tickets can be booked via official WhatsApp (8341146464), Paytm, PhonePe, and smart cards."
    ]
  },
  bangalore: {
    city: bangaloreCity,
    lines: bangaloreLines,
    stations: bangaloreStations,
    interchanges: bangaloreInterchanges,
    ticketProviders: bangaloreTicketProviders,
    knowledge: [
      "Namma Metro currently operates the Purple Line (Whitefield Kadugodi to Challaghatta) and the Green Line (Nagasandra to Silk Institute).",
      "The central interchange is Nadaprabhu Kempegowda Station (Majestic), connecting Purple and Green lines.",
      "Majestic station has direct underground and skywalk connections to KSR Bengaluru City Railway Station and BMTC/KSRTC bus stands.",
      "BMRCL offers a 5% discount on QR tickets purchased via WhatsApp or official channels.",
      "Operating hours are 05:00 AM to 11:00 PM on weekdays and 07:00 AM on Sundays."
    ]
  },
  mumbai: {
    city: mumbaiCity,
    lines: mumbaiLines,
    stations: mumbaiStations,
    interchanges: mumbaiInterchanges,
    ticketProviders: mumbaiTicketProviders,
    knowledge: [
      "Mumbai Metro Line 1 connects Versova to Ghatkopar via Andheri, providing east-west suburban connectivity.",
      "Key interchange points include Andheri (Western Suburban Railway), Ghatkopar (Central Suburban Railway), D.N. Nagar (Line 2A), and Western Express Highway (connecting via footbridge to Line 7 Gundavali).",
      "WhatsApp QR ticketing is available at +91 9670008889 for quick access.",
      "Line 2A and Line 7 run parallel to Link Road and Western Express Highway respectively in the northern suburbs."
    ]
  },
  chennai: {
    city: chennaiCity,
    lines: chennaiLines,
    stations: chennaiStations,
    interchanges: chennaiInterchanges,
    ticketProviders: chennaiTicketProviders,
    knowledge: [
      "Chennai Metro (CMRL) operates the Blue Line (Wimco Nagar to Airport) and Green Line (Chennai Central to St. Thomas Mount).",
      "Major interchanges are Puratchi Thalaivar Dr. M.G.R Central (Chennai Central) and Arignar Anna Alandur.",
      "The Airport station is directly linked to Chennai International Airport terminals.",
      "CMRL offers 20% discounts on WhatsApp and QR ticket bookings.",
      "Operating hours are from 05:00 AM to 11:00 PM."
    ]
  },
  delhi: {
    city: delhiCity,
    lines: delhiLines,
    stations: delhiStations,
    interchanges: delhiInterchanges,
    ticketProviders: delhiTicketProviders,
    knowledge: [
      "Delhi Metro (DMRC) is India's largest metro network. Key arterial lines include the Yellow Line (Samaypur Badli to Millennium City Centre Gurugram) and Blue Line (Dwarka to Noida Electronic City).",
      "The Airport Express (Orange Line) connects New Delhi Railway Station directly to IGI Airport Terminal 3 in just 19 minutes.",
      "Rajiv Chowk (Connaught Place) is the busiest interchange between Yellow and Blue lines.",
      "Kashmere Gate connects Yellow, Red, and Violet lines.",
      "DMRC WhatsApp QR ticketing is accessible at +91 9650855800."
    ]
  },
  kochi: {
    city: kochiCity,
    lines: kochiLines,
    stations: kochiStations,
    interchanges: kochiInterchanges,
    ticketProviders: kochiTicketProviders,
    knowledge: [
      "Kochi Metro (KMRL) runs 25 stations along the arterial Aluva to Tripunithura Terminal corridor.",
      "Vyttila Mobility Hub connects Kochi Metro with long-distance KSRTC buses and the innovative Kochi Water Metro network.",
      "Edapally station features a direct air-conditioned skywalk into LuLu Mall Kochi.",
      "WhatsApp QR tickets can be booked at +91 9188459459.",
      "Kochi Metro is known for being powered largely by solar energy and operated with high eco-standards."
    ]
  }
};

export function getCityData(cityId: string): CityMetroData {
  return CITY_DATA_MAP[cityId] || CITY_DATA_MAP['hyderabad'];
}
