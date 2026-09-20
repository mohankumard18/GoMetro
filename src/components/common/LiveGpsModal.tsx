import React from 'react';
import { X, Navigation, Compass, ExternalLink, ShieldCheck, MapPin, Footprints, Info } from 'lucide-react';
import { LiveGpsPosition, NearestStationResult } from '../../services/geolocation';

interface LiveGpsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gpsPos: LiveGpsPosition | null;
  nearestResult: NearestStationResult | null;
  onConfirmOrigin?: () => void;
}

export const LiveGpsModal: React.FC<LiveGpsModalProps> = ({
  isOpen,
  onClose,
  gpsPos,
  nearestResult,
  onConfirmOrigin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative space-y-5">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Device GPS Telemetry</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Real-Time Location & Walk Physics
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Transparent breakdown of your device's live satellite fix and the official transit walking calculation.
          </p>
        </div>

        {/* Live GPS Coordinates Readout */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Satellite Geolocation Fix
            </span>
            <span className="font-mono text-[11px] text-emerald-400">
              Accuracy: ±{gpsPos ? gpsPos.accuracyMeters : 12}m
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Latitude</div>
              <div className="text-sm sm:text-base font-mono font-bold text-white mt-0.5">
                {gpsPos ? gpsPos.latitude.toFixed(5) : '17.43750'}° N
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Longitude</div>
              <div className="text-sm sm:text-base font-mono font-bold text-white mt-0.5">
                {gpsPos ? gpsPos.longitude.toFixed(5) : '78.44820'}° E
              </div>
            </div>
          </div>

          {gpsPos?.speedKmH !== undefined && (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ground Speed:</span>
              <span className="font-mono font-bold text-sky-400">{gpsPos.speedKmH} km/h</span>
            </div>
          )}
        </div>

        {/* Nearest Station & Walking Distance Details */}
        {nearestResult && (
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                  Nearest Metro Entry Point
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                  {nearestResult.station.station_name} Metro
                </div>
                <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                  <span>Bearing: {nearestResult.compassDirection} ({nearestResult.compassDegrees}°)</span>
                  <span>•</span>
                  <span>{nearestResult.distanceMeters}m straight-line</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-black text-blue-700">
                  ~{nearestResult.walkingMinutes} min
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Walking Time
                </div>
              </div>
            </div>

            {/* Turnkey Google Maps Walking Button */}
            <a
              href={nearestResult.googleMapsWalkingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-xs"
            >
              <Footprints className="w-4 h-4 text-blue-600" />
              <span>Open Turn-by-Turn Walk in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        )}

        {/* Mathematical Transparency: "How can you say walk 5 mins?" */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>How is "Walk 5 mins" calculated?</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            GoMetro uses the international urban transit pedestrian standard calibrated at an average walking pace of <strong>4.8 km/h (80 meters per minute / 1.33 m/s)</strong>.
          </p>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-[10.5px] text-slate-800 space-y-1">
            <div>1. Haversine Straight Distance = {nearestResult?.distanceMeters || 350} meters</div>
            <div>2. Street Grid Winding Factor = 1.2× ({Math.round((nearestResult?.distanceMeters || 350) * 1.2)} meters)</div>
            <div className="text-blue-700 font-bold">
              3. Walk Time = {Math.round((nearestResult?.distanceMeters || 350) * 1.2)}m ÷ 80 m/min = {nearestResult?.walkingMinutes || 5} minutes
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center gap-2 pt-1">
          {onConfirmOrigin && (
            <button
              type="button"
              onClick={() => {
                onConfirmOrigin();
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98 shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Set as My Origin Station</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
