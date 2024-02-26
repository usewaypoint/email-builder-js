import React, { CSSProperties } from 'react';
import { z } from 'zod';

import { TEditorBlock } from '../../editor/core';
import { useCurrentBlockId } from '../../editor/EditorBlock';
import { useEditorState } from '../../editor/EditorContext';
import ReaderBlock from '../../reader/ReaderBlock';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import { EmailLayoutPropsSchema } from './EmailLayoutPropsSchema';

// Based on https://modernfontstacks.com/#font-stacks
const FONT_FAMILY_MAPPINGS = {
  MODERN_SANS: '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif',
  BOOK_SANS: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
  ORGANIC_SANS: 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif',
  GEOMETRIC_SANS: 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif',
  HEAVY_SANS:
    'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif',
  ROUNDED_SANS:
    'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif',
  MODERN_SERIF: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif',
  BOOK_SERIF: '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif',
  MONOSPACE: '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace',
};

export type EmailLayoutProps = z.infer<typeof EmailLayoutPropsSchema>;

export function EmailLayout(props: EmailLayoutProps) {
  return (
    <SharedLayout {...props}>
      {props.childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </SharedLayout>
  );
}

export function EditorEmailLayout(props: EmailLayoutProps) {
  const [{ document }, setEditorState] = useEditorState();
  const blockId = useCurrentBlockId();
  const childrenIds = props.childrenIds;

  const insertBlock = (blockConfiguration: TEditorBlock, i: number | null) => {
    const id = `block-${Date.now()}`;
    const getChildrenIds = () => {
      if (i === null) {
        return [...childrenIds, id];
      }
      return [...childrenIds.slice(0, i), id, ...childrenIds.slice(i)];
    };

    setEditorState({
      selectedBlockId: id,
      document: {
        ...document,
        [id]: blockConfiguration,
        [blockId]: {
          type: 'EmailLayout',
          data: {
            ...document[blockId].data,
            childrenIds: getChildrenIds(),
          },
        } as TEditorBlock,
      },
    });
  };

  return (
    <div
      style={{ height: '100%' }}
      onClick={() => {
        setEditorState({
          selectedSidebarTab: 'styles',
          selectedBlockId: null,
        });
      }}
    >
      <SharedLayout {...props}>
        <EditorChildrenIds childrenIds={childrenIds} insertBlock={insertBlock} />
      </SharedLayout>
    </div>
  );
}

type SharedLayoutProps = EmailLayoutProps & {
  children: JSX.Element[] | JSX.Element;
};
function SharedLayout({ children, fontFamily, backdropColor, textColor, canvasColor }: SharedLayoutProps) {
  const backdropStyle: CSSProperties = {
    backgroundColor: backdropColor,
    color: textColor,
    fontFamily: FONT_FAMILY_MAPPINGS[fontFamily],
    fontSize: '16px',
    fontWeight: '400',
    letterSpacing: '0.15008px',
    lineHeight: '1.5',
    margin: '0',
    padding: '32px 0',
    minHeight: '100%',
    width: '100%',
  };
  const canvasStyle: CSSProperties = {
    margin: '0 auto',
    maxWidth: '600px',
    backgroundColor: canvasColor,
  };
  return (
    <div style={backdropStyle}>
      <table
        align="center"
        width="100%"
        style={canvasStyle}
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
      >
        <tbody>
          <tr style={{ width: '100%' }}>
            <td>{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
