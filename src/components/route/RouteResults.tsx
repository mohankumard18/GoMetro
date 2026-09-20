import React, { useState } from 'react';
import { RoutePlan, City } from '../../types/metro';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Ticket, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  Info,
  Footprints,
  TrainTrack
} from 'lucide-react';

interface RouteResultsProps {
  route: RoutePlan;
  currentCity: City;
  onStartJourney: () => void;
  onOpenTickets: () => void;
  onAskAi: () => void;
}

export const RouteResults: React.FC<RouteResultsProps> = ({
  route,
  currentCity,
  onStartJourney,
  onOpenTickets,
  onAskAi
}) => {
  const [showStopsList, setShowStopsList] = useState(false);

  const metroSegments = route.segments.filter(s => s.type === 'metro');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Route Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200">
        
        {/* Origin → Destination Headline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <span>{currentCity.city_name} Metro Route</span>
              <span className="text-slate-300">•</span>
              <span>{route.transfers_count === 0 ? 'Direct Route (No Transfers)' : `${route.transfers_count} Interchange`}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2 flex-wrap">
              <span>{route.origin_station.station_name}</span>
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>{route.destination_station.station_name}</span>
            </h2>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-2xl bg-blue-50 border border-blue-100 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Time</div>
              <div className="text-base font-extrabold text-blue-700">~{route.total_duration_minutes}m</div>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Metro Stops</div>
              <div className="text-base font-extrabold text-slate-800">{route.total_metro_stops}</div>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Est. Fare</div>
              <div className="text-base font-extrabold text-emerald-700">₹{route.fare_inr}</div>
            </div>
          </div>
        </div>

        {/* Signature Alert Promise Banner */}
        <div className="my-5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bell className="w-4 h-4 animate-bounce-subtle" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-amber-900">GoMetro Signature Journey Assistance:</span>{' '}
              <span className="text-amber-800">We will proactively alert your phone when you are 2 stations away from {route.destination_station.station_name}!</span>
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={onStartJourney}
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-[0.99]"
          >
            <Navigation className="w-4 h-4" />
            <span>START JOURNEY</span>
          </button>

          <button
            onClick={onOpenTickets}
            className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
          >
            <Ticket className="w-4 h-4 text-emerald-600" />
            <span>Ticket Channels</span>
          </button>

          <button
            onClick={onAskAi}
            className="py-3.5 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Explain with AI</span>
          </button>
        </div>

      </div>

      {/* Step-by-Step Transit Itinerary */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <TrainTrack className="w-5 h-5 text-blue-600" />
            <span>Step-by-Step Commuter Guidance</span>
          </h3>

          <button
            onClick={() => setShowStopsList(!showStopsList)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
          >
            <span>{showStopsList ? 'Hide all stops' : 'View all stops'}</span>
            {showStopsList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Timeline Itinerary */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          
          {route.segments.map((segment, idx) => {
            if (segment.type === 'walk_origin') {
              return (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                        <Footprints className="w-3 h-3" />
                        Walk to Origin
                      </span>
                      <span className="text-xs text-slate-400">~{segment.duration_minutes} mins</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{segment.instructions}</p>
                  </div>
                </div>
              );
            }

            if (segment.type === 'metro') {
              const lineColor = segment.line?.line_color || '#2563eb';
              return (
                <div key={idx} className="relative">
                  <div
                    className="absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full border-4 border-white shadow-sm"
                    style={{ backgroundColor: lineColor }}
                  ></div>
                  <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold shadow-sm"
                          style={{ backgroundColor: lineColor }}
                        >
                          {segment.line?.line_code || 'METRO'}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{segment.line?.line_name}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                        {segment.stops_count} Stops (~{segment.duration_minutes} min)
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-semibold text-slate-700">
                      Board at <span className="font-extrabold text-slate-900">{segment.from_station?.station_name}</span> {segment.target_direction}
                    </div>

                    <p className="text-xs text-slate-600 mt-1">{segment.instructions}</p>

                    {/* Intermediate Stations List */}
                    {showStopsList && segment.stations_in_segment && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 animate-in fade-in duration-150">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stations in this segment:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-700">
                          {segment.stations_in_segment.map((st, sIdx) => (
                            <div key={st.station_id} className="flex items-center gap-2 py-0.5">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lineColor }}></span>
                              <span className={sIdx === 0 || sIdx === segment.stations_in_segment!.length - 1 ? 'font-bold text-slate-900' : ''}>
                                {st.station_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (segment.type === 'transfer') {
              return (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full bg-amber-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                  <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                      <span>🔄 Line Interchange</span>
                      <span className="text-amber-400">•</span>
                      <span>~{segment.duration_minutes} min transfer</span>
                    </div>
                    <p className="text-xs font-semibold text-amber-800 mt-1">{segment.instructions}</p>
                  </div>
                </div>
              );
            }

            if (segment.type === 'walk_destination') {
              return (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full bg-red-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Arrived at Destination
                      </span>
                      <span className="text-xs text-slate-400">Final Step</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{segment.instructions}</p>
                  </div>
                </div>
              );
            }

            return null;
          })}

        </div>

      </div>

    </div>
  );
};
