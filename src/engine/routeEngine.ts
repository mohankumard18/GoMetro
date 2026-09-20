import { Station, MetroLine, Interchange, RoutePlan, RouteSegment } from '../types/metro';
import { CityMetroData } from '../data';

interface GraphEdge {
  toStationId: string;
  lineId: string;
  travelTimeMinutes: number;
}

interface DijkstraNode {
  stationId: string;
  currentLineId: string | null;
  cost: number;
  timeMinutes: number;
  stopsCount: number;
  transfersCount: number;
  path: { stationId: string; lineId: string }[];
}

export class RouteEngine {
  private cityData: CityMetroData;
  private adjacencyList: Map<string, GraphEdge[]>;
  private stationMap: Map<string, Station>;
  private lineMap: Map<string, MetroLine>;
  private interchangeMap: Map<string, Interchange[]>;

  constructor(cityData: CityMetroData) {
    this.cityData = cityData;
    this.adjacencyList = new Map();
    this.stationMap = new Map();
    this.lineMap = new Map();
    this.interchangeMap = new Map();
    this.buildGraph();
  }

  private buildGraph() {
    // Populate maps
    for (const station of this.cityData.stations) {
      this.stationMap.set(station.station_id, station);
      this.adjacencyList.set(station.station_id, []);
    }

    for (const line of this.cityData.lines) {
      this.lineMap.set(line.line_id, line);
      const stIds = line.stations;
      for (let i = 0; i < stIds.length - 1; i++) {
        const u = stIds[i];
        const v = stIds[i + 1];
        const travelTime = 2.2; // average ~2.2 minutes between consecutive stations

        this.adjacencyList.get(u)?.push({
          toStationId: v,
          lineId: line.line_id,
          travelTimeMinutes: travelTime
        });

        this.adjacencyList.get(v)?.push({
          toStationId: u,
          lineId: line.line_id,
          travelTimeMinutes: travelTime
        });
      }
    }

    for (const interchange of this.cityData.interchanges) {
      const existing = this.interchangeMap.get(interchange.station_id) || [];
      existing.push(interchange);
      this.interchangeMap.set(interchange.station_id, existing);
    }
  }

  public findRoute(originStationId: string, destStationId: string): RoutePlan | null {
    if (originStationId === destStationId) {
      const station = this.stationMap.get(originStationId);
      if (!station) return null;
      return {
        origin_station: station,
        destination_station: station,
        walking_to_origin_minutes: 0,
        walking_from_dest_minutes: 0,
        total_duration_minutes: 0,
        total_metro_stops: 0,
        transfers_count: 0,
        fare_inr: 0,
        segments: [],
        all_stations_in_order: [station],
        summary: 'Origin and destination are the same station.'
      };
    }

    const originStation = this.stationMap.get(originStationId);
    const destStation = this.stationMap.get(destStationId);
    if (!originStation || !destStation) return null;

    // Dijkstra Priority Queue Simulation
    // Edge weight cost = travelTime + (lineChange ? transferPenalty : 0)
    const TRANSFER_PENALTY = 6; // minutes penalty to discourage excessive transfers

    const visited = new Map<string, number>(); // key: `${stationId}_${lineId}`, value: minCost
    const queue: DijkstraNode[] = [
      {
        stationId: originStationId,
        currentLineId: null,
        cost: 0,
        timeMinutes: 0,
        stopsCount: 0,
        transfersCount: 0,
        path: [{ stationId: originStationId, lineId: '' }]
      }
    ];

    let bestSolution: DijkstraNode | null = null;

    while (queue.length > 0) {
      // Sort to get node with smallest cost (Priority Queue)
      queue.sort((a, b) => a.cost - b.cost);
      const current = queue.shift()!;

      if (current.stationId === destStationId) {
        bestSolution = current;
        break; // Found optimal shortest path
      }

      const stateKey = `${current.stationId}_${current.currentLineId || 'NONE'}`;
      if (visited.has(stateKey) && visited.get(stateKey)! <= current.cost) {
        continue;
      }
      visited.set(stateKey, current.cost);

      const neighbors = this.adjacencyList.get(current.stationId) || [];
      for (const edge of neighbors) {
        const isTransfer = current.currentLineId !== null && current.currentLineId !== edge.lineId;
        const transferCost = isTransfer ? TRANSFER_PENALTY : 0;
        const newTime = current.timeMinutes + edge.travelTimeMinutes + transferCost;
        const newCost = current.cost + edge.travelTimeMinutes + transferCost;
        const newTransfers = current.transfersCount + (isTransfer ? 1 : 0);

        const nextPath = [...current.path, { stationId: edge.toStationId, lineId: edge.lineId }];

        queue.push({
          stationId: edge.toStationId,
          currentLineId: edge.lineId,
          cost: newCost,
          timeMinutes: newTime,
          stopsCount: current.stopsCount + 1,
          transfersCount: newTransfers,
          path: nextPath
        });
      }
    }

    if (!bestSolution) return null;

    return this.constructRoutePlan(originStation, destStation, bestSolution);
  }

  private constructRoutePlan(
    originStation: Station,
    destStation: Station,
    solution: DijkstraNode
  ): RoutePlan {
    const allStationsInOrder: Station[] = [];
    const segments: RouteSegment[] = [];

    // First segment: Walk to origin station
    const walkToOriginMins = 5;
    segments.push({
      type: 'walk_origin',
      from_station: originStation,
      to_station: originStation,
      duration_minutes: walkToOriginMins,
      instructions: `Walk ~5 min to ${originStation.station_name} Metro Station entrance. Follow signs to security and ticketing.`
    });

    // Group path into contiguous line segments
    // solution.path has entries: [{stationId: origin, lineId: ''}, {stationId: st1, lineId: L1}, ...]
    let currentLineId = '';
    let currentSegmentStations: Station[] = [originStation];
    allStationsInOrder.push(originStation);

    for (let i = 1; i < solution.path.length; i++) {
      const step = solution.path[i];
      const station = this.stationMap.get(step.stationId)!;
      allStationsInOrder.push(station);

      if (i === 1) {
        currentLineId = step.lineId;
        currentSegmentStations.push(station);
      } else if (step.lineId === currentLineId) {
        currentSegmentStations.push(station);
      } else {
        // Line change! Finish previous segment
        const prevLine = this.lineMap.get(currentLineId)!;
        const fromSt = currentSegmentStations[0];
        const toSt = currentSegmentStations[currentSegmentStations.length - 1];
        const direction = this.getDirection(prevLine, currentSegmentStations);

        segments.push({
          type: 'metro',
          from_station: fromSt,
          to_station: toSt,
          line: prevLine,
          stops_count: currentSegmentStations.length - 1,
          stations_in_segment: [...currentSegmentStations],
          duration_minutes: Math.round((currentSegmentStations.length - 1) * 2.2),
          instructions: `Board the ${prevLine.line_name} towards ${direction}. Ride for ${currentSegmentStations.length - 1} stops to ${toSt.station_name}.`,
          target_direction: `Towards ${direction}`
        });

        // Add transfer segment
        const interchangeSt = toSt;
        const nextLine = this.lineMap.get(step.lineId)!;
        const interchangeInfo = this.interchangeMap.get(interchangeSt.station_id)?.find(
          ic => ic.line_from === currentLineId && ic.line_to === step.lineId
        );

        segments.push({
          type: 'transfer',
          from_station: interchangeSt,
          to_station: interchangeSt,
          duration_minutes: interchangeInfo?.transfer_time_minutes || 5,
          instructions: interchangeInfo?.transfer_instructions ||
            `Change lines at ${interchangeSt.station_name}. Follow signage from ${prevLine.line_name} to ${nextLine.line_name}.`
        });

        // Start new segment
        currentLineId = step.lineId;
        currentSegmentStations = [toSt, station];
      }
    }

    // Push final metro segment
    if (currentSegmentStations.length > 1) {
      const line = this.lineMap.get(currentLineId)!;
      const fromSt = currentSegmentStations[0];
      const toSt = currentSegmentStations[currentSegmentStations.length - 1];
      const direction = this.getDirection(line, currentSegmentStations);

      segments.push({
        type: 'metro',
        from_station: fromSt,
        to_station: toSt,
        line: line,
        stops_count: currentSegmentStations.length - 1,
        stations_in_segment: [...currentSegmentStations],
        duration_minutes: Math.round((currentSegmentStations.length - 1) * 2.2),
        instructions: `Take ${line.line_name} towards ${direction}. Ride for ${currentSegmentStations.length - 1} stops. Get down at ${toSt.station_name}.`,
        target_direction: `Towards ${direction}`
      });
    }

    // Final walk segment
    const walkFromDestMins = 4;
    segments.push({
      type: 'walk_destination',
      from_station: destStation,
      to_station: destStation,
      duration_minutes: walkFromDestMins,
      instructions: `Exit ${destStation.station_name} at the designated gates towards your final destination.`
    });

    const totalMetroStops = solution.stopsCount;
    const totalMetroTime = Math.round(solution.timeMinutes);
    const totalDuration = walkToOriginMins + totalMetroTime + walkFromDestMins;
    const fare = this.calculateFare(totalMetroStops);

    const summary = segments.filter(s => s.type === 'metro').map(s => 
      `${s.line?.line_name}: ${s.from_station?.station_name} → ${s.to_station?.station_name} (${s.stops_count} stops)`
    ).join(' | ');

    return {
      origin_station: originStation,
      destination_station: destStation,
      walking_to_origin_minutes: walkToOriginMins,
      walking_from_dest_minutes: walkFromDestMins,
      total_duration_minutes: totalDuration,
      total_metro_stops: totalMetroStops,
      transfers_count: solution.transfersCount,
      fare_inr: fare,
      segments,
      all_stations_in_order: allStationsInOrder,
      summary
    };
  }

  private getDirection(line: MetroLine, segmentStations: Station[]): string {
    if (segmentStations.length < 2) return 'Destination';
    const firstId = segmentStations[0].station_id;
    const secondId = segmentStations[1].station_id;

    const idx1 = line.stations.indexOf(firstId);
    const idx2 = line.stations.indexOf(secondId);

    if (idx2 > idx1) {
      // Traveling towards end of line
      const terminalStationId = line.stations[line.stations.length - 1];
      const terminalStation = this.stationMap.get(terminalStationId);
      return terminalStation?.station_name || 'Terminal';
    } else {
      // Traveling towards start of line
      const terminalStationId = line.stations[0];
      const terminalStation = this.stationMap.get(terminalStationId);
      return terminalStation?.station_name || 'Terminal';
    }
  }

  private calculateFare(stops: number): number {
    if (stops <= 2) return 15;
    if (stops <= 5) return 25;
    if (stops <= 9) return 35;
    if (stops <= 14) return 45;
    if (stops <= 20) return 55;
    return 60;
  }
}
