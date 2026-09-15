import React, { useState } from 'react';
import { Calendar, ArrowLeft, Plus, Clock, User, Bell, CheckCircle } from 'lucide-react';

interface RosterEntry {
  id: string;
  shift: 'A (06:00 - 14:00)' | 'B (14:00 - 22:00)' | 'C (22:00 - 06:00)';
  role: string;
  staffName: string;
  phone: string;
  tlcAdvisory: string;
}

const INITIAL_ROSTER: RosterEntry[] = [
  {
    id: 'ros-1',
    shift: 'C (22:00 - 06:00)',
    role: 'Chief Crew Controller (CCC In-charge)',
    staffName: 'B. S. Rathore (CCC)',
    phone: '9752876801',
    tlcAdvisory: 'Keep 3 spare crews ready for South Eastern Railway interchange goods loads at BRJN.',
  },
  {
    id: 'ros-2',
    shift: 'C (22:00 - 06:00)',
    role: 'TLC Bilaspur In-charge (TLC Main)',
    staffName: 'S. K. Patel (TLC Shift C)',
    phone: '9752876880',
    tlcAdvisory: 'Caution in Kharsia - Robertson Down Line Km 582/10-18: 30 Kmph track machine work.',
  },
  {
    id: 'ros-3',
    shift: 'A (06:00 - 14:00)',
    role: 'Lobby Store In-charge',
    staffName: 'Devendra Kumar (CC)',
    phone: '9752876805',
    tlcAdvisory: 'Walkie-talkie sets 14 to 20 sent for battery re-charging.',
  },
];

interface RosterTlcTabProps {
  onBackToMenu: () => void;
}

export const RosterTlcTab: React.FC<RosterTlcTabProps> = ({ onBackToMenu }) => {
  const [entries] = useState<RosterEntry[]>(INITIAL_ROSTER);

  return (
    <div className="space-y-4 pb-20 text-slate-100">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-[#0c1626] p-3 rounded-2xl border border-slate-800">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 py-1 px-2 rounded-lg bg-sky-950/80 border border-sky-800/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modules Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-950/90 border border-rose-700/60 flex items-center justify-center text-rose-400">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white">Roster &amp; TLC</span>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/40">
          Live Shift C
        </span>
      </div>

      {/* TLC Bilaspur Notice Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 space-y-1 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <Bell className="w-4 h-4" />
          <span>TLC Control Bilaspur Directive</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Ensure mandatory breath analyzer check on every sign-on crew. Give priority to coal rakes destined for NTPC Lara / Sipat.
        </p>
      </div>

      {/* Roster Duty List */}
      <div className="space-y-2.5">
        {entries.map((e) => (
          <div
            key={e.id}
            className="p-3.5 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400">{e.role}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                {e.shift}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {e.staffName}
              </span>
              <a
                href={`tel:${e.phone}`}
                className="text-xs font-mono text-amber-400 underline font-semibold"
              >
                {e.phone}
              </a>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/80 text-[11px] text-slate-300 border border-slate-800/80">
              <strong className="text-sky-400">TLC / Shift Note:</strong> {e.tlcAdvisory}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
