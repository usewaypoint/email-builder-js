import { z } from 'zod';

import { Heading, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Spacer, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { buildBlockComponent, buildBlockConfigurationSchema } from '@usewaypoint/document-core';

import { Avatar, AvatarPropsSchema } from '../blocks/Avatar';
import { Button, ButtonPropsSchema } from '../blocks/Button';
import { ColumnsContainer } from '../blocks/ColumnsContainer';
import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import { Container } from '../blocks/Container';
import { ContainerPropsSchema } from '../blocks/Container/ContainerPropsSchema';
import { Divider, DividerPropsSchema } from '../blocks/Divider';
import { EmailLayout } from '../blocks/EmailLayout';
import { EmailLayoutPropsSchema } from '../blocks/EmailLayout/EmailLayoutPropsSchema';
import { addReaderBlockWrapper } from '../blocks/helpers/block-wrappers';
import { Html, HtmlPropsSchema } from '../blocks/Html';
import { Image, ImagePropsSchema } from '../blocks/Image';
import { Text, TextPropsSchema } from '../blocks/Text';

const READER_DICTIONARY = {
  Avatar: {
    schema: AvatarPropsSchema,
    Component: addReaderBlockWrapper(Avatar),
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: addReaderBlockWrapper(Button),
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: addReaderBlockWrapper(ColumnsContainer),
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: addReaderBlockWrapper(Container),
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: addReaderBlockWrapper(Divider),
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: Heading,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: addReaderBlockWrapper(Html),
  },
  Image: {
    schema: ImagePropsSchema,
    Component: addReaderBlockWrapper(Image),
  },
  Text: {
    schema: TextPropsSchema,
    Component: addReaderBlockWrapper(Text),
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
