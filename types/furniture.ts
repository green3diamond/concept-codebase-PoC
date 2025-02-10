export interface FurnitureItem {
  id: string;
  name: string;
  color: string;
  size: string;
  originalSize: number;
  type: string;
  position: [number, number, number];
  rotation: number;
  isEditVisible?: boolean;
  nickname?: string;
  fileName: string;
  image?:string;
  colors?: string[];
  measurements?: string[];
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

