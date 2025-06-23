export type TStyle = {
  backgroundColor?: string | null; // e.g. '#ffffff'
  borderColor?: string | null; // e.g. '#000000'
  borderRadius?: number | null; // e.g. 4 (for 4px)
  color?: string; // e.g. '#333333'
  fontFamily?: string | null; // e.g. 'Arial, sans-serif'
  fontSize?: number | null; // e.g. 16 (for 16px)
  fontWeight?: 'bold' | 'normal' | null; // e.g. 400 (for normal weight) or 700 (for bold)
  padding?: { top: number; bottom: number; right: number; left: number } | null; // e.g. { top: 10, bottom: 10, right: 15, left: 15 }
  textAlign?: 'center' | 'left' | 'right' | null;
};
