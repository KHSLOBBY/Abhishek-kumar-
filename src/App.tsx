import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid,
  BookOpen, 
  Clock, 
  Package, 
  ShieldAlert, 
  AlertTriangle
} from 'lucide-react';
import { TabType, Contact, LongHourDuty, StoreItem, StoreTransaction, CautionOrder, BreathAnalyzerRecord } from './types';
import { INITIAL_CONTACTS } from './data/contacts';
import { 
  INITIAL_LONG_HOUR_DUTIES, 
  INITIAL_STORE_ITEMS, 
  INITIAL_STORE_TRANSACTIONS, 
  INITIAL_CAUTION_ORDERS, 
  INITIAL_BA_RECORDS 
} from './data/railwayOperations';

import { Header } from './components/Header';
import { MenuTab } from './components/MenuTab';
import { DirectoryTab } from './components/DirectoryTab';
import { LongHoursTab } from './components/LongHoursTab';
import { StoreRegisterTab } from './components/StoreRegisterTab';
import { EmergencyTab } from './components/EmergencyTab';
import { SafetyToolsTab } from './components/SafetyToolsTab';
import { JeepMovementTab } from './components/JeepMovementTab';
import { PddPadTab } from './components/PddPadTab';
import { RosterTlcTab } from './components/RosterTlcTab';
import { AddContactModal } from './components/AddContactModal';
import { InstallPrompt } from './components/InstallPrompt';

export default function App() {
  // Default to 'menu' so the user immediately sees the requested Module Hub!
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Contacts state with localStorage persistence
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_contacts_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_CONTACTS;
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_favorites_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Long Hour Duties state
  const [longHours, setLongHours] = useState<LongHourDuty[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_longhours_v1');
      return saved ? JSON.parse(saved) : INITIAL_LONG_HOUR_DUTIES;
    } catch {
      return INITIAL_LONG_HOUR_DUTIES;
    }
  });

  // Store Items state
  const [storeItems, setStoreItems] = useState<StoreItem[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_store_items_v1');
      return saved ? JSON.parse(saved) : INITIAL_STORE_ITEMS;
    } catch {
      return INITIAL_STORE_ITEMS;
    }
  });

  // Store Transactions state
  const [storeTransactions, setStoreTransactions] = useState<StoreTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_store_tx_v1');
      return saved ? JSON.parse(saved) : INITIAL_STORE_TRANSACTIONS;
    } catch {
      return INITIAL_STORE_TRANSACTIONS;
    }
  });

  // Caution Orders state
  const [cautionOrders, setCautionOrders] = useState<CautionOrder[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_cautions_v1');
      return saved ? JSON.parse(saved) : INITIAL_CAUTION_ORDERS;
    } catch {
      return INITIAL_CAUTION_ORDERS;
    }
  });

  // Breath Analyzer state
  const [baRecords, setBaRecords] = useState<BreathAnalyzerRecord[]>(() => {
    try {
      const saved = localStorage.getItem('khs_lobby_ba_records_v1');
      return saved ? JSON.parse(saved) : INITIAL_BA_RECORDS;
    } catch {
      return INITIAL_BA_RECORDS;
    }
  });

  // Modals state
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_contacts_v1', JSON.stringify(contacts));
    } catch {}
  }, [contacts]);

  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_favorites_v1', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_longhours_v1', JSON.stringify(longHours));
    } catch {}
  }, [longHours]);

  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_store_items_v1', JSON.stringify(storeItems));
    } catch {}
  }, [storeItems]);

  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_store_tx_v1', JSON.stringify(storeTransactions));
    } catch {}
  }, [storeTransactions]);

  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_cautions_v1', JSON.stringify(cautionOrders));
    } catch {}
  }, [cautionOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('khs_lobby_ba_records_v1', JSON.stringify(baRecords));
    } catch {}
  }, [baRecords]);

  // Online / Offline listeners & PWA install trigger
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Register service worker if supported
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('Kharsia Lobby PWA Service Worker Registered'))
        .catch((err) => console.log('SW registration note:', err));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      setShowInstallModal(true);
    }
  };

  const handleToggleFavorite = (contactId: string) => {
    setFavorites((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    );
  };

  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    const created: Contact = {
      ...newContact,
      id: `custom-${Date.now()}`,
    };
    setContacts((prev) => [created, ...prev]);
  };

  const handleAddLongHourDuty = (newDuty: Omit<LongHourDuty, 'id' | 'createdAt'>) => {
    const created: LongHourDuty = {
      ...newDuty,
      id: `lhu-${Date.now()}`,
      createdAt: Date.now(),
    };
    setLongHours((prev) => [created, ...prev]);
  };

  const handleUpdateLongHourStatus = (id: string, status: 'ACTIVE' | 'RELIEVED' | 'SIGNED_OFF') => {
    setLongHours((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const handleRelieveCrew = (id: string, reliefStation: string) => {
    setLongHours((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'RELIEVED',
              remarks: `${d.remarks ? d.remarks + ' • ' : ''}Relieved at ${reliefStation} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            }
          : d
      )
    );
  };

  const handleIssueStoreItem = (itemId: string, token: string, name: string, notes?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let targetItemName = 'Equipment';
    setStoreItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          targetItemName = item.name;
          return {
            ...item,
            status: 'ISSUED',
            currentHolderToken: token,
            currentHolderName: name,
            lastIssuedAt: nowStr,
          };
        }
        return item;
      })
    );

    const newTx: StoreTransaction = {
      id: `tx-${Date.now()}`,
      itemId,
      itemName: targetItemName,
      action: 'ISSUE',
      timestamp: `Today at ${nowStr}`,
      tokenNumber: token,
      crewName: name,
      conditionNotes: notes,
    };
    setStoreTransactions((prev) => [newTx, ...prev]);
  };

  const handleReturnStoreItem = (itemId: string, conditionNotes?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let targetItemName = 'Equipment';
    let prevHolder = 'Crew';
    let prevToken = 'TK';

    setStoreItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          targetItemName = item.name;
          prevHolder = item.currentHolderName || 'Crew';
          prevToken = item.currentHolderToken || 'TK';
          return {
            ...item,
            status: 'AVAILABLE',
            currentHolderToken: undefined,
            currentHolderName: undefined,
          };
        }
        return item;
      })
    );

    const newTx: StoreTransaction = {
      id: `tx-${Date.now()}`,
      itemId,
      itemName: targetItemName,
      action: 'RETURN',
      timestamp: `Today at ${nowStr}`,
      tokenNumber: prevToken,
      crewName: prevHolder,
      conditionNotes: conditionNotes || 'Returned in good operational condition',
    };
    setStoreTransactions((prev) => [newTx, ...prev]);
  };

  const handleAddStoreItem = (item: Omit<StoreItem, 'id' | 'status'>) => {
    const created: StoreItem = {
      ...item,
      id: `st-${Date.now()}`,
      status: 'AVAILABLE',
    };
    setStoreItems((prev) => [...prev, created]);
  };

  const handleAddCautionOrder = (order: Omit<CautionOrder, 'id' | 'isActive'>) => {
    const created: CautionOrder = {
      ...order,
      id: `co-${Date.now()}`,
      isActive: true,
    };
    setCautionOrders((prev) => [created, ...prev]);
  };

  const handleAddBaRecord = (record: Omit<BreathAnalyzerRecord, 'id'>) => {
    const created: BreathAnalyzerRecord = {
      ...record,
      id: `ba-${Date.now()}`,
    };
    setBaRecords((prev) => [created, ...prev]);
  };

  // Critical long hour duties count (>9 hrs active)
  const criticalCount = longHours.filter((d) => {
    if (d.status !== 'ACTIVE') return false;
    const diffHours = (Date.now() - new Date(d.signOnTime).getTime()) / (1000 * 60 * 60);
    return diffHours >= 9;
  }).length;

  const availableStoreCount = storeItems.filter((i) => i.status === 'AVAILABLE').length;

  return (
    <div className="min-h-screen bg-[#070e1a] text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Top Application Header matching user's screenshot */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOnline={isOnline}
        totalContactsCount={contacts.length}
        criticalLongHoursCount={criticalCount}
        availableStoreItemsCount={availableStoreCount}
        onInstallClick={handleInstallClick}
        showInstallBtn={true}
      />

      {/* Main Tab Content Canvas */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-3 sm:p-4">
        {activeTab === 'menu' && (
          <MenuTab
            onSelectModule={(tab) => setActiveTab(tab)}
            totalContactsCount={contacts.length}
            criticalLongHoursCount={criticalCount}
            availableStoreItemsCount={availableStoreCount}
          />
        )}

        {activeTab === 'directory' && (
          <DirectoryTab
            contacts={contacts}
            favorites={favorites}
            toggleFavorite={handleToggleFavorite}
            onOpenAddModal={() => setShowAddContactModal(true)}
          />
        )}

        {activeTab === 'longhours' && (
          <LongHoursTab
            duties={longHours}
            onAddDuty={handleAddLongHourDuty}
            onUpdateDutyStatus={handleUpdateLongHourStatus}
            onRelieveCrew={handleRelieveCrew}
          />
        )}

        {activeTab === 'store' && (
          <StoreRegisterTab
            items={storeItems}
            transactions={storeTransactions}
            onIssueItem={handleIssueStoreItem}
            onReturnItem={handleReturnStoreItem}
            onAddItem={handleAddStoreItem}
          />
        )}

        {activeTab === 'emergency' && <EmergencyTab />}

        {activeTab === 'safety' && (
          <SafetyToolsTab
            cautionOrders={cautionOrders}
            baRecords={baRecords}
            onAddCautionOrder={handleAddCautionOrder}
            onAddBaRecord={handleAddBaRecord}
          />
        )}

        {activeTab === 'jeep' && (
          <JeepMovementTab onBackToMenu={() => setActiveTab('menu')} />
        )}

        {activeTab === 'pdd_pad' && (
          <PddPadTab onBackToMenu={() => setActiveTab('menu')} />
        )}

        {activeTab === 'roster' && (
          <RosterTlcTab onBackToMenu={() => setActiveTab('menu')} />
        )}
      </main>

      {/* Mobile Android Bottom Navigation Bar - Active Services Only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#060c16] border-t border-slate-800/80 py-1.5 px-3 shadow-2xl flex items-center justify-around backdrop-blur-md">
        <button
          id="bottom-nav-menu"
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            activeTab === 'menu' ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-[10.5px] mt-0.5">Menu</span>
        </button>

        <button
          id="bottom-nav-directory"
          onClick={() => setActiveTab('directory')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            activeTab === 'directory' ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10.5px] mt-0.5">Directory</span>
        </button>

        <button
          id="bottom-nav-safety"
          onClick={() => setActiveTab('safety')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            activeTab === 'safety' ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-[10.5px] mt-0.5">Safety &amp; BA</span>
        </button>

        <button
          id="bottom-nav-emergency"
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            activeTab === 'emergency' ? 'text-rose-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span className="text-[10.5px] mt-0.5">Hotlines</span>
        </button>
      </div>

      {/* Add Staff Modal */}
      <AddContactModal
        isOpen={showAddContactModal}
        onClose={() => setShowAddContactModal(false)}
        onAddContact={handleAddContact}
      />

      {/* Android PWA Install Modal */}
      <InstallPrompt
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={handleInstallClick}
        canInstallPrompt={!!deferredPrompt}
      />
    </div>
  );
}
