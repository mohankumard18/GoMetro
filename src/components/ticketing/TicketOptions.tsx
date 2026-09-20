import React from 'react';
import { TicketProvider, City } from '../../types/metro';
import { ShieldCheck, ExternalLink, Ticket, AlertCircle, Smartphone, Globe, CheckCircle2 } from 'lucide-react';

interface TicketOptionsProps {
  currentCity: City;
  ticketProviders: TicketProvider[];
}

export const TicketOptions: React.FC<TicketOptionsProps> = ({
  currentCity,
  ticketProviders
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Title & Official Position Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
          <span>{currentCity.city_name} Metro Ticketing</span>
          <span className="text-slate-300">•</span>
          <span>Authorized Channels</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Official & Authorized Ticket Providers
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Compare verified e-ticketing options for {currentCity.metro_name}. Buy tickets easily using WhatsApp, official portals, or partner UPI apps without waiting in station queues.
        </p>

        {/* Regulatory & Product Principle Disclaimer */}
        <div className="mt-5 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed">
            <span className="font-extrabold">Product Principle & Disclaimer:</span>{' '}
            GoMetro is an intelligent travel navigation companion and does not directly issue or collect payments for tickets. We redirect you directly to official transit authorities and authorized partners so your transaction is 100% genuine and secure.
          </div>
        </div>
      </div>

      {/* Ticket Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ticketProviders.map(provider => (
          <div
            key={provider.provider_id}
            className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/40 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  provider.is_official
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {provider.badge}
                </span>

                {provider.provider_type === 'whatsapp' ? (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" /> WhatsApp QR
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Web / App
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                {provider.provider_name}
              </h3>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {provider.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Secure Direct Link</span>
              <a
                href={provider.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Open Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Commuter Safety & Fares Info */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          General Metro Ticketing Guidelines ({currentCity.city_name})
        </h4>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
          <li>Children below 90 cm in height travel free of charge when accompanied by an adult.</li>
          <li>QR tickets generated via WhatsApp or official apps are valid for travel within the operating hours of the date of issue.</li>
          <li>Passengers must tap in and tap out at the automated fare collection (AFC) gates using the same QR code or smart card.</li>
          <li>Maximum station stay limit is 120 minutes (2 hours) between entry and exit gates.</li>
        </ul>
      </div>

    </div>
  );
};
