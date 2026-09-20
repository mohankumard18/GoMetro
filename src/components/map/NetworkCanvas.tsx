import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Station, MetroLine } from '../../types/metro';
import { ZoomIn, ZoomOut, RotateCcw, Navigation, MapPin, Info, Check } from 'lucide-react';

interface NetworkCanvasProps {
  stations: Station[];
  lines: MetroLine[];
  activeLineFilter: string | null;
  searchQuery: string;
  selectedStation: Station | null;
  onSelectStation: (st: Station | null) => void;
  onOpenStationDetails: (st: Station) => void;
  onSetOrigin: (st: Station) => void;
  onSetDest: (st: Station) => void;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({
  stations,
  lines,
  activeLineFilter,
  searchQuery,
  selectedStation,
  onSelectStation,
  onOpenStationDetails,
  onSetOrigin,
  onSetDest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Compute geographical bounds and normalization scale
  const { projectX, projectY, projectedStations } = useMemo(() => {
    if (stations.length === 0) {
      return {
        projectX: () => 500,
        projectY: () => 325,
        projectedStations: new Map<string, { x: number; y: number }>()
      };
    }

    const lats = stations.map(s => s.latitude);
    const lngs = stations.map(s => s.longitude);

    const minLatRaw = Math.min(...lats);
    const maxLatRaw = Math.max(...lats);
    const minLngRaw = Math.min(...lngs);
    const maxLngRaw = Math.max(...lngs);

    const latPad = (maxLatRaw - minLatRaw) * 0.1 || 0.01;
    const lngPad = (maxLngRaw - minLngRaw) * 0.1 || 0.01;

    const minLat = minLatRaw - latPad;
    const maxLat = maxLatRaw + latPad;
    const minLng = minLngRaw - lngPad;
    const maxLng = maxLngRaw + lngPad;

    const latSpan = maxLat - minLat;
    const lngSpan = maxLng - minLng;

    const width = 1000;
    const height = 650;
    const pad = 60;

    const px = (lng: number) => pad + ((lng - minLng) / lngSpan) * (width - 2 * pad);
    // Invert latitude so North (higher lat) is at the top (smaller y)
    const py = (lat: number) => height - pad - ((lat - minLat) / latSpan) * (height - 2 * pad);

    const map = new Map<string, { x: number; y: number }>();
    stations.forEach(s => {
      map.set(s.station_id, { x: px(s.longitude), y: py(s.latitude) });
    });

    return { projectX: px, projectY: py, projectedStations: map };
  }, [stations]);

  // Handle Drag / Pan
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag if clicking the background SVG or canvas
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(z => Math.min(2.8, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoom(z => Math.max(0.7, +(z - 0.25).toFixed(2)));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Center on searched station
  useEffect(() => {
    if (searchQuery && stations.length > 0) {
      const match = stations.find(s => s.station_name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (match) {
        const coords = projectedStations.get(match.station_id);
        if (coords) {
          // Center view on this coordinate
          const centerX = 500;
          const centerY = 325;
          setPan({
            x: (centerX - coords.x) * zoom,
            y: (centerY - coords.y) * zoom
          });
        }
      }
    }
  }, [searchQuery, zoom, stations, projectedStations]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-[580px] sm:h-[680px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Background Subtle Transit Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="transit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60a5fa" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#transit-grid)" />
      </svg>

      {/* Floating Zoom & Control Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="text-[10px] font-mono font-bold text-slate-400 select-none py-0.5">
          {Math.round(zoom * 100)}%
        </div>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-5 h-[1px] bg-slate-700 my-0.5"></div>
        <button
          type="button"
          onClick={handleReset}
          title="Reset View"
          className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition active:scale-90 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive SVG Network Layout */}
      <svg
        viewBox="0 0 1000 650"
        className="w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '500px 325px',
          transition: isDragging ? 'none' : 'transform 0.15s ease-out'
        }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Metro Tracks (Paths between consecutive stations) */}
        {lines.map(line => {
          const isLineActive = !activeLineFilter || activeLineFilter === line.line_id;
          const lineStations = line.stations
            .map(id => stations.find(s => s.station_id === id))
            .filter((s): s is Station => !!s);

          if (lineStations.length < 2) return null;

          // Build SVG path data string
          const pathPoints = lineStations.map(s => {
            const p = projectedStations.get(s.station_id) || { x: 0, y: 0 };
            return `${p.x},${p.y}`;
          });
          const pathData = `M ${pathPoints.join(' L ')}`;

          return (
            <g key={`track-group-${line.line_id}`} opacity={isLineActive ? 1 : 0.15} className="transition-opacity duration-200">
              {/* Dark Outline Stroke for Contrast */}
              <path
                d={pathData}
                fill="none"
                stroke="#0f172a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Vibrant Colored Metro Line Track */}
              <path
                d={pathData}
                fill="none"
                stroke={line.line_color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isLineActive ? 'url(#glow)' : undefined}
              />
            </g>
          );
        })}

        {/* 2. Station Nodes */}
        {stations.map(st => {
          const coords = projectedStations.get(st.station_id);
          if (!coords) return null;

          const isLineActive = !activeLineFilter || st.lines.includes(activeLineFilter);
          const isSelected = selectedStation?.station_id === st.station_id;
          const isMatchSearch = searchQuery && (
            st.station_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            st.landmarks?.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
          );

          // Determine line color of the primary line for this station
          const primaryLine = lines.find(l => st.lines.includes(l.line_id));
          const primaryColor = primaryLine ? primaryLine.line_color : '#3b82f6';

          return (
            <g
              key={`node-${st.station_id}`}
              transform={`translate(${coords.x}, ${coords.y})`}
              opacity={isLineActive ? 1 : 0.2}
              className="cursor-pointer transition-opacity duration-150"
              onClick={(e) => {
                e.stopPropagation();
                onSelectStation(isSelected ? null : st);
              }}
            >
              {/* Pulsing Aura if matched search or selected */}
              {(isMatchSearch || isSelected) && (
                <circle
                  r={isSelected ? 18 : 15}
                  fill={isSelected ? '#38bdf8' : '#fbbf24'}
                  opacity="0.4"
                  className="animate-ping"
                />
              )}

              {/* Station Marker */}
              {st.interchange ? (
                // Major Interchange Marker: Double Ring White/Dark
                <g>
                  <circle
                    r="8"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="3.5"
                    className="hover:scale-125 transition-transform"
                  />
                  <circle
                    r="3.5"
                    fill={primaryColor}
                  />
                </g>
              ) : (
                // Regular Station Marker
                <circle
                  r="5"
                  fill="#ffffff"
                  stroke={primaryColor}
                  strokeWidth="2.5"
                  className="hover:scale-125 transition-transform"
                />
              )}

              {/* Station Text Label */}
              <text
                x="8"
                y="3"
                fill={isMatchSearch ? '#38bdf8' : isSelected ? '#ffffff' : '#cbd5e1'}
                fontSize={st.interchange ? '10' : '8.5'}
                fontWeight={st.interchange ? '800' : '600'}
                fontFamily="system-ui, -apple-system, sans-serif"
                className="select-none pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              >
                {st.station_name}
                {st.interchange && ' ⮂'}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Popover Card for Clicked Station */}
      {selectedStation && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 border border-blue-500/40 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                {selectedStation.lines.map(lineId => {
                  const line = lines.find(l => l.line_id === lineId);
                  return (
                    <span
                      key={lineId}
                      className="text-[9px] font-extrabold px-2 py-0.5 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: line?.line_color || '#3b82f6' }}
                    >
                      {line ? line.line_name.split('(')[0] : lineId}
                    </span>
                  );
                })}
                {selectedStation.interchange && (
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    Interchange Hub
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold text-white">{selectedStation.station_name}</h3>
              {selectedStation.landmarks && selectedStation.landmarks.length > 0 && (
                <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[260px]">
                  Near {selectedStation.landmarks.join(', ')}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectStation(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Quick Route Actions */}
          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onSetOrigin(selectedStation);
                onSelectStation(null);
              }}
              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Board Here</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetDest(selectedStation);
                onSelectStation(null);
              }}
              className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Alight Here</span>
            </button>
          </div>

          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={() => onOpenStationDetails(selectedStation)}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition flex items-center justify-center gap-1 w-full py-1 cursor-pointer"
            >
              <Info className="w-3 h-3" />
              <span>Inspect Lifts, Parking & Facilities</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-2 text-[10px] text-slate-400 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-800 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Drag to pan • Click any station for routing • Zoom with controls</span>
      </div>
    </div>
  );
};
