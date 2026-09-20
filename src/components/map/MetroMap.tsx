import React, { useState } from 'react';
import { Station, MetroLine, City } from '../../types/metro';
import { StationModal } from './StationModal';
import { NetworkCanvas } from './NetworkCanvas';
import { OfficialMapsViewer } from './OfficialMapsViewer';
import { Search, Layers, FileText, GitFork } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'network' | 'official' | 'schematic'>('network');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [modalStation, setModalStation] = useState<Station | null>(null);
  const [activeLineFilter, setActiveLineFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLines = activeLineFilter
    ? lines.filter(l => l.line_id === activeLineFilter)
    : lines;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Map Navigator Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Interactive Transit Explorer & Maps
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              {currentCity.city_name} Metro Network Map
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Inspect complete transit topology, transfer intersections, official authority schematics, or plan directly by tapping any station.
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 flex-shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('network')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'network'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>2D Network Map</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('official')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'official'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official PDFs</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('schematic')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'schematic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Corridor Strips</span>
            </button>
          </div>
        </div>

        {/* Filter Controls (Station Search & Line Chips) */}
        {viewMode !== 'official' && (
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Lines Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveLineFilter(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
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
                    type="button"
                    onClick={() => setActiveLineFilter(activeLineFilter === line.line_id ? null : line.line_id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
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

              {/* Station Search Input */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find station on map..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: Full 2D Interactive Topological Network Canvas */}
      {viewMode === 'network' && (
        <NetworkCanvas
          stations={stations}
          lines={lines}
          activeLineFilter={activeLineFilter}
          searchQuery={searchQuery}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
          onOpenStationDetails={(st) => setModalStation(st)}
          onSetOrigin={onSelectStationAsOrigin}
          onSetDest={onSelectStationAsDest}
        />
      )}

      {/* VIEW 2: Official System Maps & PDFs */}
      {viewMode === 'official' && (
        <OfficialMapsViewer
          currentCity={currentCity}
        />
      )}

      {/* VIEW 3: Linear Corridor Schematic View */}
      {viewMode === 'schematic' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200 space-y-8">
          {filteredLines.map(line => {
            const lineStations = line.stations
              .map(id => stations.find(s => s.station_id === id))
              .filter((s): s is Station => s !== undefined);

            return (
              <div key={line.line_id} className="space-y-3">
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

                <div className="relative overflow-x-auto py-6 px-4 bg-slate-50/70 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-6 min-w-max">
                    {lineStations.map((st, idx) => {
                      const isMatchedSearch = searchQuery && st.station_name.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <div key={st.station_id} className="relative flex flex-col items-center group">
                          {idx < lineStations.length - 1 && (
                            <div
                              className="absolute top-4 left-1/2 w-[calc(100%+24px)] h-2 -z-0"
                              style={{ backgroundColor: line.line_color }}
                            ></div>
                          )}

                          <button
                            type="button"
                            onClick={() => setModalStation(st)}
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
                            title={`Inspect ${st.station_name}`}
                          >
                            {st.interchange ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line.line_color }}></span>
                            )}
                          </button>

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
        </div>
      )}

      {/* Station Modal for detailed facilities inspection */}
      <StationModal
        station={modalStation}
        lines={lines}
        onClose={() => setModalStation(null)}
        onSetOrigin={onSelectStationAsOrigin}
        onSetDest={onSelectStationAsDest}
      />

    </div>
  );
};
