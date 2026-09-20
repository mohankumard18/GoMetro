import { RoutePlan, ActiveJourney, JourneyAlert, JourneyStatus, Station } from '../types/metro';
import { notificationService } from '../services/notifications';

export class JourneyManager {
  private journey: ActiveJourney;
  private onUpdateCallback?: (journey: ActiveJourney) => void;
  private autoPlayTimer: number | null = null;

  constructor(route: RoutePlan, cityId: string, onUpdate?: (journey: ActiveJourney) => void) {
    this.onUpdateCallback = onUpdate;
    this.journey = {
      journey_id: 'journey_' + Date.now(),
      city_id: cityId,
      route,
      current_station_index: 0,
      status: 'BOARDING',
      started_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      alert_history: []
    };

    // Initial boarding alert
    this.triggerInitialAlert();
  }

  public getJourney(): ActiveJourney {
    return this.journey;
  }

  private triggerInitialAlert() {
    const origin = this.journey.route.all_stations_in_order[0];
    const firstMetroSegment = this.journey.route.segments.find(s => s.type === 'metro');
    const lineName = firstMetroSegment?.line?.line_name || 'Metro Line';
    const direction = firstMetroSegment?.target_direction || '';

    const alert: JourneyAlert = {
      id: 'alert_' + Date.now(),
      type: 'prep',
      title: 'Journey Started',
      message: `Board the ${lineName} ${direction} at ${origin.station_name}.`,
      remaining_stops: this.getRemainingStops(),
      station_name: origin.station_name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    this.journey.last_alert = alert;
    this.journey.alert_history.unshift(alert);
    notificationService.playChime('generic');
    this.notifyUpdate();
  }

  public getRemainingStops(): number {
    return Math.max(0, this.journey.route.all_stations_in_order.length - 1 - this.journey.current_station_index);
  }

  public getCurrentStation(): Station {
    return this.journey.route.all_stations_in_order[this.journey.current_station_index];
  }

  public getNextStation(): Station | null {
    const nextIdx = this.journey.current_station_index + 1;
    if (nextIdx < this.journey.route.all_stations_in_order.length) {
      return this.journey.route.all_stations_in_order[nextIdx];
    }
    return null;
  }

  public stepForward() {
    const total = this.journey.route.all_stations_in_order.length;
    if (this.journey.current_station_index < total - 1) {
      this.moveToIndex(this.journey.current_station_index + 1);
    }
  }

  public stepBackward() {
    if (this.journey.current_station_index > 0) {
      this.moveToIndex(this.journey.current_station_index - 1);
    }
  }

  public moveToIndex(index: number) {
    const total = this.journey.route.all_stations_in_order.length;
    if (index < 0 || index >= total) return;

    this.journey.current_station_index = index;
    const remaining = this.getRemainingStops();
    const currentStation = this.getCurrentStation();
    const destStation = this.journey.route.destination_station;

    // Check if current station is an interchange in the route
    const isTransferPoint = this.isInterchangeAtCurrentIndex();

    if (remaining === 0) {
      this.journey.status = 'ARRIVED';
      const alert: JourneyAlert = {
        id: 'alert_' + Date.now(),
        type: 'arrival',
        title: '🎯 Destination Arrived!',
        message: `You've arrived at ${destStation.station_name}! Please get down from the train and follow signs to the exit.`,
        remaining_stops: 0,
        station_name: destStation.station_name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      this.journey.last_alert = alert;
      this.journey.alert_history.unshift(alert);
      notificationService.playChime('arrival');
      notificationService.sendSystemNotification('GoMetro: You Arrived!', alert.message);
    } else if (remaining === 1) {
      this.journey.status = 'APPROACHING_DESTINATION';
      const alert: JourneyAlert = {
        id: 'alert_' + Date.now(),
        type: 'next_stop',
        title: `🚨 Next Stop: ${destStation.station_name}`,
        message: `Next stop is your destination ${destStation.station_name}. Please prepare to get down now!`,
        remaining_stops: 1,
        station_name: currentStation.station_name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      this.journey.last_alert = alert;
      this.journey.alert_history.unshift(alert);
      notificationService.playChime('next_stop');
      notificationService.sendSystemNotification(`Next Stop: ${destStation.station_name}`, alert.message);
    } else if (remaining === 2) {
      this.journey.status = 'APPROACHING_DESTINATION';
      // SIGNATURE EXPERIENCE
      const alert: JourneyAlert = {
        id: 'alert_' + Date.now(),
        type: 'two_stops',
        title: `🔔 2 Stations Away: ${destStation.station_name}`,
        message: `Your destination ${destStation.station_name} is 2 stations away. Please get ready to exit.`,
        remaining_stops: 2,
        station_name: currentStation.station_name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        is_signature: true
      };
      this.journey.last_alert = alert;
      this.journey.alert_history.unshift(alert);
      notificationService.playChime('two_stops');
      notificationService.sendSystemNotification(`2 Stations Away!`, alert.message);
    } else if (isTransferPoint) {
      this.journey.status = 'TRANSFER_PENDING';
      const transferSegment = this.journey.route.segments.find(
        s => s.type === 'transfer' && s.from_station?.station_id === currentStation.station_id
      );
      const instructions = transferSegment?.instructions || `Line change at ${currentStation.station_name}. Follow signs to the connecting line platform.`;

      const alert: JourneyAlert = {
        id: 'alert_' + Date.now(),
        type: 'transfer',
        title: `🔄 Line Change: ${currentStation.station_name}`,
        message: instructions,
        remaining_stops: remaining,
        station_name: currentStation.station_name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      this.journey.last_alert = alert;
      this.journey.alert_history.unshift(alert);
      notificationService.playChime('transfer');
      notificationService.sendSystemNotification(`Line Change at ${currentStation.station_name}`, alert.message);
    } else if (remaining === 3) {
      this.journey.status = 'IN_TRANSIT';
      const alert: JourneyAlert = {
        id: 'alert_' + Date.now(),
        type: 'prep',
        title: `Approaching Destination`,
        message: `3 stations remaining until ${destStation.station_name}. We will notify you when 2 stations away.`,
        remaining_stops: 3,
        station_name: currentStation.station_name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      this.journey.last_alert = alert;
      this.journey.alert_history.unshift(alert);
      notificationService.playChime('generic');
    } else {
      this.journey.status = 'IN_TRANSIT';
      const nextSt = this.getNextStation();
      const alert: JourneyAlert = {
        id: 'alert_' + Date.now(),
        type: 'prep',
        title: `Departed ${currentStation.station_name}`,
        message: `Next station: ${nextSt ? nextSt.station_name : 'N/A'}. ${remaining} stops remaining.`,
        remaining_stops: remaining,
        station_name: currentStation.station_name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      this.journey.last_alert = alert;
      this.journey.alert_history.unshift(alert);
    }

    this.notifyUpdate();
  }

  private isInterchangeAtCurrentIndex(): boolean {
    const currentStation = this.getCurrentStation();
    // Check if there is a transfer segment at this station
    return this.journey.route.segments.some(
      s => s.type === 'transfer' && s.from_station?.station_id === currentStation.station_id
    );
  }

  public startAutoPlay(intervalMs: number = 3500) {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      if (this.journey.current_station_index >= this.journey.route.all_stations_in_order.length - 1) {
        this.stopAutoPlay();
      } else {
        this.stepForward();
      }
    }, intervalMs);
  }

  public stopAutoPlay() {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  public isAutoPlaying(): boolean {
    return this.autoPlayTimer !== null;
  }

  private notifyUpdate() {
    if (this.onUpdateCallback) {
      this.onUpdateCallback({ ...this.journey });
    }
  }
}
