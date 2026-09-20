import React, { useState } from 'react';
import { City } from '../../types/metro';
import { OFFICIAL_METRO_MAPS, OfficialMapData } from '../../data/officialMaps';
import { ExternalLink, Download, ShieldCheck, MapPin, Phone, Train, Layers, Sparkles, ZoomIn, ZoomOut, Maximize2, X, Eye } from 'lucide-react';
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
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const officialData: OfficialMapData = OFFICIAL_METRO_MAPS[selectedCityId] || OFFICIAL_METRO_MAPS.hyderabad;

  const getAssetUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = import.meta.env.BASE_URL || './';
    return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`;
  };

  const handleZoomIn = () => setZoomLevel(z => Math.min(3, +(z + 0.3).toFixed(1)));
  const handleZoomOut = () => setZoomLevel(z => Math.max(0.6, +(z - 0.3).toFixed(1)));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="space-y-6">
      
      {/* City Switcher Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Official Transit Authority Publications</span>
            <h3 className="text-lg font-extrabold text-slate-900">Authoritative Metro Maps & Schematics</h3>
          </div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Verified System Maps & PDFs</span>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {CITIES.map(city => {
            const isSelected = city.city_id === selectedCityId;
            const hasAttached = !!OFFICIAL_METRO_MAPS[city.city_id]?.localMapImage;
            return (
              <button
                key={city.city_id}
                type="button"
                onClick={() => {
                  setSelectedCityId(city.city_id);
                  setZoomLevel(1);
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
                {hasAttached && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    PDF
                  </span>
                )}
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
            {officialData.localMapPdf ? (
              <a
                href={getAssetUrl(officialData.localMapPdf)}
                download={`${officialData.cityName.toLowerCase()}_official_metro_map.pdf`}
                className="py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF Map</span>
              </a>
            ) : (
              <a
                href={officialData.pdfDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF Map</span>
              </a>
            )}

            <a
              href={officialData.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <span>Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* EMBEDDED HIGH-RESOLUTION OFFICIAL MAP VIEWER */}
        {officialData.localMapImage && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Official Network Map Preview ({officialData.cityName})</span>
              </div>

              {/* Viewer Control Bar */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-blue-600 transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold px-1 text-slate-600">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-blue-600 transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2 py-1 text-[10px] font-bold rounded-lg hover:bg-white text-slate-600 transition cursor-pointer"
                >
                  Reset
                </button>
                <div className="w-[1px] h-4 bg-slate-300 mx-0.5"></div>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="p-1.5 rounded-lg hover:bg-white text-blue-700 transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  title="Fullscreen High-Res View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Interactive Image Display Window */}
            <div className="relative w-full h-[450px] sm:h-[580px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center group cursor-grab">
              <div
                className="w-full h-full overflow-auto flex items-center justify-center p-4 transition-transform duration-150"
                style={{ cursor: zoomLevel > 1 ? 'grab' : 'default' }}
              >
                <img
                  src={getAssetUrl(officialData.localMapImage)}
                  alt={`${officialData.cityName} Official Metro Map`}
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                  className="max-w-full max-h-full object-contain transition-transform duration-200 drop-shadow-2xl select-none"
                  draggable={false}
                />
              </div>

              {/* Watermark badge */}
              <div className="absolute bottom-4 left-4 pointer-events-none bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-white text-[11px] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{officialData.authorityShort} Official Publication</span>
              </div>

              {/* Open in new tab pill */}
              <a
                href={getAssetUrl(officialData.localMapImage)}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md border border-slate-700 flex items-center gap-1.5 transition active:scale-95 shadow-lg"
              >
                <span>Full Res Image</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

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

      {/* FULLSCREEN HIGH-RES MODAL */}
      {isFullscreen && officialData.localMapImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
                {officialData.authorityShort}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">{officialData.mapTitle}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Reset ({Math.round(zoomLevel * 100)}%)
              </button>

              {officialData.localMapPdf && (
                <a
                  href={getAssetUrl(officialData.localMapPdf)}
                  download={`${officialData.cityName.toLowerCase()}_official_map.pdf`}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition cursor-pointer ml-2"
                title="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Fullscreen Body */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
            <img
              src={getAssetUrl(officialData.localMapImage)}
              alt={`${officialData.cityName} Fullscreen Official Map`}
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              className="max-w-none transition-transform duration-200 select-none shadow-2xl rounded-2xl"
              draggable={false}
            />
          </div>
        </div>
      )}

    </div>
  );
};
