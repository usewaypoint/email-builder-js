export type TStyle = {
  backgroundColor?: string; // e.g. '#ffffff'
  borderColor?: string; // e.g. '#000000'
  borderRadius?: number; // e.g. 4 (for 4px)
  color?: string; // e.g. '#333333'
  fontFamily?: string; // e.g. 'Arial, sans-serif'
  fontSize?: number; // e.g. 16 (for 16px)
  fontWeight?: number; // e.g. 400 (for normal weight) or 700 (for bold)
  padding?: { top: number; bottom: number; right: number; left: number } | null; // e.g. { top: 10, bottom: 10, right: 15, left: 15 }
  textAlign?: 'center' | 'left' | 'right' | null;
};
