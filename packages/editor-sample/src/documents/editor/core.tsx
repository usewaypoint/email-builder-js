import React from 'react';
import { z } from 'zod';

import { Heading, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Spacer, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { buildBlockComponent, buildBlockConfigurationSchema } from '@usewaypoint/document-core';

import { Avatar, AvatarPropsSchema } from '../blocks/Avatar';
import { Button, ButtonPropsSchema } from '../blocks/Button';
import { EditorColumnsContainer } from '../blocks/ColumnsContainer';
import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import { ContainerPropsSchema, EditorContainer } from '../blocks/Container';
import { Divider, DividerPropsSchema } from '../blocks/Divider';
import { EditorEmailLayout, EmailLayoutProps, EmailLayoutPropsSchema } from '../blocks/EmailLayout';
import { addEditorBlockWrapper } from '../blocks/helpers/block-wrappers';
import { Html, HtmlPropsSchema } from '../blocks/Html';
import { Image, ImagePropsSchema } from '../blocks/Image';
import { Text, TextPropsSchema } from '../blocks/Text';

const EDITOR_DICTIONARY = {
  Avatar: {
    schema: AvatarPropsSchema,
    Component: addEditorBlockWrapper(Avatar),
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: addEditorBlockWrapper(Button),
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: addEditorBlockWrapper(EditorContainer),
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: addEditorBlockWrapper(EditorColumnsContainer),
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: addEditorBlockWrapper(Divider),
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: addEditorBlockWrapper(Heading),
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: addEditorBlockWrapper(Html),
  },
  Image: {
    schema: ImagePropsSchema,
    Component: addEditorBlockWrapper(Image),
  },
  Text: {
    schema: TextPropsSchema,
    Component: addEditorBlockWrapper(Text),
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: (p: EmailLayoutProps) => (
      <div style={{ height: '100%' }}>
        <EditorEmailLayout {...p} />
      </div>
    ),
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: Spacer,
  },
};

export const EditorBlock = buildBlockComponent(EDITOR_DICTIONARY);
export const EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY);
export const EditorConfigurationSchema = z.record(z.string(), EditorBlockSchema);

export type TEditorBlock = z.infer<typeof EditorBlockSchema>;
export type TEditorConfiguration = Record<string, TEditorBlock>;
