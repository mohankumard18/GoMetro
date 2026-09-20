import React from 'react';
import { Train, ShieldCheck, Heart, MapPin } from 'lucide-react';
import { CITIES } from '../../data';
import { City } from '../../types/metro';

interface FooterProps {
  onSelectCity: (city: City) => void;
  currentCity: City;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCity, currentCity }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Train className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                GoMetro
              </span>
            </div>

            <p className="text-sm font-semibold text-blue-400">
              Know your route. Never Miss your stop.
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              India's multi-city intelligent metro travel companion. Built on a deterministic transit graph engine with proactive <strong className="text-slate-200">"2 stations away"</strong> destination alerts, step-by-step line change guidance, and authorized official ticketing redirection.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Grounded Transit Intelligence & Verified Station Data</span>
            </div>
          </div>

          {/* Supported Cities Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Supported Metro Systems</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {CITIES.map(c => (
                <li key={c.city_id}>
                  <button
                    onClick={() => onSelectCity(c)}
                    className={`hover:text-white transition flex items-center gap-2 ${
                      c.city_id === currentCity.city_id ? 'text-blue-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <span>{c.city_name}</span>
                    <span className="text-[10px] opacity-60">({c.metro_name.split('(')[0]})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Principle & Notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Official Ticketing Notice
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              GoMetro is not an independent ticket issuer. All ticket buttons redirect commuters exclusively to official transit authorities (L&T Metro, BMRCL, DMRC, CMRL, MMRDA, KMRL) and authorized UPI partner services.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              🔔 <span className="font-semibold text-white">Signature Feature:</span> Proactive destination alerts right on commuter mobile devices.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} GoMetro Platform. Crafted for effortless urban commuting.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Privacy First — No Personal Location Stored</span>
            <span>•</span>
            <span>Version 1.0 (MVP)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
