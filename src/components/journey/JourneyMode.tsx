import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bell, 
  Navigation, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  RotateCcw, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X,
  Footprints,
  Train,
  Radio,
  Satellite,
  Gauge,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { ActiveJourney, Station } from '../../types/metro';
import { JourneyManager } from '../../engine/journeyEngine';
import { notificationService } from '../../services/notifications';
import { watchLivePosition, clearLivePositionWatcher, LiveGpsPosition, calculateDistanceKm } from '../../services/geolocation';

interface JourneyModeProps {
  journeyManager: JourneyManager;
  activeJourney: ActiveJourney;
  onEndJourney: () => void;
}

export const JourneyMode: React.FC<JourneyModeProps> = ({
  journeyManager,
  activeJourney,
  onEndJourney
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRequestedPerms, setHasRequestedPerms] = useState(false);
  const [controlMode, setControlMode] = useState<'simulator' | 'gps'>('simulator');
  const [liveGps, setLiveGps] = useState<LiveGpsPosition | null>(null);
  const [distanceToNextMeters, setDistanceToNextMeters] = useState<number | null>(null);
  const [gpsWatchId, setGpsWatchId] = useState<number | null>(null);

  const route = activeJourney.route;
  const currentIdx = activeJourney.current_station_index;
  const totalStops = route.all_stations_in_order.length;
  const remainingStops = Math.max(0, totalStops - 1 - currentIdx);
  const currentStation = route.all_stations_in_order[currentIdx];
  const nextStation = currentIdx + 1 < totalStops ? route.all_stations_in_order[currentIdx + 1] : null;
  const destStation = route.destination_station;

  // Manage Live GPS tracking on the train
  useEffect(() => {
    if (controlMode === 'gps') {
      if (isPlaying) {
        setIsPlaying(false);
        journeyManager.stopAutoPlay();
      }

      const id = watchLivePosition(
        (pos) => {
          setLiveGps(pos);
          journeyManager.updateGpsPosition(pos.latitude, pos.longitude);
          if (nextStation) {
            const distKm = calculateDistanceKm(pos.latitude, pos.longitude, nextStation.latitude, nextStation.longitude);
            setDistanceToNextMeters(Math.round(distKm * 1000));
          }
        },
        (err) => {
          console.warn('GPS error in journey mode:', err);
        }
      );
      setGpsWatchId(id);

      return () => {
        if (id !== null) clearLivePositionWatcher(id);
      };
    } else {
      if (gpsWatchId !== null) {
        clearLivePositionWatcher(gpsWatchId);
        setGpsWatchId(null);
      }
    }
  }, [controlMode, isPlaying, nextStation, journeyManager]);

  useEffect(() => {
    return () => {
      if (gpsWatchId !== null) {
        clearLivePositionWatcher(gpsWatchId);
      }
    };
  }, [gpsWatchId]);

  // Trigger confetti upon arrival
  useEffect(() => {
    if (activeJourney.status === 'ARRIVED') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (isPlaying) {
        setIsPlaying(false);
        journeyManager.stopAutoPlay();
      }
    }
  }, [activeJourney.status]);

  const handleToggleAutoPlay = () => {
    if (isPlaying) {
      journeyManager.stopAutoPlay();
      setIsPlaying(false);
    } else {
      journeyManager.startAutoPlay(3500);
      setIsPlaying(true);
    }
  };

  const handleNextStop = () => {
    journeyManager.stepForward();
  };

  const handlePrevStop = () => {
    journeyManager.stepBackward();
  };

  const handleEnableNotifications = async () => {
    await notificationService.requestPermission();
    setHasRequestedPerms(true);
  };

  // Find line info for current station
  const currentMetroSegment = route.segments.find(
    s => s.type === 'metro' && s.stations_in_segment?.some(st => st.station_id === currentStation.station_id)
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Live Journey Main Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Status Bar */}
        <div className="relative flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Active Journey Tracker
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEnableNotifications}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 transition"
              title="Ensure phone alerts pop up"
            >
              <Bell className="w-3 h-3 text-amber-400" />
              <span>{hasRequestedPerms ? 'Alerts Enabled' : 'Enable Push Alerts'}</span>
            </button>

            <button
              onClick={onEndJourney}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition"
              title="End Journey"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Destination Target Banner */}
        <div className="relative pt-6 pb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Heading towards</div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>{destStation.station_name}</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2">
            <span>Boarded at {route.origin_station.station_name}</span>
            <span>•</span>
            <span>{currentMetroSegment?.line?.line_name || 'Metro Line'}</span>
          </div>
        </div>

        {/* SIGNATURE ALERT CALLOUT (When 2 stations, 1 station, or arrival) */}
        {activeJourney.last_alert && (
          <div className={`my-4 p-4 sm:p-5 rounded-2xl border transition-all animate-in fade-in duration-300 ${
            activeJourney.last_alert.is_signature || remainingStops === 2
              ? 'bg-amber-500/15 border-amber-400 text-amber-200 ring-2 ring-amber-400/40'
              : remainingStops === 1
              ? 'bg-red-500/20 border-red-400 text-red-100 ring-2 ring-red-400/40'
              : remainingStops === 0
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/40'
              : 'bg-blue-500/15 border-blue-500/30 text-blue-200'
          }`}>
            <div className="flex items-start gap-3.5">
              <div className={`p-2.5 rounded-xl text-white flex-shrink-0 ${
                activeJourney.last_alert.is_signature || remainingStops === 2
                  ? 'bg-amber-500 shadow-lg shadow-amber-500/30 animate-bounce-subtle'
                  : remainingStops === 1
                  ? 'bg-red-600 shadow-lg shadow-red-500/30 animate-pulse'
                  : remainingStops === 0
                  ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30'
                  : 'bg-blue-600'
              }`}>
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {activeJourney.last_alert.title}
                </div>
                <div className="text-sm sm:text-base font-extrabold mt-0.5 leading-snug">
                  {activeJourney.last_alert.message}
                </div>
                {activeJourney.last_alert.is_signature && (
                  <div className="mt-2 text-[11px] font-bold inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    ★ Signature GoMetro Destination Alert
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Station</div>
            <div className="text-base sm:text-lg font-extrabold text-white mt-1 truncate">
              {currentStation.station_name}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Train at platform</div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Next Station</div>
            <div className="text-base sm:text-lg font-extrabold text-sky-400 mt-1 truncate">
              {nextStation ? nextStation.station_name : 'Final Destination'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {nextStation ? 'Arriving in ~2 mins' : 'End of journey'}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stops Remaining</div>
            <div className={`text-2xl sm:text-3xl font-extrabold mt-0.5 ${
              remainingStops <= 2 ? 'text-amber-400' : 'text-white'
            }`}>
              {remainingStops}
            </div>
            <div className="text-[11px] text-slate-400">
              {remainingStops === 0 ? 'You are here!' : `~${Math.round(remainingStops * 2.2)} mins remaining`}
            </div>
          </div>

        </div>

        {/* Horizontal Progress Timeline */}
        <div className="py-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>{route.origin_station.station_name}</span>
            <span>Stop {currentIdx + 1} of {totalStops}</span>
            <span>{destStation.station_name}</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${((currentIdx) / Math.max(1, totalStops - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Station Dots Preview */}
          <div className="flex justify-between items-center mt-3 overflow-x-auto py-1 no-scrollbar gap-1">
            {route.all_stations_in_order.map((st, idx) => (
              <button
                key={st.station_id}
                onClick={() => journeyManager.moveToIndex(idx)}
                title={`Jump to ${st.station_name}`}
                className="group flex flex-col items-center flex-shrink-0"
              >
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition ${
                  idx === currentIdx
                    ? 'bg-amber-400 border-white scale-125 shadow-md shadow-amber-400/50'
                    : idx < currentIdx
                    ? 'bg-emerald-500 border-emerald-400'
                    : 'bg-slate-700 border-slate-600'
                }`}></div>
                <span className={`text-[10px] mt-1 max-w-[60px] truncate transition ${
                  idx === currentIdx ? 'text-amber-300 font-bold' : 'text-slate-500'
                }`}>
                  {st.station_name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Journey Control Toolbar & Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 bg-slate-800/40 -mx-5 -mb-5 sm:-mx-8 sm:-mb-8 p-5 rounded-b-3xl space-y-4">
          
          {/* Tracking Mode Switcher */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-700">
              <button
                type="button"
                onClick={() => setControlMode('gps')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  controlMode === 'gps'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Satellite className="w-3.5 h-3.5" />
                <span>🛰️ Live Train GPS</span>
              </button>

              <button
                type="button"
                onClick={() => setControlMode('simulator')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  controlMode === 'simulator'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>🎮 Simulator Mode</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onEndJourney}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold transition cursor-pointer"
            >
              Exit Journey Mode
            </button>
          </div>

          {/* MODE 1: LIVE TRAIN GPS TELEMETRY HUD */}
          {controlMode === 'gps' && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Real-Time Train GPS Tracking Active
                </span>
                <span className="font-mono text-slate-400 text-[11px]">
                  Precision: ±{liveGps?.accuracyMeters || 8}m
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Speed (Train)</div>
                  <div className="text-base font-extrabold text-white mt-0.5 font-mono">
                    {liveGps?.speedKmH ? `${liveGps.speedKmH} km/h` : 'In Transit (~35 km/h)'}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Current Platform</div>
                  <div className="text-base font-extrabold text-emerald-400 mt-0.5 truncate">
                    {currentStation.station_name}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Next Station Approach</div>
                  <div className="text-base font-extrabold text-sky-400 mt-0.5 truncate">
                    {nextStation ? nextStation.station_name : 'Destination'}
                  </div>
                  {distanceToNextMeters !== null && (
                    <div className="text-[10px] text-slate-400">~{distanceToNextMeters}m distance</div>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  GoMetro is continuously polling your phone's satellite GPS in the background. The exact instant your train enters <strong>2 stations away from {destStation.station_name}</strong>, your phone alarm chime will ring and the lockscreen alert will fire automatically!
                </p>
              </div>
            </div>
          )}

          {/* MODE 2: INTERACTIVE COMMUTER SIMULATOR CONTROLS */}
          {controlMode === 'simulator' && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Interactive Commuter Simulator (Demonstration)</span>
                <span className="text-[10px] text-blue-400 font-medium">Test alerts in real-time</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handlePrevStop}
                  disabled={currentIdx === 0}
                  className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                  <span>Prev Stop</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStop}
                  disabled={currentIdx >= totalStops - 1}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <span>Next Station</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleToggleAutoPlay}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    isPlaying ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause Auto-Trip' : 'Auto-Play Trip'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Alert Notifications Feed History */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-lg border border-slate-200">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Live Notification Feed</span>
        </h3>

        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {activeJourney.alert_history.map(alert => (
            <div
              key={alert.id}
              className={`p-3 rounded-2xl text-xs flex items-start justify-between gap-3 border ${
                alert.is_signature
                  ? 'bg-amber-50 border-amber-200 text-amber-900 font-medium'
                  : alert.type === 'next_stop'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : alert.type === 'arrival'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold flex items-center gap-1.5">
                  <span>{alert.title}</span>
                  {alert.is_signature && (
                    <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-extrabold">2-STOPS</span>
                  )}
                </div>
                <div className="text-[11px] opacity-90">{alert.message}</div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{alert.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
