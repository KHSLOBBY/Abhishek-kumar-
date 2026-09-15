export type TabType = 
  | 'menu' 
  | 'directory' 
  | 'longhours' 
  | 'store' 
  | 'emergency' 
  | 'safety'
  | 'jeep'
  | 'pdd_pad'
  | 'roster';

export type LobbyId =
  | 'SPECIAL'
  | 'AKT'
  | 'BRJN'
  | 'BJRI'
  | 'BSP'
  | 'BYT'
  | 'DBEC'
  | 'KHS'
  | 'KRBA'
  | 'PND'
  | 'RIG'
  | 'SDL'
  | 'SJQ'
  | 'USL';

export type CategoryId =
  | 'ALL'
  | 'LPG'
  | 'ALP'
  | 'TM'
  | 'SHUNTING'
  | 'PASSENGER'
  | 'TLC'
  | 'DPC'
  | 'STN'
  | 'CLI'
  | 'LOBBY'
  | 'CCC'
  | 'MISC';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  lobby: string;
  lobbyCode: LobbyId;
  category: string;
  categoryCode: CategoryId;
  designation?: string;
  isCustom?: boolean;
}

export interface LobbyInfo {
  id: LobbyId;
  name: string;
  displayName: string;
  code: string;
  totalContacts: number;
  categories: {
    code: CategoryId;
    label: string;
    count: number;
  }[];
}

export interface LongHourDuty {
  id: string;
  trainNo: string;
  locoNo: string;
  lpName: string;
  lpPhone?: string;
  alpName: string;
  alpPhone?: string;
  tmName?: string;
  signOnTime: string; // ISO string or HH:MM
  fromStation: string;
  toStation: string;
  currentStation: string;
  status: 'ACTIVE' | 'RELIEVED' | 'SIGNED_OFF';
  remarks?: string;
  createdAt: number;
}

export type StoreCategory = 'VHF' | 'BATTERY' | 'TORCH' | 'DETONATOR' | 'TAIL_LAMP' | 'FLAGS' | 'BA_TESTER';

export interface StoreItem {
  id: string;
  category: StoreCategory;
  name: string;
  serialNumber: string;
  status: 'AVAILABLE' | 'ISSUED' | 'MAINTENANCE';
  currentHolderToken?: string;
  currentHolderName?: string;
  lastIssuedAt?: string;
}

export interface StoreTransaction {
  id: string;
  itemId: string;
  itemName: string;
  tokenNumber: string;
  crewName: string;
  action: 'ISSUE' | 'RETURN';
  timestamp: string;
  conditionNotes?: string;
}

export interface CautionOrder {
  id: string;
  section: string; // e.g. "KHS - RIG", "CPH - KHS"
  direction: 'UP' | 'DN' | 'BOTH';
  kmFrom: string;
  kmTo: string;
  speedLimitKmph: number;
  normalSpeedKmph: number;
  reason: string;
  cautionType: 'TSR' | 'PSR' | 'ENGINEERING';
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export interface BreathAnalyzerRecord {
  id: string;
  tokenNo: string;
  crewName: string;
  designation: string;
  dutyType: 'SIGN_ON' | 'SIGN_OFF';
  bacReading: number; // 0.00 is required
  passed: boolean;
  timestamp: string;
  supervisorName: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  alternatePhone?: string;
  location: string;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
}
