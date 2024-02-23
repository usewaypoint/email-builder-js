import React, { useState } from 'react';
import { z } from 'zod';

import { Divider } from '@mui/material';

import { EmailLayoutPropsSchema } from '../../../../documents/blocks/EmailLayout';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColorInput from './helpers/inputs/ColorInput';

type EmailLayoutSidebarPanelProps = z.infer<typeof EmailLayoutPropsSchema>;

const SECONDARY_SWATCH: string[] = [];
type EmailLayoutSidebarFieldsProps = {
  data: EmailLayoutSidebarPanelProps;
  setData: (v: EmailLayoutSidebarPanelProps) => void;
};
export default function EmailLayoutSidebarFields({ data, setData }: EmailLayoutSidebarFieldsProps) {
  const secondarySwatch = SECONDARY_SWATCH;
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = EmailLayoutPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Layout">
      <ColorInput
        label="Backdrop color"
        defaultValue={data.backdropColor}
        onChange={(backdropColor) => updateData({ ...data, backdropColor })}
        secondarySwatch={secondarySwatch}
      />
      <ColorInput
        label="Canvas color"
        defaultValue={data.canvasColor}
        onChange={(canvasColor) => updateData({ ...data, canvasColor })}
        secondarySwatch={secondarySwatch}
      />
      <Divider />
      <ColorInput
        label="Text color"
        defaultValue={data.textColor}
        onChange={(textColor) => updateData({ ...data, textColor })}
        secondarySwatch={secondarySwatch}
      />
    </BaseSidebarPanel>
  );
}
