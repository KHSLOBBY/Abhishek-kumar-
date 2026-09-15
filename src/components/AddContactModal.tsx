import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Contact, LobbyId, CategoryId } from '../types';
import { LOBBIES } from '../data/lobbies';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onAddContact,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lobbyCode, setLobbyCode] = useState<LobbyId>('KHS');
  const [categoryCode, setCategoryCode] = useState<CategoryId>('LPG');
  const [designation, setDesignation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const matchedLobby = LOBBIES.find((l) => l.code === lobbyCode);
    const lobbyName = matchedLobby ? matchedLobby.name : lobbyCode;

    let categoryName = 'LP (Goods)';
    if (categoryCode === 'ALP') categoryName = 'ALP';
    else if (categoryCode === 'TM') categoryName = 'TM / Guard';
    else if (categoryCode === 'TLC') categoryName = 'TLC';
    else if (categoryCode === 'DPC') categoryName = 'DPC';
    else if (categoryCode === 'CLI') categoryName = 'CLI';
    else if (categoryCode === 'STN') categoryName = 'Station Master';
    else if (categoryCode === 'SHUNTING') categoryName = 'Shunting Staff';
    else if (categoryCode === 'PASSENGER') categoryName = 'LP (Passenger)';

    onAddContact({
      name: name.trim(),
      phone: phone.trim().replace(/\D/g, ''),
      lobby: lobbyName,
      lobbyCode,
      category: categoryName,
      categoryCode,
      designation: designation.trim() || undefined,
    });

    // Reset & close
    setName('');
    setPhone('');
    setDesignation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <UserPlus className="w-5 h-5 text-amber-600" />
            Add Staff to Call Book
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Full Name (with CMS designation if any) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. S. K. SHARMA G12"
              className="w-full p-2 bg-slate-50 border rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Mobile Number (10 digits) *
            </label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9752876880"
              className="w-full p-2 bg-slate-50 border rounded-lg focus:ring-1 focus:ring-amber-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Lobby *</label>
              <select
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value as LobbyId)}
                className="w-full p-2 bg-slate-50 border rounded-lg"
              >
                {LOBBIES.map((l) => (
                  <option key={l.id} value={l.code}>
                    {l.code} - {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category *</label>
              <select
                value={categoryCode}
                onChange={(e) => setCategoryCode(e.target.value as CategoryId)}
                className="w-full p-2 bg-slate-50 border rounded-lg"
              >
                <option value="LPG">LP (Goods)</option>
                <option value="ALP">ALP</option>
                <option value="TM">TM / Guard</option>
                <option value="TLC">TLC</option>
                <option value="DPC">DPC</option>
                <option value="CLI">CLI</option>
                <option value="STN">Station Master</option>
                <option value="SHUNTING">Shunting Staff</option>
                <option value="PASSENGER">LP (Passenger)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Designation / Note (Optional)
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g. CLI Incharge / CMS Shift A"
              className="w-full p-2 bg-slate-50 border rounded-lg"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
