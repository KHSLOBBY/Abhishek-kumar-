import React, { useState } from 'react';
import { Car, ArrowLeft, Plus, MapPin, Clock, User, ShieldCheck } from 'lucide-react';

interface JeepMovementRecord {
  id: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  crewDetails: string;
  fromLocation: string;
  toLocation: string;
  departureTime: string;
  purpose: string;
  status: 'DISPATCHED' | 'ARRIVED' | 'SCHEDULED';
}

const INITIAL_JEEP_RECORDS: JeepMovementRecord[] = [
  {
    id: 'jp-1',
    vehicleNo: 'CG 13 AB 4592',
    driverName: 'Ramesh Yadav',
    driverPhone: '9425251122',
    crewDetails: 'LP K. K. Verma & ALP S. Patel (BOXN Empty)',
    fromLocation: 'Kharsia Running Room',
    toLocation: 'Gharghoda Siding (Yard)',
    departureTime: '02:30 AM',
    purpose: 'Relief Crew Dispatch',
    status: 'DISPATCHED',
  },
  {
    id: 'jp-2',
    vehicleNo: 'CG 13 E 8831',
    driverName: 'Sunil Kumar',
    driverPhone: '9826144550',
    crewDetails: 'LP Rajesh Sahu & TM A. Minz',
    fromLocation: 'Chhal Siding Line 4',
    toLocation: 'Kharsia Lobby & CMS Sign-Off',
    departureTime: '01:15 AM',
    purpose: 'Post-Duty Crew Pickup',
    status: 'ARRIVED',
  },
];

interface JeepMovementTabProps {
  onBackToMenu: () => void;
}

export const JeepMovementTab: React.FC<JeepMovementTabProps> = ({ onBackToMenu }) => {
  const [records, setRecords] = useState<JeepMovementRecord[]>(INITIAL_JEEP_RECORDS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [vehicleNo, setVehicleNo] = useState('CG 13 E 9214');
  const [driverName, setDriverName] = useState('');
  const [crewDetails, setCrewDetails] = useState('');
  const [fromLoc, setFromLoc] = useState('Kharsia Lobby');
  const [toLoc, setToLoc] = useState('Gharghoda / Robertson');
  const [purpose, setPurpose] = useState('Relief Crew Dispatch');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !crewDetails) return;

    const newRec: JeepMovementRecord = {
      id: `jp-${Date.now()}`,
      vehicleNo,
      driverName,
      driverPhone: '9826000000',
      crewDetails,
      fromLocation: fromLoc,
      toLocation: toLoc,
      departureTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      purpose,
      status: 'DISPATCHED',
    };

    setRecords([newRec, ...records]);
    setShowAddForm(false);
    setDriverName('');
    setCrewDetails('');
  };

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
          <div className="w-8 h-8 rounded-lg bg-teal-950/90 border border-teal-700/60 flex items-center justify-center text-teal-400">
            <Car className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white">Jeep Movement</span>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 text-xs font-bold text-slate-950 py-1.5 px-3 rounded-xl bg-teal-400 hover:bg-teal-300 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Dispatch</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-[#0c1626] p-4 rounded-2xl border border-teal-500/40 space-y-3 text-xs">
          <h4 className="font-bold text-teal-400">Dispatch Crew Taxi / Vehicle</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 mb-1">Vehicle No</label>
              <input
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Driver Name &amp; Contact</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="e.g. Pappu Yadav"
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">From Location</label>
              <input
                type="text"
                value={fromLoc}
                onChange={(e) => setFromLoc(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">To Location / Siding</label>
              <input
                type="text"
                value={toLoc}
                onChange={(e) => setToLoc(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Running Crew Details (LP / ALP / TM)</label>
            <input
              type="text"
              value={crewDetails}
              onChange={(e) => setCrewDetails(e.target.value)}
              placeholder="e.g. LP R. S. Minz (G14) & ALP K. Patel"
              className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-teal-400 text-slate-950 font-bold"
            >
              Confirm Dispatch
            </button>
          </div>
        </form>
      )}

      {/* Movement List */}
      <div className="space-y-2.5">
        {records.map((r) => (
          <div
            key={r.id}
            className="p-3.5 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                  {r.vehicleNo}
                </span>
                <span className="text-xs text-slate-300 font-semibold">{r.driverName}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  r.status === 'DISPATCHED'
                    ? 'bg-amber-950 text-amber-400 border border-amber-600/40 animate-pulse'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-600/40'
                }`}
              >
                {r.status}
              </span>
            </div>

            <p className="text-xs font-medium text-white flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{r.crewDetails}</span>
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                {r.fromLocation} → {r.toLocation}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-sky-400" />
                {r.departureTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
