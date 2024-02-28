import { z } from 'zod';

import { Avatar, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { Button, ButtonPropsSchema } from '@usewaypoint/block-button';
import { Divider, DividerPropsSchema } from '@usewaypoint/block-divider';
import { Heading, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Html, HtmlPropsSchema } from '@usewaypoint/block-html';
import { Image, ImagePropsSchema } from '@usewaypoint/block-image';
import { Spacer, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { Text, TextPropsSchema } from '@usewaypoint/block-text';
import { buildBlockComponent, buildBlockConfigurationSchema } from '@usewaypoint/document-core';

import { ColumnsContainer } from '../blocks/ColumnsContainer';
import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import { Container } from '../blocks/Container';
import { ContainerPropsSchema } from '../blocks/Container/ContainerPropsSchema';
import { EmailLayout } from '../blocks/EmailLayout';
import { EmailLayoutPropsSchema } from '../blocks/EmailLayout/EmailLayoutPropsSchema';

const READER_DICTIONARY = {
  Avatar: {
    schema: AvatarPropsSchema,
    Component: Avatar,
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: Button,
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: ColumnsContainer,
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: Container,
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: Divider,
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: Heading,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: Html,
  },
  Image: {
    schema: ImagePropsSchema,
    Component: Image,
  },
  Text: {
    schema: TextPropsSchema,
    Component: Text,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: EmailLayout,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: Spacer,
  },
};

const ReaderBlockSchema = buildBlockConfigurationSchema(READER_DICTIONARY);
const ReaderDocumentSchema = z.record(z.string(), ReaderBlockSchema);

export const ReaderBlock = buildBlockComponent(READER_DICTIONARY);

export type TReaderDocument = Record<string, z.infer<typeof ReaderBlockSchema>>;

export default ReaderDocumentSchema;
