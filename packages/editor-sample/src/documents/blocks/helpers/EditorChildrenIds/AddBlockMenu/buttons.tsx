import {
  AccountCircleOutlined,
  Crop32Outlined,
  HMobiledataOutlined,
  HorizontalRuleOutlined,
  HtmlOutlined,
  ImageOutlined,
  LibraryAddOutlined,
  NotesOutlined,
  SmartButtonOutlined,
  ViewColumnOutlined,
} from '@mui/icons-material';

import { TBlockConfiguration } from '../../../../documents';
import { AvatarPropsSchema } from '../../../Avatar';
import { ButtonPropsSchema } from '../../../Button';
import { ColumnsContainerPropsSchema } from '../../../ColumnsContainer';
import { ContainerPropsSchema } from '../../../Container';
import { DividerPropsSchema } from '../../../Divider';
import { HeadingPropsSchema } from '../../../Heading';
import { HtmlPropsSchema } from '../../../Html';
import { ImagePropsSchema } from '../../../Image';
import { SpacerPropsSchema } from '../../../Spacer';
import { TextPropsSchema } from '../../../Text';

type TButtonProps = {
  label: string;
  icon: JSX.Element;
  block: () => TBlockConfiguration;
};
export const BUTTONS: TButtonProps[] = [
  {
    label: 'Heading',
    icon: <HMobiledataOutlined />,
    block: () => ({
      type: 'Heading',
      data: HeadingPropsSchema.parse({
        props: { text: 'Hello friend' },
      }),
    }),
  },
  {
    label: 'Text',
    icon: <NotesOutlined />,
    block: () => ({
      type: 'Text',
      data: TextPropsSchema.parse({
        props: { text: 'My new text block' },
      }),
    }),
  },

  {
    label: 'Button',
    icon: <SmartButtonOutlined />,
    block: () => ({
      type: 'Button',
      data: ButtonPropsSchema.parse({
        props: {
          text: 'Button',
          url: 'https://www.usewaypoint.com',
        },
      }),
    }),
  },
  {
    label: 'Image',
    icon: <ImageOutlined />,
    block: () => ({
      type: 'Image',
      data: ImagePropsSchema.parse({
        props: {
          url: 'https://logowik.com/content/uploads/images/street-fighter6886.jpg',
          alt: 'Street fighter',
          contentAlignment: 'middle',
          linkHref: null,
        },
      }),
    }),
  },
  {
    label: 'Avatar',
    icon: <AccountCircleOutlined />,
    block: () => ({
      type: 'Avatar',
      data: AvatarPropsSchema.parse({
        props: {
          imageUrl: 'https://ui-avatars.com/api/?size=128',
          shape: 'circle',
        },
      }),
    }),
  },
  {
    label: 'Divider',
    icon: <HorizontalRuleOutlined />,
    block: () => ({
      type: 'Divider',
      data: DividerPropsSchema.parse({}),
    }),
  },
  {
    label: 'Spacer',
    icon: <Crop32Outlined />,
    block: () => ({
      type: 'Spacer',
      data: SpacerPropsSchema.parse({}),
    }),
  },
  {
    label: 'Html',
    icon: <HtmlOutlined />,
    block: () => ({
      type: 'Html',
      data: HtmlPropsSchema.parse({ props: { contents: 'Hello world' } }),
    }),
  },
  {
    label: 'Columns',
    icon: <ViewColumnOutlined />,
    block: () => ({
      type: 'ColumnsContainer',
      data: ColumnsContainerPropsSchema.parse({
        props: {
          columnsCount: 3,
          columns: [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }],
        },
      }),
    }),
  },
  {
    label: 'Container',
    icon: <LibraryAddOutlined />,
    block: () => ({
      type: 'Container',
      data: ContainerPropsSchema.parse({
        props: { childrenIds: [] },
      }),
    }),
  },

  // { label: 'ProgressBar', icon: <ProgressBarOutlined />, block: () => ({}) },
  // { label: 'LoopContainer', icon: <ViewListOutlined />, block: () => ({}) },
];
