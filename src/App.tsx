import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/layout/Header';
import { HeroSearch } from './components/home/HeroSearch';
import { RouteResults } from './components/route/RouteResults';
import { JourneyMode } from './components/journey/JourneyMode';
import { MetroMap } from './components/map/MetroMap';
import { TicketOptions } from './components/ticketing/TicketOptions';
import { GoMetroChat } from './components/ai/GoMetroChat';
import { Footer } from './components/layout/Footer';
import { CITIES, getCityData } from './data';
import { City, RoutePlan, ActiveJourney } from './types/metro';
import { RouteEngine } from './engine/routeEngine';
import { JourneyManager } from './engine/journeyEngine';
import { GoMetroAIAssistant } from './engine/aiAssistant';

export function App() {
  // 1. Current City State (Default: Hyderabad)
  const [currentCity, setCurrentCity] = useState<City>(CITIES[0]);
  const cityData = useMemo(() => getCityData(currentCity.city_id), [currentCity]);

  // 2. Route Engine
  const routeEngine = useMemo(() => new RouteEngine(cityData), [cityData]);

  // 3. Station selections
  const [originStationId, setOriginStationId] = useState<string>('hyd_ameerpet');
  const [destStationId, setDestStationId] = useState<string>('hyd_raidurg');

  // 4. Current calculated route
  const [calculatedRoute, setCalculatedRoute] = useState<RoutePlan | null>(null);

  // 5. Active Tab
  const [activeTab, setActiveTab] = useState<'plan' | 'map' | 'tickets' | 'ai' | 'journey'>('plan');

  // 6. Journey Mode & Journey Manager
  const [activeJourney, setActiveJourney] = useState<ActiveJourney | null>(null);
  const journeyManagerRef = useRef<JourneyManager | null>(null);

  // 7. AI Assistant
  const [isAiOpen, setIsAiOpen] = useState(false);
  const aiAssistant = useMemo(() => new GoMetroAIAssistant(cityData, activeJourney), [cityData]);

  // Update AI when active journey or city changes
  useEffect(() => {
    aiAssistant.updateCity(cityData);
    aiAssistant.updateActiveJourney(activeJourney);
  }, [cityData, activeJourney, aiAssistant]);

  // Handle City Change
  const handleSelectCity = (city: City) => {
    setCurrentCity(city);
    const newCityData = getCityData(city.city_id);

    // Pick two sensible default stations for the new city
    if (newCityData.stations.length >= 2) {
      setOriginStationId(newCityData.stations[0].station_id);
      setDestStationId(newCityData.stations[newCityData.stations.length - 1].station_id);
      
      // Auto calculate route for the new city defaults
      const engine = new RouteEngine(newCityData);
      const plan = engine.findRoute(newCityData.stations[0].station_id, newCityData.stations[newCityData.stations.length - 1].station_id);
      setCalculatedRoute(plan);
    }
  };

  // Initial calculation on load
  useEffect(() => {
    if (originStationId && destStationId) {
      const plan = routeEngine.findRoute(originStationId, destStationId);
      setCalculatedRoute(plan);
    }
  }, []);

  const handlePlanJourney = (overrideOrigin?: string, overrideDest?: string) => {
    const oId = overrideOrigin || originStationId;
    const dId = overrideDest || destStationId;
    if (!oId || !dId) return;
    if (overrideOrigin) setOriginStationId(overrideOrigin);
    if (overrideDest) setDestStationId(overrideDest);
    const plan = routeEngine.findRoute(oId, dId);
    setCalculatedRoute(plan);
    setActiveTab('plan');
  };

  // Start Journey Mode
  const handleStartJourney = (overrideRoute?: RoutePlan) => {
    const routeToUse = overrideRoute || calculatedRoute;
    if (!routeToUse) return;

    if (journeyManagerRef.current) {
      journeyManagerRef.current.stopAutoPlay();
    }

    const manager = new JourneyManager(routeToUse, currentCity.city_id, (updated) => {
      setActiveJourney({ ...updated });
    });

    journeyManagerRef.current = manager;
    setActiveJourney(manager.getJourney());
    setActiveTab('journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEndJourney = () => {
    if (journeyManagerRef.current) {
      journeyManagerRef.current.stopAutoPlay();
    }
    journeyManagerRef.current = null;
    setActiveJourney(null);
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Navigation Bar */}
      <Header
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeJourney={activeJourney}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'plan' && (
          <div>
            <HeroSearch
              currentCity={currentCity}
              stations={cityData.stations}
              lines={cityData.lines}
              originStationId={originStationId}
              destStationId={destStationId}
              setOriginStationId={setOriginStationId}
              setDestStationId={setDestStationId}
              onPlanJourney={handlePlanJourney}
              onOpenAi={() => setIsAiOpen(true)}
            />

            {calculatedRoute && (
              <RouteResults
                route={calculatedRoute}
                currentCity={currentCity}
                onStartJourney={() => handleStartJourney()}
                onOpenTickets={() => setActiveTab('tickets')}
                onAskAi={() => setIsAiOpen(true)}
              />
            )}
          </div>
        )}

        {activeTab === 'journey' && activeJourney && journeyManagerRef.current && (
          <JourneyMode
            journeyManager={journeyManagerRef.current}
            activeJourney={activeJourney}
            onEndJourney={handleEndJourney}
          />
        )}

        {activeTab === 'map' && (
          <MetroMap
            currentCity={currentCity}
            lines={cityData.lines}
            stations={cityData.stations}
            onSelectStationAsOrigin={(st) => {
              setOriginStationId(st.station_id);
              if (destStationId && destStationId !== st.station_id) {
                const plan = routeEngine.findRoute(st.station_id, destStationId);
                setCalculatedRoute(plan);
              }
              setActiveTab('plan');
            }}
            onSelectStationAsDest={(st) => {
              setDestStationId(st.station_id);
              if (originStationId && originStationId !== st.station_id) {
                const plan = routeEngine.findRoute(originStationId, st.station_id);
                setCalculatedRoute(plan);
              }
              setActiveTab('plan');
            }}
          />
        )}

        {activeTab === 'tickets' && (
          <TicketOptions
            currentCity={currentCity}
            ticketProviders={cityData.ticketProviders}
          />
        )}
      </main>

      {/* GoMetro AI Conversational Drawer */}
      <GoMetroChat
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        assistant={aiAssistant}
        currentCity={currentCity}
        onStartJourneyFromAi={(plan) => handleStartJourney(plan)}
        onOpenTicketsTab={() => setActiveTab('tickets')}
      />

      {/* Footer */}
      <Footer
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
      />

    </div>
  );
}

export default App;
