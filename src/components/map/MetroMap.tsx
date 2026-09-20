import React, { useState } from 'react';
import { Station, MetroLine, City } from '../../types/metro';
import { StationModal } from './StationModal';
import { Search, MapPin, Info, Layers, Compass } from 'lucide-react';

interface MetroMapProps {
  currentCity: City;
  lines: MetroLine[];
  stations: Station[];
  onSelectStationAsOrigin: (station: Station) => void;
  onSelectStationAsDest: (station: Station) => void;
}

export const MetroMap: React.FC<MetroMapProps> = ({
  currentCity,
  lines,
  stations,
  onSelectStationAsOrigin,
  onSelectStationAsDest
}) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [activeLineFilter, setActiveLineFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLines = activeLineFilter
    ? lines.filter(l => l.line_id === activeLineFilter)
    : lines;

  const filteredStations = stations.filter(s =>
    s.station_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.landmarks?.some(lm => lm.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Map Controls Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Interactive Transit Explorer
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {currentCity.city_name} Metro Network Map
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select any station to inspect elevator access, parking, interchanges, or set it as a journey endpoint.
            </p>
          </div>

          {/* Station Quick Search */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station on map..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Lines Filter Chips */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveLineFilter(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeLineFilter === null
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Lines ({lines.length})
          </button>
          {lines.map(line => (
            <button
              key={line.line_id}
              onClick={() => setActiveLineFilter(activeLineFilter === line.line_id ? null : line.line_id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeLineFilter === line.line_id
                  ? 'text-white shadow-sm ring-2 ring-offset-1 ring-blue-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              style={{
                backgroundColor: activeLineFilter === line.line_id ? line.line_color : undefined
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: line.line_color }}
              ></span>
              <span>{line.line_name.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schematic Interactive Network Visualization */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200 space-y-8">
        
        {filteredLines.map(line => {
          // Get stations in order for this line
          const lineStations = line.stations
            .map(id => stations.find(s => s.station_id === id))
            .filter((s): s is Station => s !== undefined);

          return (
            <div key={line.line_id} className="space-y-3">
              {/* Line Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: line.line_color }}
                  ></span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {line.line_name}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {lineStations.length} Stations
                </span>
              </div>

              {/* Station Subway Track Schematic */}
              <div className="relative overflow-x-auto py-6 px-4 bg-slate-50/70 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-6 min-w-max">
                  {lineStations.map((st, idx) => {
                    const isMatchedSearch = searchQuery && st.station_name.toLowerCase().includes(searchQuery.toLowerCase());
                    return (
                      <div key={st.station_id} className="relative flex flex-col items-center group">
                        
                        {/* Connecting track line between nodes */}
                        {idx < lineStations.length - 1 && (
                          <div
                            className="absolute top-4 left-1/2 w-[calc(100%+24px)] h-2 -z-0"
                            style={{ backgroundColor: line.line_color }}
                          ></div>
                        )}

                        {/* Station Node Button */}
                        <button
                          onClick={() => setSelectedStation(st)}
                          className={`w-8 h-8 rounded-full z-10 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                            isMatchedSearch
                              ? 'scale-125 ring-4 ring-amber-400 bg-amber-300'
                              : st.interchange
                              ? 'bg-white border-4 border-slate-900 scale-110 hover:scale-125'
                              : 'bg-white border-4 hover:scale-125'
                          }`}
                          style={{
                            borderColor: st.interchange ? '#0f172a' : line.line_color
                          }}
                          title={`Click for ${st.station_name} facilities`}
                        >
                          {st.interchange ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line.line_color }}></span>
                          )}
                        </button>

                        {/* Station Label & Number */}
                        <div className="mt-3 text-center max-w-[90px]">
                          <div className={`text-xs font-bold truncate transition ${
                            isMatchedSearch ? 'text-blue-700 bg-blue-100 px-1 rounded' : 'text-slate-800 group-hover:text-blue-600'
                          }`}>
                            {st.station_name}
                          </div>
                          {st.interchange && (
                            <span className="text-[9px] font-extrabold uppercase px-1 py-0.2 rounded bg-slate-200 text-slate-800">
                              Interchange
                            </span>
                          )}
                          <div className="text-[10px] text-slate-400 font-mono">#{idx + 1}</div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-slate-900"></span>
              </span>
              <span className="font-semibold text-slate-700">Interchange Station</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600"></span>
              <span className="font-semibold text-slate-700">Standard Metro Station</span>
            </div>
          </div>
          <div>* Tap any station circle to inspect lifts, parking, and route actions.</div>
        </div>

      </div>

      {/* Station Modal */}
      <StationModal
        station={selectedStation}
        lines={lines}
        onClose={() => setSelectedStation(null)}
        onSetOrigin={onSelectStationAsOrigin}
        onSetDest={onSelectStationAsDest}
      />

    </div>
  );
};
