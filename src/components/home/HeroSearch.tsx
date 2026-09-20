import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Search, Compass, MapPin, Sparkles, Navigation, Clock, ShieldCheck, Check } from 'lucide-react';
import { Station, City, MetroLine } from '../../types/metro';
import { findNearestStation, getCurrentCoordinates } from '../../services/geolocation';

interface HeroSearchProps {
  currentCity: City;
  stations: Station[];
  lines: MetroLine[];
  originStationId: string;
  destStationId: string;
  setOriginStationId: (id: string) => void;
  setDestStationId: (id: string) => void;
  onPlanJourney: () => void;
  onOpenAi: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  currentCity,
  stations,
  lines,
  originStationId,
  destStationId,
  setOriginStationId,
  setDestStationId,
  onPlanJourney,
  onOpenAi
}) => {
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [locating, setLocating] = useState(false);
  const [nearestNotice, setNearestNotice] = useState<string | null>(null);

  // Sync query input text when station id changes
  useEffect(() => {
    const orig = stations.find(s => s.station_id === originStationId);
    if (orig) setOriginQuery(orig.station_name);
  }, [originStationId, stations]);

  useEffect(() => {
    const dest = stations.find(s => s.station_id === destStationId);
    if (dest) setDestQuery(dest.station_name);
  }, [destStationId, stations]);

  // Quick suggestions based on city
  const cityQuickRoutes = {
    hyderabad: [
      { from: 'hyd_ameerpet', to: 'hyd_raidurg', label: 'Ameerpet → Raidurg (Direct)' },
      { from: 'hyd_miyapur', to: 'hyd_lb_nagar', label: 'Miyapur → LB Nagar (Red Line)' },
      { from: 'hyd_nagole', to: 'hyd_hitec_city', label: 'Nagole → Hitec City (Blue Line)' }
    ],
    bangalore: [
      { from: 'blr_indiranagar', to: 'blr_majestic', label: 'Indiranagar → Majestic' },
      { from: 'blr_whitefield', to: 'blr_mg_road', label: 'Whitefield → MG Road' },
      { from: 'blr_yeshwanthpur', to: 'blr_jayanagar', label: 'Yeshwanthpur → Jayanagar' }
    ],
    delhi: [
      { from: 'del_new_delhi', to: 'del_airport_t3', label: 'New Delhi → IGI Airport T3' },
      { from: 'del_rajiv_chowk', to: 'del_noida_sec_18', label: 'Rajiv Chowk → Noida Sector 18' },
      { from: 'del_vishwavidyalaya', to: 'del_millennium_city_centre', label: 'DU North → Millennium City Gurugram' }
    ],
    mumbai: [
      { from: 'mum_versova', to: 'mum_ghatkopar', label: 'Versova → Ghatkopar' },
      { from: 'mum_andheri', to: 'mum_airport_rd', label: 'Andheri → Airport Road' }
    ],
    chennai: [
      { from: 'chn_central', to: 'chn_airport', label: 'Chennai Central → Airport' },
      { from: 'chn_wimco_nagar', to: 'chn_guindy', label: 'Wimco Nagar → Guindy' }
    ],
    kochi: [
      { from: 'koc_aluva', to: 'koc_edapally', label: 'Aluva → LuLu Mall (Edapally)' },
      { from: 'koc_mg_road', to: 'koc_vyttila', label: 'MG Road → Vyttila Mobility Hub' }
    ]
  }[currentCity.city_id] || [];

  const handleSwap = () => {
    const tempId = originStationId;
    setOriginStationId(destStationId);
    setDestStationId(tempId);
  };

  const handleNearestMetro = async () => {
    setLocating(true);
    setNearestNotice(null);
    try {
      let coords: { latitude: number; longitude: number };
      try {
        coords = await getCurrentCoordinates();
      } catch (err) {
        // Fallback to city center coordinates with slight offset for realistic demo
        console.log('Using city center fallback for demo geolocation');
        coords = {
          latitude: currentCity.center_lat + 0.015,
          longitude: currentCity.center_lng + 0.015
        };
      }

      const res = findNearestStation(coords.latitude, coords.longitude, stations);
      if (res) {
        setOriginStationId(res.station.station_id);
        setNearestNotice(`Nearest station found: ${res.station.station_name} (~${res.distanceKm} km, ${res.walkingMinutes} min walk)`);
        setTimeout(() => setNearestNotice(null), 5000);
      }
    } catch (err) {
      console.warn('Geolocation error:', err);
    } finally {
      setLocating(false);
    }
  };

  const filteredOriginStations = stations.filter(s =>
    s.station_name.toLowerCase().includes(originQuery.toLowerCase()) ||
    s.landmarks?.some(l => l.toLowerCase().includes(originQuery.toLowerCase()))
  );

  const filteredDestStations = stations.filter(s =>
    s.station_name.toLowerCase().includes(destQuery.toLowerCase()) ||
    s.landmarks?.some(l => l.toLowerCase().includes(destQuery.toLowerCase()))
  );

  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-200/20 via-sky-200/30 to-indigo-100/20 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hero Title & City Announcement */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-sm text-xs font-semibold text-blue-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{currentCity.city_name} Metro Network Live</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">{stations.length} Stations & {lines.length} Lines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Know your route. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent">
              Never Miss your stop.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal">
            Your personal metro travel companion. Plan your line changes, explore station facilities, and receive proactive <span className="font-semibold text-blue-700">"2 stations away"</span> alerts right on your phone!
          </p>
        </div>

        {/* Route Planner Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/60 border border-slate-200/80 transition-all">
          <div className="space-y-4">

            {/* Input Row: Origin & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
              
              {/* Origin Station */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    From Station / Origin
                  </span>
                  <button
                    type="button"
                    onClick={handleNearestMetro}
                    disabled={locating}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
                  >
                    <Compass className={`w-3 h-3 ${locating ? 'animate-spin' : ''}`} />
                    <span>{locating ? 'Locating...' : 'Nearest Station'}</span>
                  </button>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <input
                    type="text"
                    value={originQuery}
                    onChange={(e) => {
                      setOriginQuery(e.target.value);
                      setShowOriginDropdown(true);
                    }}
                    onFocus={() => setShowOriginDropdown(true)}
                    placeholder="Search origin station or landmark..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showOriginDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowOriginDropdown(false)}></div>
                    <div className="absolute left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-20">
                      {filteredOriginStations.length === 0 ? (
                        <div className="p-3 text-xs text-slate-500 text-center">No stations found matching "{originQuery}"</div>
                      ) : (
                        filteredOriginStations.map(st => (
                          <button
                            key={st.station_id}
                            onClick={() => {
                              setOriginStationId(st.station_id);
                              setOriginQuery(st.station_name);
                              setShowOriginDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between hover:bg-blue-50 transition ${
                              st.station_id === originStationId ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{st.station_name}</div>
                              {st.landmarks && (
                                <div className="text-[11px] text-slate-400 truncate max-w-xs">{st.landmarks[0]}</div>
                              )}
                            </div>
                            {st.interchange && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                Interchange
                              </span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:pt-5">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 flex items-center justify-center text-slate-600 transition shadow-sm"
                  title="Swap Origin and Destination"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Station */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    To Station / Destination
                  </span>
                  <span className="text-[11px] text-slate-400">Where are you going?</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <input
                    type="text"
                    value={destQuery}
                    onChange={(e) => {
                      setDestQuery(e.target.value);
                      setShowDestDropdown(true);
                    }}
                    onFocus={() => setShowDestDropdown(true)}
                    placeholder="Search destination station or landmark..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showDestDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDestDropdown(false)}></div>
                    <div className="absolute left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-20">
                      {filteredDestStations.length === 0 ? (
                        <div className="p-3 text-xs text-slate-500 text-center">No stations found matching "{destQuery}"</div>
                      ) : (
                        filteredDestStations.map(st => (
                          <button
                            key={st.station_id}
                            onClick={() => {
                              setDestStationId(st.station_id);
                              setDestQuery(st.station_name);
                              setShowDestDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between hover:bg-blue-50 transition ${
                              st.station_id === destStationId ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{st.station_name}</div>
                              {st.landmarks && (
                                <div className="text-[11px] text-slate-400 truncate max-w-xs">{st.landmarks[0]}</div>
                              )}
                            </div>
                            {st.interchange && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                Interchange
                              </span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Nearest Notification Toast */}
            {nearestNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{nearestNotice}</span>
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onPlanJourney}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Navigation className="w-4 h-4" />
                <span>Plan My Journey</span>
              </button>

              <button
                type="button"
                onClick={onOpenAi}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-700 font-bold text-sm transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ask AI Route</span>
              </button>
            </div>

            {/* Quick Route Suggestions */}
            {cityQuickRoutes.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Popular Journeys in {currentCity.city_name}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {cityQuickRoutes.map((r, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setOriginStationId(r.from);
                        setDestStationId(r.to);
                        setTimeout(onPlanJourney, 50);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/70 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <span className="text-base">🔔</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">2-Stations Away Alerts</div>
              <div className="text-[11px] text-slate-500">Proactive phone notifications</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/70 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-base">🔄</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Line Change Guidance</div>
              <div className="text-[11px] text-slate-500">Platform & direction instructions</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/70 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <span className="text-base">🎫</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Official Ticketing Redirect</div>
              <div className="text-[11px] text-slate-500">WhatsApp QR & verified portals</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
