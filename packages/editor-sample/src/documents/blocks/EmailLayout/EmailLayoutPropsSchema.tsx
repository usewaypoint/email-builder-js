import { z } from 'zod';

import { zColor, zFontFamily } from '../helpers/zod';

export const EmailLayoutPropsSchema = z.object({
  backdropColor: zColor(),
  canvasColor: zColor(),
  textColor: zColor(),
  fontFamily: zFontFamily().default('MODERN_SANS'),
  childrenIds: z.array(z.string()),
});
