import { HexColorInput, HexColorPicker } from 'react-colorful';

import { Box, Stack, SxProps, Typography } from '@mui/material';

import Swatch from './Swatch';

const DEFAULT_PRESET_COLORS = [
  '#24AF7F',
  '#3DD8B3',
  '#D82922',
  '#Ad5626',
  '#CFB847',
  '#FFCF5A',
  '#D86A07',
  '#EBA52C',
  '#03124A',
  '#2458AF',
  '#528FD9',
  '#000000',
  '#191A1A',
  '#242424',
  '#303031',
  '#474849',
  '#C9D5D3',
  '#C6E5DF',
  '#FAF1E7',
  '#EEEEEE',
  '#FFFFFF',
];

const SX: SxProps = {
  p: 1,
  '.react-colorful__pointer ': {
    width: 16,
    height: 16,
  },
  '.react-colorful__saturation': {
    mb: 1,
    borderRadius: '4px',
  },
  '.react-colorful__last-control': {
    borderRadius: '4px',
  },
  '.react-colorful__hue-pointer': {
    width: '4px',
    borderRadius: '4px',
    height: 24,
    cursor: 'col-resize',
  },
  '.react-colorful__saturation-pointer': {
    cursor: 'all-scroll',
  },
  input: {
    padding: 1,
    border: '1px solid',
    borderColor: 'grey.300',
    borderRadius: '4px',
    width: '100%',
  },
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  secondarySwatch: string[];
};
export default function Picker({ value, onChange, secondarySwatch }: Props) {
  return (
    <Stack spacing={1} sx={SX}>
      <HexColorPicker color={value} onChange={onChange} />
      <Swatch paletteColors={DEFAULT_PRESET_COLORS} value={value} onChange={onChange} />
      <Box>
        <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>
          In template / layout
        </Typography>
        <Swatch paletteColors={secondarySwatch} value={value} onChange={onChange} />
      </Box>
      <Box pt={1}>
        <HexColorInput prefixed color={value} onChange={onChange} />
      </Box>
    </Stack>
  );
}
