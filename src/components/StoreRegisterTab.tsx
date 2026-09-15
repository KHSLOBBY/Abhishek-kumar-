import React, { useState } from 'react';
import { 
  Package, 
  Radio, 
  Flashlight, 
  Shield, 
  Check, 
  RotateCcw, 
  ArrowUpRight, 
  Plus, 
  History, 
  User, 
  Search,
  BatteryCharging
} from 'lucide-react';
import { StoreItem, StoreTransaction } from '../types';

interface StoreRegisterTabProps {
  items: StoreItem[];
  transactions: StoreTransaction[];
  onIssueItem: (itemId: string, crewToken: string, crewName: string, notes?: string) => void;
  onReturnItem: (itemId: string, conditionNotes?: string) => void;
  onAddItem: (item: Omit<StoreItem, 'id' | 'status'>) => void;
}

export const StoreRegisterTab: React.FC<StoreRegisterTabProps> = ({
  items,
  transactions,
  onIssueItem,
  onReturnItem,
  onAddItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeView, setActiveView] = useState<'ITEMS' | 'LOGS'>('ITEMS');

  // Issue modal state
  const [issuingItem, setIssuingItem] = useState<StoreItem | null>(null);
  const [crewToken, setCrewToken] = useState('');
  const [crewName, setCrewName] = useState('');
  const [issueNotes, setIssueNotes] = useState('');

  // Add item modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemSerial, setNewItemSerial] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<StoreItem['category']>('VHF');

  const categories = [
    { code: 'ALL', label: 'All Items' },
    { code: 'VHF', label: 'VHF Radios' },
    { code: 'TORCH', label: 'Tri-Color Torches' },
    { code: 'DETONATOR', label: 'Detonators' },
    { code: 'TAIL_LAMP', label: 'Tail Lamps' },
    { code: 'FLAGS', label: 'Hand Flags' },
    { code: 'BATTERY', label: 'Batteries' },
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.serialNumber.toLowerCase().includes(q) ||
        (item.currentHolderName && item.currentHolderName.toLowerCase().includes(q)) ||
        (item.currentHolderToken && item.currentHolderToken.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issuingItem || !crewToken || !crewName) return;
    onIssueItem(issuingItem.id, crewToken, crewName, issueNotes);
    setIssuingItem(null);
    setCrewToken('');
    setCrewName('');
    setIssueNotes('');
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemSerial) return;
    onAddItem({
      name: newItemName,
      serialNumber: newItemSerial,
      category: newItemCategory,
    });
    setNewItemName('');
    setNewItemSerial('');
    setShowAddModal(false);
  };

  const getItemIcon = (cat: StoreItem['category']) => {
    switch (cat) {
      case 'VHF':
        return <Radio className="w-5 h-5 text-blue-600" />;
      case 'TORCH':
        return <Flashlight className="w-5 h-5 text-amber-600" />;
      case 'DETONATOR':
        return <Shield className="w-5 h-5 text-rose-600" />;
      case 'TAIL_LAMP':
        return <Package className="w-5 h-5 text-red-600" />;
      case 'BATTERY':
        return <BatteryCharging className="w-5 h-5 text-emerald-600" />;
      default:
        return <Package className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Top Header Card */}
      <div className="bg-[#0c1626] rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Lobby Store & Safety Gear</h2>
            <p className="text-xs text-slate-400">
              VHF 5W walkie-talkies, Tri-color lamps, Fog detonators, and Tail lamps register
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Switcher & Search Bar */}
      <div className="bg-[#0c1626] rounded-2xl p-3.5 border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          {/* Items vs Logs tab */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('ITEMS')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                activeView === 'ITEMS' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Inventory ({items.length})
            </button>
            <button
              onClick={() => setActiveView('LOGS')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                activeView === 'LOGS' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Issue/Return Logs
            </button>
          </div>

          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Kharsia Crew Lobby Store Register
          </span>
        </div>

        {activeView === 'ITEMS' && (
          <>
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gear by name, serial no, or crew token..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 text-white placeholder-slate-500 rounded-xl text-xs border border-slate-700/80 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.code}
                  onClick={() => setSelectedCategory(cat.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat.code
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* View: Inventory Items */}
      {activeView === 'ITEMS' && (
        <div className="space-y-2.5">
          {filteredItems.map((item) => {
            const isIssued = item.status === 'ISSUED';

            return (
              <div
                key={item.id}
                className="bg-[#0c1626] rounded-2xl p-3.5 border border-slate-800 shadow-sm flex items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    {getItemIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <span className="font-mono text-[11px] font-semibold text-amber-300 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                        {item.serialNumber}
                      </span>
                    </div>

                    {isIssued ? (
                      <p className="text-[11px] text-amber-400 font-medium flex items-center gap-1 mt-0.5">
                        <span>Issued to:</span>
                        <strong className="text-white">{item.currentHolderName}</strong>
                        <span>({item.currentHolderToken})</span>
                        {item.lastIssuedAt && <span className="text-slate-400">• at {item.lastIssuedAt}</span>}
                      </p>
                    ) : (
                      <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" />
                        In Lobby Locker • Ready for Duty
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isIssued ? (
                    <button
                      onClick={() => {
                        const note = prompt('Condition note upon return (optional):', 'Operational & Intact');
                        onReturnItem(item.id, note || undefined);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Return Gear</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIssuingItem(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition active:scale-95 shadow-sm"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Issue to Crew</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View: Transaction Audit Logs */}
      {activeView === 'LOGS' && (
        <div className="bg-[#0c1626] rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-400" />
            Lobby Store Movement Audit Log
          </h3>

          <div className="divide-y divide-slate-800 text-xs">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        tx.action === 'ISSUE'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      }`}
                    >
                      {tx.action === 'ISSUE' ? 'ISSUED' : 'RETURNED'}
                    </span>
                    <strong className="text-white">{tx.itemName}</strong>
                  </div>
                  <p className="text-slate-400 mt-0.5">
                    Crew: <strong className="text-white">{tx.crewName}</strong> ({tx.tokenNumber})
                    {tx.conditionNotes && <span className="text-slate-400"> — &quot;{tx.conditionNotes}&quot;</span>}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">
                  {tx.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Issue Gear */}
      {issuingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 backdrop-blur-xs">
          <div className="bg-[#0c1626] rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-700 space-y-3 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">
                Issue Equipment: {issuingItem.name}
              </h3>
              <button
                onClick={() => setIssuingItem(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Crew CMS Token No *
                </label>
                <input
                  type="text"
                  required
                  value={crewToken}
                  onChange={(e) => setCrewToken(e.target.value)}
                  placeholder="e.g. TK-4912"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Crew Name & Designation *
                </label>
                <input
                  type="text"
                  required
                  value={crewName}
                  onChange={(e) => setCrewName(e.target.value)}
                  placeholder="e.g. R. K. Sharma (LPG)"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Train No / Duty Note
                </label>
                <input
                  type="text"
                  value={issueNotes}
                  onChange={(e) => setIssueNotes(e.target.value)}
                  placeholder="e.g. Train BOXN-N KHS to JSG"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIssuingItem(null)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Store Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 backdrop-blur-xs">
          <div className="bg-[#0c1626] rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-700 space-y-3 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">Add New Lobby Equipment</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as StoreItem['category'])}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="VHF">VHF Walkie-Talkie Set</option>
                  <option value="TORCH">Tri-Color Hand Lamp</option>
                  <option value="DETONATOR">Safety Detonators Box</option>
                  <option value="TAIL_LAMP">Train Tail Lamp</option>
                  <option value="FLAGS">Hand Signal Flags</option>
                  <option value="BATTERY">VHF Spare Battery</option>
                  <option value="BA_TESTER">Alcolizer BA Tester</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Item Description *</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Motorola VHF 5W Walkie-Talkie"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Serial / Asset ID *</label>
                <input
                  type="text"
                  required
                  value={newItemSerial}
                  onChange={(e) => setNewItemSerial(e.target.value)}
                  placeholder="e.g. KHS-VHF-049"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
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
                  Add to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
