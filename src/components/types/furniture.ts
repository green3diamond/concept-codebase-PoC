export interface FurnitureItem {
  id: string;
  name: string;
  color: string;
  size: string;
  type: string;
  position: [number, number, number];
  rotation: number;
}

export interface ColorOption {
  label: string;
  color: string;
  value: string;
  name: string;
}

export interface SizeOption {
  label: string;
  measurement: string;
  value: string;
}

