export interface Address {
  streetName: string; // Name of the street
  streetType: 'vertical' | 'horizontal'|'intersection';
  number: number; // Closest address number (1-100)
}
export interface Street {
  name: string; // 'A', 'B', ..., 'J' for vertical, or '1st', '2nd', ..., '10th' for horizontal
  type: 'vertical' | 'horizontal';
  positions: number[]; // Break the street into numbers 1-100
}
export type StreetAddressDisplay = { streetName: string; streetType: string; number: number };

export interface DotLocation {
  x: number;
  y: number;
  address: string;
}
export type Directions = { direction: 'left' | 'right' | 'up' | 'down'; distance: number }[];