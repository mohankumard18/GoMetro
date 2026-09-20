import React, { useState, useRef, useEffect } from 'react';
import { Train, MapPin, Bell, Sparkles, Navigation, ChevronDown, Volume2, ShieldCheck, Ticket } from 'lucide-react';
import { CITIES } from '../../data';
import { City, ActiveJourney } from '../../types/metro';
import { notificationService } from '../../services/notifications';

interface HeaderProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
  activeTab: 'plan' | 'map' | 'tickets' | 'ai' | 'journey';
  setActiveTab: (tab: 'plan' | 'map' | 'tickets' | 'ai' | 'journey') => void;
  activeJourney: ActiveJourney | null;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onSelectCity,
  activeTab,
  setActiveTab,
  activeJourney,
  onOpenAiChat
}) => {
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [soundTested, setSoundTested] = useState(false);
  const cityMenuRef = useRef<HTMLDivElement>(null);

  // Close city menu when clicking outside cleanly without blocking backdrop
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cityMenuRef.current && !cityMenuRef.current.contains(e.target as Node)) {
        setCityMenuOpen(false);
      }
    };
    if (cityMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [cityMenuOpen]);

  const handleTestSound = () => {
    notificationService.playChime('two_stops');
    notificationService.requestPermission();
    setSoundTested(true);
    setTimeout(() => setSoundTested(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setActiveTab('plan')}
            role="button"
            tabIndex={0}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Train className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">
                  GoMetro
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  Verified Transit
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight">
                Know your route. <span className="text-blue-600 font-semibold">Never Miss your stop.</span>
              </p>
            </div>
          </div>

          {/* City Selector & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* City Dropdown */}
            <div className="relative" ref={cityMenuRef}>
              <button
                type="button"
                onClick={() => setCityMenuOpen(!cityMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition shadow-sm active:scale-95 cursor-pointer"
                title="Select Metro City"
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                <span>{currentCity.city_name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${cityMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Select Indian Metro System
                  </div>
                  {CITIES.map(city => (
                    <button
                      key={city.city_id}
                      type="button"
                      onClick={() => {
                        onSelectCity(city);
                        setCityMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-blue-50 transition cursor-pointer ${
                        city.city_id === currentCity.city_id ? 'bg-blue-50/80 text-blue-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{city.city_name}</div>
                        <div className="text-[11px] text-slate-400">{city.metro_name.split('(')[0]}</div>
                      </div>
                      {city.city_id === currentCity.city_id && (
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chime Audio Test button */}
            <button
              type="button"
              onClick={handleTestSound}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer ${
                soundTested ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Test the signature 2-stations away alert chime"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{soundTested ? 'Chime Playing!' : 'Test Alert Sound'}</span>
            </button>

            {/* AI Assistant Button */}
            <button
              type="button"
              onClick={onOpenAiChat}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Ask</span> GoMetro AI
            </button>

            {/* Active Journey Tracker Badge */}
            {activeJourney && (
              <button
                type="button"
                onClick={() => setActiveTab('journey')}
                className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition animate-bounce-subtle cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <Navigation className="w-3.5 h-3.5" />
                <span>Journey Live</span>
              </button>
            )}

          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1 sm:space-x-2 border-t border-slate-100 py-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'plan' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Route Planner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'map' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Explore Metro Map
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tickets')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tickets' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            Official Tickets
          </button>
          {activeJourney && (
            <button
              type="button"
              onClick={() => setActiveTab('journey')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'journey' ? 'bg-amber-500 text-white shadow-sm' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              Journey Mode ({activeJourney.route.destination_station.station_name})
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
