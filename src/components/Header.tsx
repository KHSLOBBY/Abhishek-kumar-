import React from 'react';
import { 
  Sparkles, 
  Sun, 
  Wifi, 
  WifiOff, 
  Download, 
  LayoutGrid, 
  ArrowLeft,
  BookOpen,
  Clock,
  Package,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isOnline: boolean;
  totalContactsCount: number;
  criticalLongHoursCount: number;
  availableStoreItemsCount: number;
  onInstallClick?: () => void;
  showInstallBtn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isOnline,
  totalContactsCount,
  criticalLongHoursCount,
  availableStoreItemsCount,
  onInstallClick,
  showInstallBtn,
}) => {
  const getSubTitle = () => {
    switch (activeTab) {
      case 'menu':
        return 'SELECT A MODULE';
      case 'directory':
        return 'STAFF DIRECTORY (CALL BOOK 3.0)';
      case 'longhours':
        return 'LONG HOUR DUTY MONITOR';
      case 'store':
        return 'STORE & EQUIPMENT REGISTER';
      case 'emergency':
        return 'EMERGENCY SPEED DIAL & SOS';
      case 'safety':
        return 'CAUTION ORDERS & BA LOG';
      case 'jeep':
        return 'CREW JEEP MOVEMENT TRACKER';
      case 'pdd_pad':
        return 'PDD & PAD DETENTION REGISTER';
      case 'roster':
        return 'SHIFT ROSTER & TLC STATUS';
      default:
        return 'SELECT A MODULE';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070e1a] text-white shadow-xl border-b border-slate-800/80">
      {/* Top Utility Bar with Offline & Install notice */}
      <div className="bg-[#050b14] px-3.5 py-1.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
            SECR
          </span>
          <span className="font-medium text-[11px] text-slate-300 truncate">
            Bilaspur Division • Kharsia Crew Lobby (KHS)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Online/Offline Status Indicator */}
          <div 
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isOnline 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60' 
                : 'bg-rose-950 text-rose-300 border border-rose-700 animate-pulse'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-rose-400" />
                <span>Offline</span>
              </>
            )}
          </div>

          {/* Android PWA Install button */}
          {showInstallBtn && (
            <button
              id="header-install-pwa-btn"
              onClick={onInstallClick}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10.5px] font-bold transition shadow-xs"
              title="Install Android App"
            >
              <Download className="w-3 h-3" />
              <span className="hidden xs:inline">Install App</span>
            </button>
          )}
        </div>
      </div>

      {/* Main App Bar - Matching Screenshot Exactly */}
      <div className="px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Circular Kharsia Lobby Emblem Icon */}
          <button 
            onClick={() => setActiveTab('menu')}
            className="group relative focus:outline-hidden"
            title="Go to Home Menu"
          >
            <img 
              src="/icon-512.png" 
              alt="Kharsia Lobby Emblem" 
              className="w-11 h-11 rounded-full border-2 border-amber-400/70 shadow-md object-contain p-0.5 bg-[#0a192e] group-hover:border-amber-300 transition-all"
            />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 
                onClick={() => setActiveTab('menu')}
                className="text-lg font-extrabold tracking-tight text-white leading-none cursor-pointer hover:text-amber-300 transition-colors"
              >
                Kharsia Lobby
              </h1>
            </div>
            <p className="text-[10.5px] font-bold tracking-widest text-sky-400 uppercase mt-1">
              {getSubTitle()}
            </p>
          </div>
        </div>

        {/* Right Action Buttons matching screenshot */}
        <div className="flex items-center gap-1.5">
          {activeTab !== 'menu' && (
            <button
              id="header-back-to-menu-btn"
              onClick={() => setActiveTab('menu')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-sky-300 text-xs font-semibold border border-slate-700 transition mr-1"
              title="Return to Menu"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          )}

          <button 
            className="p-2 rounded-xl text-amber-400 hover:bg-slate-800/60 active:scale-95 transition"
            title="SECR Lobby AI Assistant"
            onClick={() => {
              if (activeTab !== 'menu') setActiveTab('menu');
            }}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
          </button>

          <button 
            className="p-2 rounded-xl text-amber-400 hover:bg-slate-800/60 active:scale-95 transition"
            title="Theme Settings"
            onClick={() => {
              // Toggle or notify
            }}
          >
            <Sun className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
