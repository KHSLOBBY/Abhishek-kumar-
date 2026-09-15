import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Activity, 
  BookOpen, 
  Plus, 
  CheckCircle2, 
  Gauge, 
  ShieldCheck, 
  TrainTrack
} from 'lucide-react';
import { CautionOrder, BreathAnalyzerRecord } from '../types';

interface SafetyToolsTabProps {
  cautionOrders: CautionOrder[];
  baRecords: BreathAnalyzerRecord[];
  onAddCautionOrder: (order: Omit<CautionOrder, 'id' | 'isActive'>) => void;
  onAddBaRecord: (record: Omit<BreathAnalyzerRecord, 'id'>) => void;
}

export const SafetyToolsTab: React.FC<SafetyToolsTabProps> = ({
  cautionOrders,
  baRecords,
  onAddCautionOrder,
  onAddBaRecord,
}) => {
  const [subTab, setSubTab] = useState<'CAUTION' | 'BA' | 'SOP'>('CAUTION');
  const [showCautionModal, setShowCautionModal] = useState(false);
  const [showBaModal, setShowBaModal] = useState(false);

  // New Caution form
  const [coSection, setCoSection] = useState('');
  const [coDirection, setCoDirection] = useState<'UP' | 'DN' | 'BOTH'>('BOTH');
  const [coKmFrom, setCoKmFrom] = useState('');
  const [coKmTo, setCoKmTo] = useState('');
  const [coSpeed, setCoSpeed] = useState(30);
  const [coNormalSpeed, setCoNormalSpeed] = useState(100);
  const [coReason, setCoReason] = useState('');
  const [coType, setCoType] = useState<'TSR' | 'PSR'>('TSR');

  // New BA form
  const [baToken, setBaToken] = useState('');
  const [baCrewName, setBaCrewName] = useState('');
  const [baDutyType, setBaDutyType] = useState<'SIGN_ON' | 'SIGN_OFF'>('SIGN_ON');
  const [baReading, setBaReading] = useState(0.00);

  const handleCautionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coSection || !coKmFrom) return;

    onAddCautionOrder({
      section: coSection,
      direction: coDirection,
      kmFrom: coKmFrom,
      kmTo: coKmTo || coKmFrom,
      speedLimitKmph: Number(coSpeed),
      normalSpeedKmph: Number(coNormalSpeed),
      reason: coReason,
      cautionType: coType,
      validFrom: 'Immediate',
      validTo: 'Until notice',
    });

    setCoSection('');
    setCoKmFrom('');
    setCoKmTo('');
    setCoReason('');
    setShowCautionModal(false);
  };

  const handleBaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baToken || !baCrewName) return;

    onAddBaRecord({
      tokenNo: baToken,
      crewName: baCrewName,
      designation: 'Loco Pilot / ALP',
      dutyType: baDutyType,
      bacReading: Number(baReading),
      passed: Number(baReading) === 0.00,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      supervisorName: 'CCC / Kharsia',
    });

    setBaToken('');
    setBaCrewName('');
    setBaReading(0.00);
    setShowBaModal(false);
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Sub Navigation Bar */}
      <div className="bg-[#0c1626] p-1.5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-1">
        <button
          onClick={() => setSubTab('CAUTION')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            subTab === 'CAUTION'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrainTrack className="w-4 h-4" />
          <span>Caution Orders</span>
        </button>

        <button
          onClick={() => setSubTab('BA')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            subTab === 'BA'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>BA Register</span>
        </button>

        <button
          onClick={() => setSubTab('SOP')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            subTab === 'SOP'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Safety SOPs</span>
        </button>
      </div>

      {/* SubTab 1: Caution Orders */}
      {subTab === 'CAUTION' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Active Speed Restrictions (CPH - KHS - RIG Section)
            </h3>
            <button
              onClick={() => setShowCautionModal(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1 shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Caution</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {cautionOrders.map((co) => (
              <div
                key={co.id}
                className="bg-[#0c1626] rounded-2xl p-4 border border-slate-800 shadow-sm space-y-2.5 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        co.cautionType === 'TSR'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                          : 'bg-sky-950 text-sky-300 border border-sky-800/80'
                      }`}
                    >
                      {co.cautionType}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      {co.section} ({co.direction} Line)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30">
                    <Gauge className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-black text-amber-400">
                      {co.speedLimitKmph} km/h
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1.5">
                  <p>
                    <strong className="text-slate-400">Location:</strong> KM {co.kmFrom} to {co.kmTo}
                  </p>
                  <p className="text-slate-200 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    {co.reason}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Valid: {co.validFrom} → {co.validTo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Breath Analyzer (BA) Test Register */}
      {subTab === 'BA' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              Lobby Breath Analyzer (BA) Test Register
            </h3>
            <button
              onClick={() => setShowBaModal(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1 shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record BA Test</span>
            </button>
          </div>

          <div className="bg-[#0c1626] rounded-2xl border border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-800">
            {baRecords.map((rec) => (
              <div key={rec.id} className="p-3.5 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-sm">{rec.crewName}</strong>
                    <span className="font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] text-amber-300">
                      {rec.tokenNo}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                      {rec.dutyType}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    {rec.designation} • Supervised by {rec.supervisorName} at {rec.timestamp}
                  </p>
                </div>

                <div className="text-right flex items-center gap-2">
                  <div className="font-mono text-xs font-bold text-slate-300">
                    {rec.bacReading.toFixed(2)} BAC
                  </div>
                  {rec.passed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      PASSED (0.00)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-800/80">
                      FAILED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Safety SOPs */}
      {subTab === 'SOP' && (
        <div className="space-y-3">
          <div className="bg-[#0c1626] rounded-2xl p-4 border border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              1. Signal Passing at Danger (SPAD) Prevention
            </h4>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>Both LP & ALP must loudly chant signals by name, aspect, and line identification.</li>
              <li>When approaching Yellow aspect, control speed to strictly under 30 km/h at 500m before the signal.</li>
              <li>Do not use mobile phones while driving locomotives under any circumstance.</li>
              <li>Ensure VCD (Vigilance Control Device) is acknowledged within 60-second cycle.</li>
            </ul>
          </div>

          <div className="bg-[#0c1626] rounded-2xl p-4 border border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              2. Fog Signal & Detonator Protection Protocol
            </h4>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>In thick fog or reduced visibility, place 2 detonators 10 meters apart at 270 meters before the stop signal.</li>
              <li>In case of obstruction, place 1st detonator at 600 meters, 2nd & 3rd at 1200 meters (10m apart).</li>
              <li>Always check validity expiry printed on detonator tin box before taking over charge.</li>
            </ul>
          </div>

          <div className="bg-[#0c1626] rounded-2xl p-4 border border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              3. Train Parting & Brake Pipe Pressure Drop
            </h4>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>Immediately switch on locomotive flasher light and sound prescribed horn code.</li>
              <li>Contact Guard & Station Master over VHF radio channel immediately.</li>
              <li>Do not attempt to reverse locomotive without authority and hand signals from Guard.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Caution Order Modal */}
      {showCautionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 backdrop-blur-xs">
          <div className="bg-[#0c1626] rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-700 space-y-3 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">Add Speed Restriction (TSR)</h3>
              <button
                onClick={() => setShowCautionModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCautionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Section *</label>
                <input
                  type="text"
                  required
                  value={coSection}
                  onChange={(e) => setCoSection(e.target.value)}
                  placeholder="e.g. KHS - RIG"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Direction</label>
                  <select
                    value={coDirection}
                    onChange={(e) => setCoDirection(e.target.value as 'UP' | 'DN' | 'BOTH')}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="DN">Down Line</option>
                    <option value="UP">Up Line</option>
                    <option value="BOTH">Both Lines</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Speed Limit (km/h) *</label>
                  <input
                    type="number"
                    required
                    value={coSpeed}
                    onChange={(e) => setCoSpeed(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">KM From *</label>
                  <input
                    type="text"
                    required
                    value={coKmFrom}
                    onChange={(e) => setCoKmFrom(e.target.value)}
                    placeholder="e.g. 612/10"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">KM To</label>
                  <input
                    type="text"
                    value={coKmTo}
                    onChange={(e) => setCoKmTo(e.target.value)}
                    placeholder="e.g. 612/28"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Reason / Engineering Cause</label>
                <textarea
                  value={coReason}
                  onChange={(e) => setCoReason(e.target.value)}
                  placeholder="e.g. Track renewal work by engineering gang"
                  rows={2}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCautionModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Save Caution Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BA Test Modal */}
      {showBaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 backdrop-blur-xs">
          <div className="bg-[#0c1626] rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-700 space-y-3 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">Record Breath Analyzer Test</h3>
              <button
                onClick={() => setShowBaModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBaSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Crew CMS Token *</label>
                  <input
                    type="text"
                    required
                    value={baToken}
                    onChange={(e) => setBaToken(e.target.value)}
                    placeholder="e.g. TK-3910"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Duty Stage</label>
                  <select
                    value={baDutyType}
                    onChange={(e) => setBaDutyType(e.target.value as 'SIGN_ON' | 'SIGN_OFF')}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="SIGN_ON">Sign-On Test</option>
                    <option value="SIGN_OFF">Sign-Off Test</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Crew Name *</label>
                <input
                  type="text"
                  required
                  value={baCrewName}
                  onChange={(e) => setBaCrewName(e.target.value)}
                  placeholder="e.g. S. K. Patel"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Digital BAC Reading (mg/100ml)</label>
                <input
                  type="number"
                  step="0.01"
                  value={baReading}
                  onChange={(e) => setBaReading(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Railway Safety Rule: 0.00 is strictly mandatory for Sign-On.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBaModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Record Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
