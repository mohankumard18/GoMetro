import React from 'react';
import { Station, MetroLine } from '../../types/metro';
import { X, MapPin, Navigation, Check, AlertCircle } from 'lucide-react';

interface StationModalProps {
  station: Station | null;
  lines: MetroLine[];
  onClose: () => void;
  onSetOrigin: (st: Station) => void;
  onSetDest: (st: Station) => void;
}

export const StationModal: React.FC<StationModalProps> = ({
  station,
  lines,
  onClose,
  onSetOrigin,
  onSetDest
}) => {
  if (!station) return null;

  const stationLines = lines.filter(l => station.lines.includes(l.line_id));

  const facilityLabels: Record<string, { label: string; icon: string }> = {
    elevator: { label: 'Elevator / Lift', icon: '🛗' },
    escalator: { label: 'Escalator', icon: '🪜' },
    parking: { label: 'Vehicle Parking', icon: '🅿️' },
    washroom: { label: 'Public Washroom', icon: '🚻' },
    atm: { label: 'Bank ATM', icon: '🏧' },
    feeder_bus: { label: 'Feeder Bus / Skywalk', icon: '🚌' },
    drinking_water: { label: 'Drinking Water', icon: '🚰' },
    wheelchair: { label: 'Wheelchair Accessible', icon: '♿' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Station Name & Badges */}
        <div className="pr-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {stationLines.map(l => (
              <span
                key={l.line_id}
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shadow-sm"
                style={{ backgroundColor: l.line_color }}
              >
                {l.line_name.split('(')[0]}
              </span>
            ))}
            {station.interchange && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Major Interchange
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{station.station_name}</h2>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Lat: {station.latitude.toFixed(4)}, Lng: {station.longitude.toFixed(4)}</span>
          </p>
        </div>

        {/* Nearby Landmarks */}
        {station.landmarks && station.landmarks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Key Nearby Landmarks & Connections
            </div>
            <div className="flex flex-wrap gap-1.5">
              {station.landmarks.map((lm, i) => (
                <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  {lm}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Station Facilities */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Verified Station Facilities & Accessibility
          </div>
          <div className="grid grid-cols-2 gap-2">
            {station.facilities.map((fac, i) => {
              const meta = facilityLabels[fac.type] || { label: fac.type, icon: '📍' };
              return (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-xs flex items-center gap-2 border ${
                    fac.available ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="text-sm">{meta.icon}</span>
                  <div className="font-semibold truncate">{meta.label}</div>
                  {fac.available && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              onSetOrigin(station);
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Set as Origin</span>
          </button>

          <button
            onClick={() => {
              onSetDest(station);
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Set as Destination</span>
          </button>
        </div>

      </div>
    </div>
  );
};
