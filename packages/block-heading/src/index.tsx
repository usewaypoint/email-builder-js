import React, { CSSProperties } from 'react';
import { z } from 'zod';

function zColor() {
  return z.string().regex(/^#[0-9a-fA-F]{6}$/);
}

const FONT_FAMILY_NAMES = [
  'MODERN_SANS',
  'BOOK_SANS',
  'ORGANIC_SANS',
  'GEOMETRIC_SANS',
  'HEAVY_SANS',
  'ROUNDED_SANS',
  'MODERN_SERIF',
  'BOOK_SERIF',
  'MONOSPACE',
] as const;

export const HeadingPropsSchema = z.object({
  props: z.object({
    text: z.string().default('Hello world'),
    level: z.enum(['h1', 'h2', 'h3']).default('h2'),
  }),
  style: z.object({
    color: zColor().optional().nullish().default(null),
    backgroundColor: zColor().optional().nullish().default(null),
    fontFamily: z.enum(FONT_FAMILY_NAMES).optional().nullish().default(null),
    fontWeight: z.enum(['bold', 'normal']).optional().nullish().default('bold'),
    textAlign: z.enum(['left', 'center', 'right']).optional().nullish().default(null),
    padding: z
      .object({
        top: z.number(),
        bottom: z.number(),
        right: z.number(),
        left: z.number(),
      })
      .optional()
      .nullish()
      .default(null),
  }),
});

export type HeadingProps = z.infer<typeof HeadingPropsSchema>;

export function Heading({
  props: { text, level },
  style: { color, backgroundColor, fontFamily, fontWeight, textAlign, padding },
}: HeadingProps) {
  const style: CSSProperties = {
    color: color ?? undefined,
    backgroundColor: backgroundColor ?? undefined,
    fontWeight: fontWeight ?? undefined,
    textAlign: textAlign ?? undefined,
    margin: 0,
    fontFamily: getFontFamily(fontFamily),
    fontSize: getFontSize(level),
    padding: getPadding(padding),
  };
  switch (level) {
    case 'h1':
      return <h1 style={style}>{text}</h1>;
    case 'h2':
      return <h2 style={style}>{text}</h2>;
    case 'h3':
      return <h3 style={style}>{text}</h3>;
  }
}

function getFontSize(level: 'h1' | 'h2' | 'h3') {
  switch (level) {
    case 'h1':
      return 32;
    case 'h2':
      return 24;
    case 'h3':
      return 20;
  }
}

function getPadding(value: HeadingProps['style']['padding']) {
  if (!value) {
    return undefined;
  }
  return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
}

function getFontFamily(value: HeadingProps['style']['fontFamily']) {
  switch (value) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
}
