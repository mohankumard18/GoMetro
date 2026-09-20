import React, { useState } from 'react';
import { City } from '../../types/metro';
import { OFFICIAL_METRO_MAPS, OfficialMapData } from '../../data/officialMaps';
import { ExternalLink, Download, ShieldCheck, MapPin, Phone, Train, Layers, Sparkles } from 'lucide-react';
import { CITIES } from '../../data';

interface OfficialMapsViewerProps {
  currentCity: City;
  onSelectCity?: (city: City) => void;
}

export const OfficialMapsViewer: React.FC<OfficialMapsViewerProps> = ({
  currentCity,
  onSelectCity
}) => {
  const [selectedCityId, setSelectedCityId] = useState<string>(currentCity.city_id);

  const officialData: OfficialMapData = OFFICIAL_METRO_MAPS[selectedCityId] || OFFICIAL_METRO_MAPS.hyderabad;

  return (
    <div className="space-y-6">
      
      {/* City Switcher Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Official Transit Portals</span>
            <h3 className="text-lg font-extrabold text-slate-900">Authoritative Metro Maps & Schematics</h3>
          </div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Corporation Publications</span>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {CITIES.map(city => {
            const isSelected = city.city_id === selectedCityId;
            return (
              <button
                key={city.city_id}
                type="button"
                onClick={() => {
                  setSelectedCityId(city.city_id);
                  if (onSelectCity) onSelectCity(city);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{city.city_name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Official City Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200 space-y-6">
        
        {/* Authority Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200/60 mb-2">
              <Train className="w-3.5 h-3.5 text-blue-600" />
              <span>{officialData.authorityShort}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {officialData.mapTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {officialData.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
            <a
              href={officialData.pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Map</span>
            </a>

            <a
              href={officialData.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <span>Visit Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Network Metrics Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Route Span</div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">{officialData.totalNetworkLength}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Daily Commuters</div>
            <div className="text-lg sm:text-xl font-extrabold text-blue-700 mt-1">{officialData.dailyRidership}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transit Emergency Helpline</div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">{officialData.emergencyContact}</div>
            </div>
            <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          </div>
        </div>

        {/* Corridors Breakdown */}
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Active Operational Corridors</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {officialData.operationalCorridors.map((c, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: c.color }}></span>
                  <span className="font-extrabold text-xs text-slate-900">{c.name}</span>
                </div>
                <div className="text-xs font-semibold text-slate-700">{c.terminals}</div>
                <div className="text-[11px] text-slate-400 mt-1">{c.stationsCount} Stations in service</div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Interchanges & Transfer Nodes */}
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Key Interchange & Multimodal Junctions</span>
          </h4>
          <div className="space-y-2.5">
            {officialData.majorInterchanges.map((hub, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{hub.name}</div>
                  <p className="text-xs text-slate-600 mt-0.5">{hub.description}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {hub.connectingLines.map((line, i) => (
                    <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-xs">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
