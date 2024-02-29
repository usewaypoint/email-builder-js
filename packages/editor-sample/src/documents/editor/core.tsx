import React from 'react';
import { z } from 'zod';

import { Avatar, AvatarProps, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { Button, ButtonProps, ButtonPropsSchema } from '@usewaypoint/block-button';
import { Divider, DividerProps, DividerPropsSchema } from '@usewaypoint/block-divider';
import { Heading, HeadingProps, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Html, HtmlProps, HtmlPropsSchema } from '@usewaypoint/block-html';
import { Image, ImageProps, ImagePropsSchema } from '@usewaypoint/block-image';
import { Spacer, SpacerProps, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { Text, TextProps, TextPropsSchema } from '@usewaypoint/block-text';
import { buildBlockComponent, buildBlockConfigurationSchema } from '@usewaypoint/document-core';

import { EditorColumnsContainer } from '../blocks/ColumnsContainer';
import ColumnsContainerPropsSchema, {
  ColumnsContainerProps,
} from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import { EditorContainer } from '../blocks/Container';
import { ContainerProps, ContainerPropsSchema } from '../blocks/Container/ContainerPropsSchema';
import { EditorEmailLayout, EmailLayoutProps } from '../blocks/EmailLayout';
import { EmailLayoutPropsSchema } from '../blocks/EmailLayout/EmailLayoutPropsSchema';
import EditorBlockWrapper from '../blocks/helpers/block-wrappers/EditorBlockWrapper';

const EDITOR_DICTIONARY = {
  Avatar: {
    schema: AvatarPropsSchema,
    Component: (props: AvatarProps) => (
      <EditorBlockWrapper>
        <Avatar {...props} />
      </EditorBlockWrapper>
    ),
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: (props: ButtonProps) => (
      <EditorBlockWrapper>
        <Button {...props} />
      </EditorBlockWrapper>
    ),
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: (props: ContainerProps) => (
      <EditorBlockWrapper>
        <EditorContainer {...props} />
      </EditorBlockWrapper>
    ),
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: (props: ColumnsContainerProps) => (
      <EditorBlockWrapper>
        <EditorColumnsContainer {...props} />
      </EditorBlockWrapper>
    ),
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: (props: HeadingProps) => (
      <EditorBlockWrapper>
        <Heading {...props} />
      </EditorBlockWrapper>
    ),
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: (props: HtmlProps) => (
      <EditorBlockWrapper>
        <Html {...props} />
      </EditorBlockWrapper>
    ),
  },
  Image: {
    schema: ImagePropsSchema,
    Component: (data: ImageProps) => {
      const props = {
        ...data,
        props: {
          ...data.props,
          url: data.props?.url ?? 'https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image',
        },
      };
      return (
        <EditorBlockWrapper>
          <Image {...props} />
        </EditorBlockWrapper>
      );
    },
  },
  Text: {
    schema: TextPropsSchema,
    Component: (props: TextProps) => (
      <EditorBlockWrapper>
        <Text {...props} />
      </EditorBlockWrapper>
    ),
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
    Component: (props: SpacerProps) => (
      <EditorBlockWrapper>
        <Spacer {...props} />
      </EditorBlockWrapper>
    ),
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: (props: DividerProps) => (
      <EditorBlockWrapper>
        <Divider {...props} />
      </EditorBlockWrapper>
    ),
  },
};

export const EditorBlock = buildBlockComponent(EDITOR_DICTIONARY);
export const EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY);
export const EditorConfigurationSchema = z.record(z.string(), EditorBlockSchema);

export type TEditorBlock = z.infer<typeof EditorBlockSchema>;
export type TEditorConfiguration = Record<string, TEditorBlock>;
