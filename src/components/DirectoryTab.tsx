import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Phone, 
  MessageSquare, 
  UserPlus, 
  Star, 
  Download, 
  Copy, 
  Check, 
  X,
  Building2,
  Users
} from 'lucide-react';
import { Contact } from '../types';
import { LOBBIES } from '../data/lobbies';
import { getTelUrl, getWhatsAppUrl, downloadContactVCard } from '../data/contacts';

interface DirectoryTabProps {
  contacts: Contact[];
  favorites: string[];
  toggleFavorite: (contactId: string) => void;
  onOpenAddModal: () => void;
}

export const DirectoryTab: React.FC<DirectoryTabProps> = ({
  contacts,
  favorites,
  toggleFavorite,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLobby, setSelectedLobby] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(50);

  // Copy phone number to clipboard
  const handleCopyPhone = (contact: Contact) => {
    navigator.clipboard.writeText(contact.phone);
    setCopiedId(contact.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered contacts calculation
  const filteredContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return contacts.filter((item) => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // Lobby filter
      if (selectedLobby !== 'ALL') {
        if (selectedLobby === 'SPECIAL') {
          if (!['KHS', 'RIG', 'BSP', 'CPH', 'KRBA', 'RIG_CLI', 'BSP_TLC'].includes(item.lobbyCode)) {
            // Keep special
          } else {
            return false;
          }
        } else if (item.lobbyCode !== selectedLobby) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'ALL' && item.categoryCode !== selectedCategory) {
        return false;
      }

      // Search text query
      if (q) {
        const matchName = item.name.toLowerCase().includes(q);
        const matchPhone = item.phone.includes(q);
        const matchLobby = item.lobby.toLowerCase().includes(q) || item.lobbyCode.toLowerCase().includes(q);
        const matchDesig = item.designation?.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        return matchName || matchPhone || matchLobby || matchDesig || matchCat;
      }

      return true;
    });
  }, [contacts, searchQuery, selectedLobby, selectedCategory, showOnlyFavorites, favorites]);

  // Categories list based on selected lobby or global
  const categoryOptions = [
    { code: 'ALL', label: 'All Categories' },
    { code: 'LPG', label: 'LP (Goods)' },
    { code: 'ALP', label: 'ALP' },
    { code: 'TM', label: 'TM / Guard' },
    { code: 'TLC', label: 'TLC' },
    { code: 'DPC', label: 'DPC' },
    { code: 'CLI', label: 'CLI' },
    { code: 'STN', label: 'Station Master' },
    { code: 'LOBBY', label: 'Lobby Staff' },
    { code: 'SHUNTING', label: 'Shunting' },
    { code: 'PASSENGER', label: 'Passenger' },
  ];

  return (
    <div className="pb-20 space-y-3 animate-fadeIn">
      {/* Top Search & Filter Bar */}
      <div className="bg-[#0c1626] rounded-2xl shadow-sm border border-slate-800 p-3.5 space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="directory-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayLimit(50);
            }}
            placeholder="Search by crew name, mobile no, lobby (e.g., Kharsia, 97524...)"
            className="w-full pl-9 pr-9 py-2 bg-slate-900 text-white placeholder-slate-500 rounded-xl text-xs sm:text-sm border border-slate-700/80 focus:outline-none focus:border-amber-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Lobby Selector Pills (Horizontal Scroll) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Select Lobby / Division:</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {filteredContacts.length} contacts
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              id="lobby-filter-all"
              onClick={() => {
                setSelectedLobby('ALL');
                setDisplayLimit(50);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedLobby === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Lobbies
            </button>

            {LOBBIES.map((lobby) => (
              <button
                key={lobby.id}
                id={`lobby-filter-${lobby.id.toLowerCase()}`}
                onClick={() => {
                  setSelectedLobby(lobby.id);
                  setDisplayLimit(50);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                  selectedLobby === lobby.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{lobby.code}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded-full ${
                  selectedLobby === lobby.id ? 'bg-amber-950 text-amber-200' : 'bg-slate-800 text-slate-400'
                }`}>
                  {lobby.totalContacts}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector Pills + Action Row */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categoryOptions.map((cat) => (
              <button
                key={cat.code}
                onClick={() => {
                  setSelectedCategory(cat.code);
                  setDisplayLimit(50);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition ${
                  selectedCategory === cat.code
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Favorites filter toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition flex items-center gap-1 ${
                showOnlyFavorites
                  ? 'bg-amber-950 text-amber-300 border-amber-600/60'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
              title="Filter Starred Contacts"
            >
              <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline text-[11px]">Starred</span>
            </button>

            {/* Add Contact Button */}
            <button
              id="directory-add-contact-btn"
              onClick={onOpenAddModal}
              className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition flex items-center gap-1 shadow-sm active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Staff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(selectedLobby !== 'ALL' || selectedCategory !== 'ALL' || showOnlyFavorites || searchQuery) && (
        <div className="flex items-center justify-between bg-amber-950/40 px-3 py-1.5 rounded-xl text-xs text-amber-300 border border-amber-800/50">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-bold text-amber-400">Active:</span>
            <span className="truncate text-slate-300">
              {selectedLobby !== 'ALL' && `[Lobby: ${selectedLobby}] `}
              {selectedCategory !== 'ALL' && `[Category: ${selectedCategory}] `}
              {showOnlyFavorites && `[Starred Only] `}
              {searchQuery && `[Search: "${searchQuery}"]`}
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedLobby('ALL');
              setSelectedCategory('ALL');
              setShowOnlyFavorites(false);
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 hover:text-amber-200 underline font-semibold flex-shrink-0 ml-2"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Contacts List */}
      {filteredContacts.length === 0 ? (
        <div className="bg-[#0c1626] rounded-2xl p-8 text-center border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">No Crew or Staff Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No contacts match the query &quot;{searchQuery}&quot; with selected filters. Try broadening your lobby or category selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLobby('ALL');
              setSelectedCategory('ALL');
              setShowOnlyFavorites(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredContacts.slice(0, displayLimit).map((contact) => {
            const isFav = favorites.includes(contact.id);
            const isCopied = copiedId === contact.id;

            return (
              <div
                key={contact.id}
                className="bg-[#0c1626] rounded-2xl p-3 border border-slate-800/80 shadow-sm hover:border-slate-700 transition flex items-center justify-between gap-3"
              >
                {/* Left: Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Category badge */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      contact.categoryCode === 'LPG' 
                        ? 'bg-blue-950 text-blue-300 border border-blue-800/60'
                        : contact.categoryCode === 'ALP'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                        : contact.categoryCode === 'TM'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800/60'
                        : contact.categoryCode === 'TLC' || contact.categoryCode === 'DPC'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                        : contact.categoryCode === 'CLI'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}>
                      {contact.category}
                    </span>

                    {/* Lobby code tag */}
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
                      {contact.lobbyCode} ({contact.lobby})
                    </span>

                    {contact.designation && (
                      <span className="text-[10px] text-slate-400 truncate">
                        • {contact.designation}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="text-sm font-bold text-white truncate leading-snug">
                    {contact.name}
                  </h4>

                  {/* Phone number display with tap to copy */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono font-semibold tracking-wide text-amber-300">
                      {contact.phone}
                    </span>
                    <button
                      onClick={() => handleCopyPhone(contact)}
                      className="text-slate-400 hover:text-white p-0.5"
                      title="Copy Mobile Number"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {isCopied && (
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Quick Action Buttons (Native Android style) */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Star/Bookmark */}
                  <button
                    onClick={() => toggleFavorite(contact.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>

                  {/* Save vCard to Android Contacts */}
                  <button
                    onClick={() => downloadContactVCard(contact)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                    title="Save to Phone Contacts (vCard)"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {/* WhatsApp Message */}
                  <a
                    href={getWhatsAppUrl(contact.phone, `Namaste ${contact.name} Ji, SECR Kharsia Lobby Call Book 3.0 regarding train duty.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 transition"
                    title="Send WhatsApp Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  {/* Direct Phone Call Button */}
                  <a
                    href={getTelUrl(contact.phone)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition active:scale-95"
                    title="Call directly"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Call</span>
                  </a>
                </div>
              </div>
            );
          })}

          {/* Load More Pagination */}
          {filteredContacts.length > displayLimit && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setDisplayLimit((prev) => prev + 50)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 text-xs font-bold transition border border-slate-800"
              >
                Load More ({filteredContacts.length - displayLimit} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
