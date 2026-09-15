import { Contact, LobbyId, CategoryId } from '../types';
import { SPECIAL_CONTACTS } from './contactsSpecial';
import { LOBBY_1_CONTACTS } from './contactsLobbies1';
import { LOBBY_2_CONTACTS } from './contactsLobbies2';
import { LOBBY_3_CONTACTS } from './contactsLobbies3';

export const INITIAL_CONTACTS: Contact[] = [
  ...SPECIAL_CONTACTS,
  ...LOBBY_1_CONTACTS,
  ...LOBBY_2_CONTACTS,
  ...LOBBY_3_CONTACTS,
];

// Helper to sanitize phone for WhatsApp
export function getWhatsAppUrl(phone: string, text?: string): string {
  // Strip non-digits
  const clean = phone.replace(/\D/g, '');
  // If Indian 10-digit number, prepend country code 91
  const fullNumber = clean.length === 10 ? `91${clean}` : clean;
  const url = `https://wa.me/${fullNumber}`;
  if (text) {
    return `${url}?text=${encodeURIComponent(text)}`;
  }
  return url;
}

// Helper to sanitize phone for Tel call
export function getTelUrl(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  return `tel:${clean}`;
}

// Generate vCard for native Android Contacts import
export function generateVCard(contact: Contact): string {
  const clean = contact.phone.replace(/\D/g, '');
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.name} (${contact.category} - ${contact.lobby})`,
    `N:${contact.name};;;;`,
    `ORG:South East Central Railway;${contact.lobby} Lobby`,
    `TITLE:${contact.category} - SECR Bilaspur`,
    `TEL;TYPE=CELL,VOICE:${clean}`,
    `NOTE:Kharsia Lobby Call Book 3.0 / SECR Indian Railways`,
    'END:VCARD',
  ].join('\r\n');
}

export function downloadContactVCard(contact: Contact) {
  const vcard = generateVCard(contact);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${contact.name.replace(/\s+/g, '_')}_KHS.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
