import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Phone, 
  MessageSquare, 
  Train, 
  Send,
  UserCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { LongHourDuty } from '../types';
import { getWhatsAppUrl, getTelUrl } from '../data/contacts';

interface LongHoursTabProps {
  duties: LongHourDuty[];
  onAddDuty: (duty: Omit<LongHourDuty, 'id' | 'createdAt'>) => void;
  onUpdateDutyStatus: (id: string, status: 'ACTIVE' | 'RELIEVED' | 'SIGNED_OFF') => void;
  onRelieveCrew: (id: string, reliefStation: string) => void;
}

export const LongHoursTab: React.FC<LongHoursTabProps> = ({
  duties,
  onAddDuty,
  onUpdateDutyStatus,
  onRelieveCrew,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'RELIEVED'>('ACTIVE');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update timer every minute for real-time calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Form State for new duty
  const [trainNo, setTrainNo] = useState('');
  const [locoNo, setLocoNo] = useState('');
  const [lpName, setLpName] = useState('');
  const [lpPhone, setLpPhone] = useState('');
  const [alpName, setAlpName] = useState('');
  const [alpPhone, setAlpPhone] = useState('');
  const [tmName, setTmName] = useState('');
  const [signOnTime, setSignOnTime] = useState(
    new Date(Date.now() - 4 * 3600 * 1000).toISOString().slice(0, 16)
  );
  const [fromStation, setFromStation] = useState('KHS');
  const [toStation, setToStation] = useState('JSG');
  const [currentStation, setCurrentStation] = useState('RIG');
  const [remarks, setRemarks] = useState('');

  // Helper to calculate hours on duty
  const getElapsedHours = (signOn: string) => {
    const start = new Date(signOn).getTime();
    const diffHours = (currentTime - start) / (1000 * 60 * 60);
    return Math.max(0, diffHours);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNo || !lpName) return;

    onAddDuty({
      trainNo,
      locoNo,
      lpName,
      lpPhone,
      alpName,
      alpPhone,
      tmName,
      signOnTime,
      fromStation,
      toStation,
      currentStation,
      status: 'ACTIVE',
      remarks,
    });

    // Reset and close
    setTrainNo('');
    setLocoNo('');
    setLpName('');
    setLpPhone('');
    setAlpName('');
    setAlpPhone('');
    setTmName('');
    setRemarks('');
    setShowAddModal(false);
  };

  const filteredDuties = duties.filter((d) => {
    if (filter === 'ALL') return true;
    return d.status === filter;
  });

  return (
    <div className="pb-20 space-y-4">
      {/* Top Banner / Stats */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-xl shadow-md border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Long Hour Duty Monitor</h2>
              <p className="text-xs text-slate-300">
                Indian Railways Max 9-Hour Running Crew Safety Protocol
              </p>
            </div>
          </div>

          <button
            id="longhour-add-entry-btn"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Duty</span>
          </button>
        </div>

        {/* Quick summary stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/80 text-center">
          <div className="bg-slate-800/60 p-2 rounded-lg">
            <span className="text-lg font-black text-amber-400">
              {duties.filter((d) => d.status === 'ACTIVE').length}
            </span>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              On Running Duty
            </p>
          </div>
          <div className="bg-slate-800/60 p-2 rounded-lg">
            <span className="text-lg font-black text-rose-400">
              {duties.filter((d) => d.status === 'ACTIVE' && getElapsedHours(d.signOnTime) >= 9).length}
            </span>
            <p className="text-[10px] text-rose-300 uppercase tracking-wider font-semibold">
              Exceeded 9 Hrs!
            </p>
          </div>
          <div className="bg-slate-800/60 p-2 rounded-lg">
            <span className="text-lg font-black text-emerald-400">
              {duties.filter((d) => d.status === 'RELIEVED').length}
            </span>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              Relieved Today
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-sm">
          <button
            onClick={() => setFilter('ACTIVE')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filter === 'ACTIVE' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Duties
          </button>
          <button
            onClick={() => setFilter('RELIEVED')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filter === 'RELIEVED' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Relieved
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filter === 'ALL' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Logs
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {filteredDuties.length} Duties Listed
        </span>
      </div>

      {/* Duty Cards List */}
      <div className="space-y-3">
        {filteredDuties.map((duty) => {
          const elapsed = getElapsedHours(duty.signOnTime);
          const isCritical = elapsed >= 9;
          const isWarning = elapsed >= 8 && elapsed < 9;
          const formattedHours = Math.floor(elapsed);
          const formattedMins = Math.floor((elapsed - formattedHours) * 60);

          return (
            <div
              key={duty.id}
              className={`bg-[#0c1626] rounded-2xl p-4 border shadow-sm transition space-y-3 ${
                duty.status === 'RELIEVED'
                  ? 'border-slate-800 opacity-80'
                  : isCritical
                  ? 'border-rose-500/80 ring-1 ring-rose-500/30 bg-[#160b10]'
                  : isWarning
                  ? 'border-amber-500/60 bg-[#17120a]'
                  : 'border-slate-800'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-white flex items-center gap-1">
                      <Train className="w-4 h-4 text-sky-400" />
                      {duty.trainNo}
                    </span>
                    {duty.locoNo && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-900 text-amber-300 border border-slate-700">
                        {duty.locoNo}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {duty.fromStation} <ArrowRight className="inline w-3 h-3 text-slate-500" /> {duty.toStation}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Current Location: <strong className="text-white">{duty.currentStation}</strong>
                  </p>
                </div>

                {/* Duty Elapsed Badge */}
                <div className="text-right">
                  {duty.status === 'ACTIVE' ? (
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black tracking-wide ${
                        isCritical
                          ? 'bg-rose-600 text-white animate-pulse shadow'
                          : isWarning
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                      }`}
                    >
                      {isCritical && <Flame className="w-3.5 h-3.5 fill-white text-white" />}
                      <span>
                        {formattedHours}h {formattedMins}m
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-slate-300 border border-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Relieved
                    </span>
                  )}
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Sign On: {new Date(duty.signOnTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Crew Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Loco Pilot:</span>
                  <div className="font-bold text-white flex items-center justify-between mt-0.5">
                    <span>{duty.lpName}</span>
                    {duty.lpPhone && (
                      <div className="flex items-center gap-1">
                        <a
                          href={getTelUrl(duty.lpPhone)}
                          className="p-1 text-sky-400 hover:text-sky-300"
                          title="Call LP"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={getWhatsAppUrl(duty.lpPhone, `Regarding Train ${duty.trainNo} duty at ${duty.currentStation}`)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                          title="WhatsApp LP"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {duty.alpName && (
                  <div>
                    <span className="text-slate-400 font-medium">Assistant Loco Pilot:</span>
                    <div className="font-bold text-white flex items-center justify-between mt-0.5">
                      <span>{duty.alpName}</span>
                      {duty.alpPhone && (
                        <div className="flex items-center gap-1">
                          <a
                            href={getTelUrl(duty.alpPhone)}
                            className="p-1 text-sky-400 hover:text-sky-300"
                            title="Call ALP"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Remarks */}
              {duty.remarks && (
                <p className="text-xs text-amber-200 bg-amber-950/60 p-2 rounded-xl border border-amber-800/60">
                  <strong className="text-amber-400">Status Note:</strong> {duty.remarks}
                </p>
              )}

              {/* Action Buttons */}
              {duty.status === 'ACTIVE' && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-800 gap-2">
                  {/* Notify TLC Button via WhatsApp */}
                  <a
                    href={getWhatsAppUrl(
                      '9752876295', // TLC Bilaspur phone
                      `*ALERT: LONG HOUR RUNNING CREW*\nTrain: ${duty.trainNo} (Loco: ${duty.locoNo})\nLP: ${duty.lpName}\nLocation: ${duty.currentStation}\nDuty Time: ${formattedHours} hrs ${formattedMins} mins.\nPlease arrange relief crew immediately.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition border border-slate-700"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Notify TLC Bilaspur</span>
                  </a>

                  {/* Mark as Relieved Button */}
                  <button
                    onClick={() => {
                      const station = prompt('Enter relief station or yard name:', duty.currentStation);
                      if (station) {
                        onRelieveCrew(duty.id, station);
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition active:scale-95"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Relieve Crew</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Duty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 backdrop-blur-xs">
          <div className="bg-[#0c1626] rounded-2xl max-w-md w-full p-4 shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto space-y-3 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Train className="w-5 h-5 text-amber-400" />
                Register Running Train Duty
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Train No / Name *</label>
                  <input
                    type="text"
                    required
                    value={trainNo}
                    onChange={(e) => setTrainNo(e.target.value)}
                    placeholder="e.g. BOXN-N / Coal"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Loco No</label>
                  <input
                    type="text"
                    value={locoNo}
                    onChange={(e) => setLocoNo(e.target.value)}
                    placeholder="e.g. WAG-9 32100"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Loco Pilot Name *</label>
                  <input
                    type="text"
                    required
                    value={lpName}
                    onChange={(e) => setLpName(e.target.value)}
                    placeholder="e.g. R. K. Sharma"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">LP Mobile No</label>
                  <input
                    type="tel"
                    value={lpPhone}
                    onChange={(e) => setLpPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">ALP Name</label>
                  <input
                    type="text"
                    value={alpName}
                    onChange={(e) => setAlpName(e.target.value)}
                    placeholder="e.g. Amit Kumar"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Sign On Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={signOnTime}
                    onChange={(e) => setSignOnTime(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">From Station</label>
                  <input
                    type="text"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">To Station</label>
                  <input
                    type="text"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Current Station</label>
                  <input
                    type="text"
                    value={currentStation}
                    onChange={(e) => setCurrentStation(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Operational Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Stabled at loop line, waiting for relief."
                  rows={2}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Save Duty Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
