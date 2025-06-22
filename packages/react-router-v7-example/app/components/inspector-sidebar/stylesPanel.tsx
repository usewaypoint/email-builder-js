import { Plus, X } from 'lucide-react';
import { setDocument, useDocument } from '~/context/editor';
import EmailLayoutPropsSchema, { type EmailLayoutProps } from '~/documents/blocks/EmailLayout/EmailLayoutPropsSchema';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { FontFamilyInput } from './inspectPanel/panels/helpers/fontFamilyInput';
import { ColorInput } from './inspectPanel/panels/helpers/colorInput';

/**
 * StylesPanel is a React component that provides a user interface for editing the styles of an EmailLayout block.
 *
 * @see {@link EmailLayoutPropsSchema} - Schema definition for all available properties
 * @see {@link EmailLayoutProps} - TypeScript interface for EmailLayout properties
 *
 * Supported properties:
 * - `backdropColor` {@link EmailLayoutProps.backdropColor} - Background color of the email
 * - `borderColor` {@link EmailLayoutProps.borderColor} - Border color of the canvas (optional)
 * - `borderRadius` {@link EmailLayoutProps.borderRadius} - Border radius of the canvas in pixels
 * - `canvasColor` {@link EmailLayoutProps.canvasColor} - Background color of the canvas
 * - `textColor` {@link EmailLayoutProps.textColor} - Default text color (TODO)
 * - `fontFamily` {@link EmailLayoutProps.fontFamily} - Default font family (TODO)
 *
 * @returns React component for editing EmailLayout styles
 */
export function StylesPanel() {
  const block = useDocument().root;
  if (!block) {
    return <p>Block not found</p>;
  }

  const { data, type } = block;
  if (type !== 'EmailLayout') {
    throw new Error('Expected "root" element to be of type EmailLayout');
  }

  const updateData = (d: unknown) => {
    const res = EmailLayoutPropsSchema.safeParse(d);
    if (res.success) {
      setDocument({ root: { type, data: res.data } });
    } else {
      console.error('Validation error:', res.error);
    }
  };

  return (
    <div className="space-y-6">
      <ColorInput
        label="Backdrop color"
        value={data.backdropColor ?? '#F5F5F5'}
        onChange={(backdropColor) => updateData({ ...data, backdropColor })}
      />

      <ColorInput
        label="Canvas color"
        value={data.canvasColor ?? '#F5F5F5'}
        onChange={(canvasColor) => updateData({ ...data, canvasColor })}
      />

      <ColorInput
        nullable={true}
        label="Canvas border color"
        value={data.borderColor}
        onChange={(borderColor) => updateData({ ...data, borderColor })}
      />

      <div>
        <Label htmlFor="border-radius">Canvas border radius (px)</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[data.borderRadius ?? 0]}
            max={100}
            step={1}
            onValueChange={(value) => updateData({ ...data, borderRadius: value[0] })}
          />
          <Input
            id="border-radius"
            type="number"
            className="w-fit"
            value={data.borderRadius ?? 0}
            min={0}
            max={100}
            onChange={(e) => updateData({ ...data, borderRadius: Number(e.target.value) })}
          />
        </div>
      </div>

      <FontFamilyInput
        onChange={(v) =>
          updateData({
            ...data,
            fontFamily: v,
          })
        }
      />

      <ColorInput
        label="Text color"
        value={data.textColor ?? '#262626'}
        onChange={(textColor) => updateData({ ...data, textColor })}
      />
    </div>
  );
}
