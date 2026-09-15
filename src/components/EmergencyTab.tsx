import React from 'react';
import { 
  Phone, 
  ShieldAlert, 
  MessageSquare, 
  AlertOctagon, 
  Ambulance, 
  Radio, 
  Train
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/railwayOperations';
import { getTelUrl, getWhatsAppUrl } from '../data/contacts';

export const EmergencyTab: React.FC = () => {
  return (
    <div className="pb-20 space-y-4 animate-fadeIn">
      {/* Red Alert Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-slate-900 text-white p-4 rounded-2xl border border-rose-700/60 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center flex-shrink-0 text-rose-400">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Emergency Hotlines &amp; Safety SOS
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-600 text-white animate-pulse">
                Live 24x7
              </span>
            </div>
            <p className="text-xs text-rose-200 mt-0.5 leading-relaxed">
              SECR Bilaspur Division Control Office • Kharsia Lobby Incharge • Central Railway Hospital • RPF Security Control
            </p>
          </div>
        </div>

        {/* Quick Speed Dial Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-rose-800/80">
          <a
            href="tel:07752247061"
            className="bg-rose-900/60 hover:bg-rose-800 p-2.5 rounded-xl border border-rose-700/50 flex flex-col items-center justify-center text-center transition active:scale-95"
          >
            <Radio className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] font-bold text-white">TLC BSP</span>
            <span className="text-[10px] text-rose-200 font-mono">07752-247061</span>
          </a>

          <a
            href="tel:07752247063"
            className="bg-rose-900/60 hover:bg-rose-800 p-2.5 rounded-xl border border-rose-700/50 flex flex-col items-center justify-center text-center transition active:scale-95"
          >
            <Train className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] font-bold text-white">DPC BSP</span>
            <span className="text-[10px] text-rose-200 font-mono">07752-247063</span>
          </a>

          <a
            href="tel:9752876880"
            className="bg-rose-900/60 hover:bg-rose-800 p-2.5 rounded-xl border border-rose-700/50 flex flex-col items-center justify-center text-center transition active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] font-bold text-white">CCC Kharsia</span>
            <span className="text-[10px] text-rose-200 font-mono">9752876880</span>
          </a>

          <a
            href="tel:139"
            className="bg-rose-900/60 hover:bg-rose-800 p-2.5 rounded-xl border border-rose-700/50 flex flex-col items-center justify-center text-center transition active:scale-95"
          >
            <Ambulance className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] font-bold text-white">Rail Madad SOS</span>
            <span className="text-[10px] text-rose-200 font-mono">139 (Toll Free)</span>
          </a>
        </div>
      </div>

      {/* Full Emergency List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          SECR Bilaspur Operational Emergency Directory
        </h3>

        {EMERGENCY_CONTACTS.map((em) => (
          <div
            key={em.id}
            className={`bg-[#0c1626] rounded-2xl p-3.5 border shadow-sm flex items-start justify-between gap-3 ${
              em.priority === 'CRITICAL'
                ? 'border-rose-600/60'
                : 'border-slate-800'
            }`}
          >
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                    em.priority === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                      : 'bg-amber-950 text-amber-300 border border-amber-800/80'
                  }`}
                >
                  {em.priority}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {em.department}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">
                {em.name}
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                {em.designation} • <span className="text-slate-500">{em.location}</span>
              </p>

              <div className="pt-1 flex items-center gap-3 text-xs font-mono font-bold text-amber-300">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  {em.phone}
                </span>
                {em.alternatePhone && (
                  <span className="text-slate-400 font-normal">
                    Alt: <strong className="text-slate-300">{em.alternatePhone}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Dial Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
              {/* WhatsApp message */}
              <a
                href={getWhatsAppUrl(
                  em.alternatePhone || em.phone,
                  `URGENT SOS: From Train Crew at Kharsia (KHS) Lobby.`
                )}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 transition"
                title="Send WhatsApp Emergency Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Call Hotline */}
              <a
                href={getTelUrl(em.phone)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950/40 transition active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
