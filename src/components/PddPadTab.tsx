import React, { useState } from 'react';
import { FileText, ArrowLeft, Plus, Clock, AlertCircle } from 'lucide-react';

interface PddPadRecord {
  id: string;
  trainNo: string;
  locoNo: string;
  lpName: string;
  type: 'PDD' | 'PAD';
  station: string;
  detentionMinutes: number;
  reason: string;
  timestamp: string;
}

const INITIAL_PDD_PAD: PddPadRecord[] = [
  {
    id: 'det-1',
    trainNo: 'BOXN / NMG 5928',
    locoNo: 'WAG-9 31842',
    lpName: 'P. K. Verma',
    type: 'PDD',
    station: 'Kharsia Yard Line 3',
    detentionMinutes: 45,
    reason: 'Late Power readiness & Brake continuity memo issuance delay',
    timestamp: '01:45 AM',
  },
  {
    id: 'det-2',
    trainNo: 'BOBRN Coal Load',
    locoNo: 'WAG-9 32104',
    lpName: 'S. N. Tiwari',
    type: 'PAD',
    station: 'Robertson Loop',
    detentionMinutes: 35,
    reason: 'Precedence to Mail Express 12834 Howrah Ahmedabad',
    timestamp: 'Yesterday 23:10',
  },
];

interface PddPadTabProps {
  onBackToMenu: () => void;
}

export const PddPadTab: React.FC<PddPadTabProps> = ({ onBackToMenu }) => {
  const [records, setRecords] = useState<PddPadRecord[]>(INITIAL_PDD_PAD);
  const [showAdd, setShowAdd] = useState(false);
  const [trainNo, setTrainNo] = useState('');
  const [locoNo, setLocoNo] = useState('');
  const [lpName, setLpName] = useState('');
  const [type, setType] = useState<'PDD' | 'PAD'>('PDD');
  const [station, setStation] = useState('Kharsia (KHS)');
  const [minutes, setMinutes] = useState('30');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNo || !reason) return;

    const newRec: PddPadRecord = {
      id: `det-${Date.now()}`,
      trainNo,
      locoNo: locoNo || 'WAG-9',
      lpName: lpName || 'Goods LP',
      type,
      station,
      detentionMinutes: parseInt(minutes, 10) || 15,
      reason,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setRecords([newRec, ...records]);
    setShowAdd(false);
    setTrainNo('');
    setReason('');
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
          <div className="w-8 h-8 rounded-lg bg-orange-950/90 border border-orange-700/60 flex items-center justify-center text-orange-400">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white">PDD &amp; PAD Log</span>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1 text-xs font-bold text-slate-950 py-1.5 px-3 rounded-xl bg-orange-400 hover:bg-orange-300 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Entry</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-[#0c1626] p-4 rounded-2xl border border-orange-500/40 space-y-3 text-xs">
          <h4 className="font-bold text-orange-400">Log Departure / Arrival Detention</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 mb-1">Detention Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'PDD' | 'PAD')}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              >
                <option value="PDD">PDD (Post Departure Detention)</option>
                <option value="PAD">PAD (Post Arrival Detention)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Train / Load Name</label>
              <input
                type="text"
                value={trainNo}
                onChange={(e) => setTrainNo(e.target.value)}
                placeholder="e.g. BOXN Empty"
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Station / Point</label>
              <input
                type="text"
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Specific Cause / Remarks</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Precedence, signal failure, brake test memo delay"
              className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-orange-400 text-slate-950 font-bold"
            >
              Save Detention
            </button>
          </div>
        </form>
      )}

      {/* Detention Records List */}
      <div className="space-y-2.5">
        {records.map((r) => (
          <div
            key={r.id}
            className="p-3.5 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    r.type === 'PDD'
                      ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                      : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                  }`}
                >
                  {r.type}
                </span>
                <span className="text-xs font-bold text-white font-mono">{r.trainNo}</span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400">
                +{r.detentionMinutes} mins
              </span>
            </div>

            <p className="text-xs text-slate-300 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
              <span>{r.reason}</span>
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
              <span>{r.station}</span>
              <span className="font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {r.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
