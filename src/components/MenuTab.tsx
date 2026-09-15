import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Train, 
  Radio, 
  Car, 
  FileText, 
  Calendar, 
  ChevronRight, 
  ShieldAlert, 
  AlertTriangle,
  Clock,
  Sparkles,
  PhoneCall,
  Info
} from 'lucide-react';
import { TabType } from '../types';

interface MenuTabProps {
  onSelectModule: (tab: TabType) => void;
  totalContactsCount: number;
  criticalLongHoursCount: number;
  availableStoreItemsCount: number;
}

export const MenuTab: React.FC<MenuTabProps> = ({
  onSelectModule,
  totalContactsCount,
  criticalLongHoursCount,
  availableStoreItemsCount,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleComingSoonClick = (moduleName: string) => {
    setToastMessage(`"${moduleName}" Coming Soon — Ye module jald hi shuru hoga (Under Development)`);
  };

  return (
    <div className="space-y-6 pb-20 text-slate-100 animate-fadeIn relative">
      {/* Toast Notification for Coming Soon clicks */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 max-w-md mx-auto z-50 bg-[#0c1a2e]/95 border border-amber-500/60 text-amber-200 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs font-semibold text-amber-100">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. FEATURED ACTIVE SERVICE SECTION */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2.5 flex items-center gap-1.5">
          <span>FEATURED ACTIVE SERVICE</span>
        </h2>

        {/* Big Featured Card: Staff Directory (Call Book 3.0) */}
        <div
          id="menu-module-directory"
          onClick={() => onSelectModule('directory')}
          className="group relative overflow-hidden rounded-2xl bg-[#0b1a2e] border border-sky-600/40 p-4 sm:p-5 shadow-[0_4px_24px_rgba(2,132,199,0.15)] hover:border-sky-400 transition-all duration-200 cursor-pointer active:scale-[0.99]"
        >
          {/* Subtle Ambient Background Highlight */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

          <div className="relative flex items-center justify-between gap-3.5">
            <div className="flex items-start sm:items-center gap-3.5">
              {/* Icon Squircle */}
              <div className="w-12 h-12 rounded-xl bg-sky-950/90 border border-sky-500/50 flex items-center justify-center text-sky-400 flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 text-sky-400" />
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Staff Directory (Call Book 3.0)
                  </h3>
                </div>

                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/50 shadow-xs">
                    ACTIVE V3.0
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Complete crew &amp; staff directory · Kharsia &amp; all SECR lobbies · One-touch call &amp; WhatsApp
                </p>
              </div>
            </div>

            {/* Circle Arrow Action */}
            <div className="w-8 h-8 rounded-full bg-sky-900/40 border border-sky-600/40 flex items-center justify-center text-sky-300 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all flex-shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. OPERATIONAL MODULES SECTION */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          OPERATIONAL MODULES
        </h2>

        <div className="space-y-2.5">
          {/* Card: Long Hour Update (COMING SOON - NO INNER OPEN) */}
          <div
            id="menu-module-longhours"
            onClick={() => handleComingSoonClick('Long Hour Update')}
            className="group rounded-2xl bg-[#0c1626] border border-slate-800/80 hover:border-amber-500/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.99]"
            title="Coming Soon - Under Development"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Train className="w-5 h-5 text-blue-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Long Hour Update
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-600/40">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Sign-On to Relief — crew duty hour monitoring
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10.5px] font-semibold text-amber-400/90 px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-600/30">
                Soon
              </span>
            </div>
          </div>

          {/* Card: Store Register (COMING SOON - NO INNER OPEN) */}
          <div
            id="menu-module-store"
            onClick={() => handleComingSoonClick('Store Register')}
            className="group rounded-2xl bg-[#0c1626] border border-slate-800/80 hover:border-amber-500/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.99]"
            title="Coming Soon - Under Development"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Radio className="w-5 h-5 text-amber-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Store Register
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-600/40">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Walky-Talky · Battery · Detonator · FSD — Issue &amp; Return
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10.5px] font-semibold text-amber-400/90 px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-600/30">
                Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. COMING SOON SECTION (NO INNER OPEN) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          COMING SOON
        </h2>

        <div className="space-y-2.5">
          {/* Card: Jeep Movement (COMING SOON - NO INNER OPEN) */}
          <div
            id="menu-module-jeep"
            onClick={() => handleComingSoonClick('Jeep Movement')}
            className="group rounded-2xl bg-[#0c1626] border border-slate-800/80 hover:border-amber-500/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.99]"
            title="Coming Soon - Under Development"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-teal-950/80 border border-teal-800/60 flex items-center justify-center text-teal-400 flex-shrink-0">
                <Car className="w-5 h-5 text-teal-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Jeep Movement
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-600/40">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Crew pickup / drop tracking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10.5px] font-semibold text-amber-400/90 px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-600/30">
                Soon
              </span>
            </div>
          </div>

          {/* Card: PDD & PAD (COMING SOON - NO INNER OPEN) */}
          <div
            id="menu-module-pdd-pad"
            onClick={() => handleComingSoonClick('PDD & PAD')}
            className="group rounded-2xl bg-[#0c1626] border border-slate-800/80 hover:border-amber-500/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.99]"
            title="Coming Soon - Under Development"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-orange-950/80 border border-orange-800/60 flex items-center justify-center text-orange-400 flex-shrink-0">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    PDD &amp; PAD (Post departure/arrival detention)
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-600/40">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Post Departure &amp; Post Arrival detention logging
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10.5px] font-semibold text-amber-400/90 px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-600/30">
                Soon
              </span>
            </div>
          </div>

          {/* Card: Roster & TLC Update (COMING SOON - NO INNER OPEN) */}
          <div
            id="menu-module-roster"
            onClick={() => handleComingSoonClick('Roster & TLC Update')}
            className="group rounded-2xl bg-[#0c1626] border border-slate-800/80 hover:border-amber-500/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.99]"
            title="Coming Soon - Under Development"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 flex-shrink-0">
                <Calendar className="w-5 h-5 text-rose-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Roster &amp; TLC Update
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-600/40">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Shift roster and TLC status
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10.5px] font-semibold text-amber-400/90 px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-600/30">
                Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SAFETY & EMERGENCY QUICK LAUNCH */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          SAFETY &amp; EMERGENCY HOTLINES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Emergency Card */}
          <div
            id="menu-module-emergency"
            onClick={() => onSelectModule('emergency')}
            className="group rounded-2xl bg-[#1a0f14] border border-rose-900/60 hover:border-rose-500/80 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 active:scale-[0.99] shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-950/90 border border-rose-700/60 flex items-center justify-center text-rose-400 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-rose-200">
                  Emergency Hotlines
                </h3>
                <p className="text-[11px] text-rose-300/70 truncate">
                  TLC, DPC, CCC, RPF &amp; Hospital
                </p>
              </div>
            </div>
            <PhoneCall className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform flex-shrink-0" />
          </div>

          {/* Caution & BA Card */}
          <div
            id="menu-module-safety"
            onClick={() => onSelectModule('safety')}
            className="group rounded-2xl bg-[#161208] border border-amber-900/60 hover:border-amber-500/80 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 active:scale-[0.99] shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-950/90 border border-amber-700/60 flex items-center justify-center text-amber-400 flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-amber-200">
                  Caution &amp; BA Log
                </h3>
                <p className="text-[11px] text-amber-300/70 truncate">
                  Champa-Kharsia TSR &amp; Breath Analyzer
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
