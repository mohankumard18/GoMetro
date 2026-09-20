import { CityMetroData, CITY_DATA_MAP } from '../data';
import { RouteEngine } from './routeEngine';
import { RoutePlan, ActiveJourney } from '../types/metro';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'plan_route' | 'start_journey' | 'open_tickets' | 'view_map';
    originId?: string;
    destId?: string;
    label: string;
  };
  structuredRoute?: RoutePlan | null;
}

export class GoMetroAIAssistant {
  private currentCityData: CityMetroData;
  private routeEngine: RouteEngine;
  private activeJourney: ActiveJourney | null = null;
  private apiKey: string = '';

  constructor(cityData: CityMetroData, activeJourney: ActiveJourney | null = null) {
    this.currentCityData = cityData;
    this.routeEngine = new RouteEngine(cityData);
    this.activeJourney = activeJourney;
  }

  public updateCity(cityData: CityMetroData) {
    this.currentCityData = cityData;
    this.routeEngine = new RouteEngine(cityData);
  }

  public updateActiveJourney(journey: ActiveJourney | null) {
    this.activeJourney = journey;
  }

  public setApiKey(key: string) {
    this.apiKey = key.trim();
  }

  public async processUserMessage(userQuery: string): Promise<ChatMessage> {
    const queryLower = userQuery.toLowerCase().trim();

    // If API key is provided, we can attempt Gemini API call with grounding
    if (this.apiKey) {
      try {
        const geminiResponse = await this.callGeminiApi(userQuery);
        if (geminiResponse) return geminiResponse;
      } catch (e) {
        console.warn('Gemini API call fallback:', e);
      }
    }

    // Default: Grounded Local Transit NLP & Deterministic Engine
    return this.processGroundedNLP(queryLower, userQuery);
  }

  private processGroundedNLP(queryLower: string, rawQuery: string): ChatMessage {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Check if user is asking during an active journey
    if (this.activeJourney) {
      const remainingStops = Math.max(
        0,
        this.activeJourney.route.all_stations_in_order.length - 1 - this.activeJourney.current_station_index
      );
      const currentSt = this.activeJourney.route.all_stations_in_order[this.activeJourney.current_station_index];
      const destSt = this.activeJourney.route.destination_station;

      // Question: How many stops left?
      if (queryLower.includes('how many stops') || queryLower.includes('stops left') || queryLower.includes('remaining stops')) {
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: `You have **${remainingStops} stops remaining** until **${destSt.station_name}**. Currently passing through **${currentSt.station_name}**. GoMetro will proactively ring your phone when you are **2 stations away**!`,
          timestamp: now
        };
      }

      // Question: Where do I change / interchange?
      if (queryLower.includes('where do i change') || queryLower.includes('interchange') || queryLower.includes('line change')) {
        const transferSegment = this.activeJourney.route.segments.find(s => s.type === 'transfer');
        if (transferSegment && transferSegment.from_station) {
          return {
            id: 'msg_' + Date.now(),
            sender: 'assistant',
            text: `🔄 **Interchange required at ${transferSegment.from_station.station_name}**.\n\n${transferSegment.instructions}\n\nDon't worry, GoMetro will alert you right before the train arrives at ${transferSegment.from_station.station_name}!`,
            timestamp: now
          };
        } else {
          return {
            id: 'msg_' + Date.now(),
            sender: 'assistant',
            text: `✅ **Direct Route — No Line Change Needed!**\n\nYour planned journey stays on the same metro line straight to **${destSt.station_name}**. Stay seated and relax.`,
            timestamp: now
          };
        }
      }

      // Question: Am I on the correct train?
      if (queryLower.includes('correct train') || queryLower.includes('right train') || queryLower.includes('wrong direction')) {
        const metroSeg = this.activeJourney.route.segments.find(s => s.type === 'metro');
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: `🚇 **Checking your train:**\n\nYour route is on the **${metroSeg?.line?.line_name || 'Metro Line'}** ${metroSeg?.target_direction || ''}.\n\nNext planned stop on your journey is: **${this.activeJourney.route.all_stations_in_order[this.activeJourney.current_station_index + 1]?.station_name || destSt.station_name}**. If the train announcement matches this, you are on the right train!`,
          timestamp: now
        };
      }

      // Question: I missed my stop
      if (queryLower.includes('missed my stop') || queryLower.includes('missed the station') || queryLower.includes('overshot')) {
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: `⚠️ **Don't panic! Here's how to recover:**\n\n1. Get down at the next immediate station.\n2. Do NOT exit the ticket gates (so you don't pay double).\n3. Take the overbridge / stairs to the opposite platform heading towards **${destSt.station_name}**.\n4. Board the returning train. GoMetro will keep alert notifications active for your stop!`,
          timestamp: now
        };
      }
    }

    // 2. City detection / Switch city
    for (const [key, data] of Object.entries(CITY_DATA_MAP)) {
      if (queryLower.includes(data.city.city_name.toLowerCase()) && key !== this.currentCityData.city.city_id) {
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: `I noticed you're asking about **${data.city.city_name} Metro (${data.city.metro_name})**. You can switch the active city selector at the top header to ${data.city.city_name} to access its complete interactive network, stations, and route engine!`,
          timestamp: now
        };
      }
    }

    // 3. Station facility queries (Elevator, Escalator, Parking)
    const matchedStation = this.findStationInQuery(queryLower);
    if (matchedStation) {
      if (queryLower.includes('elevator') || queryLower.includes('lift') || queryLower.includes('escalator') || queryLower.includes('wheelchair')) {
        const hasElevator = matchedStation.facilities.some(f => (f.type === 'elevator' || f.type === 'wheelchair') && f.available);
        const hasEscalator = matchedStation.facilities.some(f => f.type === 'escalator' && f.available);
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: `ℹ️ **Accessibility at ${matchedStation.station_name}:**\n\n- 🛗 **Elevators/Lifts:** ${hasElevator ? '✅ Available across all concourse & platform levels' : '⚠️ Limited accessibility'}\n- 🪜 **Escalators:** ${hasEscalator ? '✅ Active between street, concourse & platforms' : 'Not listed'}\n- ♿ **Wheelchair Access:** Available with assistance from station duty staff.`,
          timestamp: now
        };
      }

      if (queryLower.includes('parking') || queryLower.includes('bike') || queryLower.includes('car')) {
        const hasParking = matchedStation.facilities.some(f => f.type === 'parking' && f.available);
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: `🅿️ **Parking at ${matchedStation.station_name}:**\n\n${hasParking ? '✅ Official 2-wheeler and 4-wheeler paid parking facility is available.' : '⚠️ No designated multi-level metro parking at this station. Feeder transport or street bays recommended.'}`,
          timestamp: now
        };
      }
    }

    // 4. Route Planning intent ("From X to Y", "Take me to X from Y", "How to reach Y")
    const routeMatch = this.extractOriginAndDest(rawQuery);
    if (routeMatch) {
      const plan = this.routeEngine.findRoute(routeMatch.origin.station_id, routeMatch.dest.station_id);
      if (plan) {
        const linesUsed = [...new Set(plan.segments.filter(s => s.type === 'metro').map(s => s.line?.line_name))].join(', ');
        const transfers = plan.transfers_count;

        let explanation = `🚇 **Here is your optimal journey in ${this.currentCityData.city.city_name}:**\n\n`;
        explanation += `• **From:** ${plan.origin_station.station_name}\n`;
        explanation += `• **To:** ${plan.destination_station.station_name}\n`;
        explanation += `• **Duration:** ~${plan.total_duration_minutes} mins (${plan.total_metro_stops} metro stops)\n`;
        explanation += `• **Line:** ${linesUsed}\n`;
        explanation += `• **Transfers:** ${transfers === 0 ? 'Direct ride (0 transfers)' : `${transfers} line change required`}\n`;
        explanation += `• **Estimated Fare:** ₹${plan.fare_inr}\n\n`;

        explanation += `**Commuter Guidance:**\n`;
        for (const seg of plan.segments) {
          if (seg.type === 'walk_origin') explanation += `1. 🚶 ${seg.instructions}\n`;
          if (seg.type === 'metro') explanation += `2. 🚇 ${seg.instructions}\n`;
          if (seg.type === 'transfer') explanation += `3. 🔄 ${seg.instructions}\n`;
          if (seg.type === 'walk_destination') explanation += `4. 🎯 ${seg.instructions}\n`;
        }

        explanation += `\n*Tap 'Start Journey' below and GoMetro will trigger your signature alert 2 stations before your stop!*`;

        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: explanation,
          timestamp: now,
          structuredRoute: plan,
          suggestedAction: {
            type: 'start_journey',
            originId: plan.origin_station.station_id,
            destId: plan.destination_station.station_id,
            label: `Start Journey: ${plan.origin_station.station_name} → ${plan.destination_station.station_name}`
          }
        };
      }
    }

    // 5. Operating hours & General Info
    if (queryLower.includes('timings') || queryLower.includes('time') || queryLower.includes('first train') || queryLower.includes('last train') || queryLower.includes('hours')) {
      return {
        id: 'msg_' + Date.now(),
        sender: 'assistant',
        text: `⏰ **Operating Hours for ${this.currentCityData.city.metro_name}:**\n\n• **First Train:** 06:00 AM (Monday – Saturday), 07:00 AM (Sunday)\n• **Last Train:** 11:00 PM from terminal stations\n• **Peak Frequency:** Every 3.5 to 5 minutes\n• **Non-peak Frequency:** Every 7 to 8 minutes`,
        timestamp: now
      };
    }

    // 6. Tickets inquiry
    if (queryLower.includes('ticket') || queryLower.includes('fare') || queryLower.includes('buy') || queryLower.includes('recharge') || queryLower.includes('qr')) {
      return {
        id: 'msg_' + Date.now(),
        sender: 'assistant',
        text: `🎫 **Authorized Ticketing in ${this.currentCityData.city.city_name}:**\n\nGoMetro is a travel companion platform and does not issue tickets directly. You can purchase official QR tickets via:\n\n1. **Official WhatsApp QR Booking** (Instant on your phone)\n2. **Official Metro Rail Portal / App**\n3. **UPI Partner Apps (Paytm / PhonePe)**\n\nTap below to compare authorized provider links!`,
        timestamp: now,
        suggestedAction: {
          type: 'open_tickets',
          label: 'View Official Ticket Channels'
        }
      };
    }

    // Default welcoming response
    return {
      id: 'msg_' + Date.now(),
      sender: 'assistant',
      text: `Hello! I am your **GoMetro AI Assistant** for ${this.currentCityData.city.city_name}. 🚇🤖\n\nI can help you with:\n• Planning optimal journeys (e.g. *"I'm new here. How do I reach Raidurg from Ameerpet?"*)\n• Station facilities & elevator locations (e.g. *"Does Ameerpet have an elevator?"*)\n• Guiding line interchanges and number of remaining stops.\n• Ensuring you never miss your stop with our signature **2 stations away** alert!\n\nWhere would you like to travel today?`,
      timestamp: now
    };
  }

  private findStationInQuery(queryLower: string) {
    return this.currentCityData.stations.find(st => {
      const name = st.station_name.toLowerCase();
      // Match full or partial station name
      return queryLower.includes(name) || (name.length > 5 && queryLower.includes(name.split(' ')[0]));
    });
  }

  private extractOriginAndDest(rawQuery: string): { origin: import('../types/metro').Station; dest: import('../types/metro').Station } | null {
    const q = rawQuery.toLowerCase();
    const stations = this.currentCityData.stations;

    let originSt: import('../types/metro').Station | null = null;
    let destSt: import('../types/metro').Station | null = null;

    // Check patterns like "from X to Y", "X to Y", "reach Y from X"
    if (q.includes('from ') && q.includes(' to ')) {
      const fromPart = q.split('from ')[1].split(' to ')[0];
      const toPart = q.split(' to ')[1];
      originSt = stations.find(s => fromPart.includes(s.station_name.toLowerCase())) || null;
      destSt = stations.find(s => toPart.includes(s.station_name.toLowerCase())) || null;
    } else if (q.includes('reach ') && q.includes(' from ')) {
      const destPart = q.split('reach ')[1].split(' from ')[0];
      const originPart = q.split(' from ')[1];
      destSt = stations.find(s => destPart.includes(s.station_name.toLowerCase())) || null;
      originSt = stations.find(s => originPart.includes(s.station_name.toLowerCase())) || null;
    } else {
      // Find any 2 station mentions
      const matched = stations.filter(s => q.includes(s.station_name.toLowerCase()));
      if (matched.length >= 2) {
        originSt = matched[0];
        destSt = matched[1];
      }
    }

    if (originSt && destSt && originSt.station_id !== destSt.station_id) {
      return { origin: originSt, dest: destSt };
    }
    return null;
  }

  private async callGeminiApi(userQuery: string): Promise<ChatMessage | null> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are GoMetro AI, an intelligent metro transit companion for ${this.currentCityData.city.city_name}.
Current verified metro knowledge:
${this.currentCityData.knowledge.join('\n')}
Available stations: ${this.currentCityData.stations.map(s => s.station_name).join(', ')}.

USER QUESTION: ${userQuery}

Provide a concise, helpful, polite response grounded in the provided metro facts. Emphasize GoMetro's signature feature: alert notifications 2 stations before the destination.`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) return null;
    const json = await response.json();
    const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) return null;

    return {
      id: 'msg_' + Date.now(),
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}
