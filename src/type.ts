export interface GuestWishRequest {
  name: string;
  relationship: 'family' | 'friend' | 'colleague' | 'other';
  tone: 'heartfelt' | 'funny' | 'formal' | 'poetic';
}

export interface RSVPData {
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  message: string;
}

export enum EventType {
  CEREMONY = 'CEREMONY',
  RECEPTION = 'RECEPTION'
}