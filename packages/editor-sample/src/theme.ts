import { alpha, createTheme, darken, lighten } from '@mui/material/styles';

const BRAND_NAVY = '#212443';
const BRAND_BLUE = '#0079CC';
const BRAND_GREEN = '#1F8466';
const BRAND_RED = '#E81212';
const BRAND_YELLOW = '#F6DC9F';
const BRAND_PURPLE = '#6C0E7C';
const BRAND_BROWN = '#CC996C';
const STANDARD_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const MONOSPACE_FONT_FAMILY =
  'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace';

const CUSTOM_COLORS = {
  marketbaseNavy: BRAND_NAVY,
  marketbaseBlue: BRAND_BLUE,
  marketbaseGreen: BRAND_GREEN,
  marketbaseRed: BRAND_RED,
  marketbaseYellow: BRAND_YELLOW,
  marketbasePurple: BRAND_PURPLE,
  marketbaseBrown: BRAND_BROWN,
};

const BASE_THEME = createTheme({
  palette: {
    background: {
      default: '#f2f5f7',
    },
    text: {
      primary: '#1F1F21',
      secondary: '#4F4F4F',
    },
  },
  typography: {
    fontFamily: STANDARD_FONT_FAMILY,
  },
});

const THEME = createTheme(BASE_THEME, {
  palette: {
    brand: {
      navy: CUSTOM_COLORS.marketbaseNavy,
      blue: CUSTOM_COLORS.marketbaseBlue,
      red: CUSTOM_COLORS.marketbaseRed,
      green: CUSTOM_COLORS.marketbaseGreen,
      yellow: CUSTOM_COLORS.marketbaseYellow,
      purple: CUSTOM_COLORS.marketbasePurple,
      brown: CUSTOM_COLORS.marketbaseBrown,
    },
    success: {
      main: CUSTOM_COLORS.marketbaseGreen,
      light: lighten(CUSTOM_COLORS.marketbaseGreen, 0.15),
      dark: darken(CUSTOM_COLORS.marketbaseGreen, 0.15),
    },
    error: {
      main: CUSTOM_COLORS.marketbaseRed,
      light: lighten(CUSTOM_COLORS.marketbaseRed, 0.15),
      dark: darken(CUSTOM_COLORS.marketbaseRed, 0.15),
    },
    cadet: {
      100: '#F9FAFB',
      200: '#F2F5F7',
      300: '#DCE4EA',
      400: '#A8BBCA',
      500: '#6A8BA4',
    },
    highlight: {
      100: lighten(CUSTOM_COLORS.marketbaseYellow, 0.8),
      200: lighten(CUSTOM_COLORS.marketbaseYellow, 0.6),
      300: lighten(CUSTOM_COLORS.marketbaseYellow, 0.4),
      400: lighten(CUSTOM_COLORS.marketbaseYellow, 0.2),
      500: CUSTOM_COLORS.marketbaseYellow,
    },
    info: {
      main: CUSTOM_COLORS.marketbaseBlue,
    },
    primary: {
      main: CUSTOM_COLORS.marketbaseBlue,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        address {
          font-style: normal;
        }
        fieldset {
          border: none;
          padding: 0;
        }
        pre {
          font-family: ${MONOSPACE_FONT_FAMILY}
          white-space: pre-wrap;
          font-size: 12px;
        }
      `,
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
        action: {
          paddingTop: 0,
          marginRight: 0,
        },
        filledSuccess: {
          backgroundColor: CUSTOM_COLORS.marketbaseGreen,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: BASE_THEME.spacing(1),
          paddingBottom: BASE_THEME.spacing(2),
        },
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        variant: 'h4',
      },
      styleOverrides: {
        root: {
          paddingTop: BASE_THEME.spacing(3),
          paddingBottom: BASE_THEME.spacing(1),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid',
          borderTopColor: BASE_THEME.palette.divider,
          marginTop: BASE_THEME.spacing(2.5),
          padding: `${BASE_THEME.spacing(1.5)} ${BASE_THEME.spacing(3)}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          ...BASE_THEME.typography.body2,
          borderColor: BASE_THEME.palette.grey[200],
        },
        head: {
          ...BASE_THEME.typography.overline,
          fontWeight: BASE_THEME.typography.fontWeightMedium,
          letterSpacing: '0.075em',
          color: BASE_THEME.palette.text.secondary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledError, &.MuiChip-filledSuccess': {
            fill: BASE_THEME.palette.primary.contrastText,
          },
        },
        sizeSmall: {
          borderRadius: BASE_THEME.spacing(0.5),
          fontSize: 12,
        },
        iconSmall: {
          fontSize: 14,
          marginLeft: BASE_THEME.spacing(1),
        },
        colorSecondary: {
          borderColor: BASE_THEME.palette.grey[400],
          color: BASE_THEME.palette.text.secondary,
        },
        label: {
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: BASE_THEME.typography.pxToRem(14),
          border: 'none',
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
        },
        iconSeparator: {
          display: 'none',
        },
        columnHeader: {
          outline: 'none !important',
          padding: BASE_THEME.spacing(0, 2),
          color: BASE_THEME.palette.text.secondary,
          ...BASE_THEME.typography.overline,
          letterSpacing: '0.05em',
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
        cell: {
          padding: BASE_THEME.spacing(0, 2),
          '& .MuiChip-root': {
            cursor: 'pointer',
          },
        },
        row: {
          '&:hover': {
            backgroundColor: '#F9FAFB',
          },
        },
        withBorder: {
          borderRight: 'none',
        },
        toolbarContainer: {
          padding: BASE_THEME.spacing(0, 1),
          minHeight: BASE_THEME.spacing(5),
          '& .MuiTablePagination-toolbar': {
            paddingRight: 0,
            minHeight: 0,
          },
          '& .MuiTablePagination-displayedRows': {
            margin: 0,
            [BASE_THEME.breakpoints.only('xs')]: {
              display: 'none',
            },
          },
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        PaperProps: {
          elevation: 2,
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          backgroundColor: BASE_THEME.palette.background.paper,
          '& .MuiButton-root': {
            height: 36,
          },
        },
        colorPrimary: {
          backgroundColor: CUSTOM_COLORS.marketbaseNavy,
          transition: 'color 0.5s',
          '& .MuiDivider-root': {
            borderColor: alpha(BASE_THEME.palette.common.white, 0.12),
          },
          '& button.MuiButton-textSecondary': {
            color: alpha(BASE_THEME.palette.common.white, 0.5),
          },
          '& button.MuiButton-textPrimary': {
            color: BASE_THEME.palette.common.white,
          },
          '& button.MuiButton-textPrimary:hover, & button.MuiButton-textSecondary:hover, & button.MuiButton-textInherit:hover, & button.MuiIconButton-root:hover':
            {
              color: BASE_THEME.palette.common.white,
              backgroundColor: alpha(BASE_THEME.palette.common.white, 0.1),
            },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: BASE_THEME.typography.pxToRem(12),
          backgroundColor: alpha(BASE_THEME.palette.text.primary, 0.9),
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 1,
        },
        track: {
          height: 1,
          border: 'none',
        },
        rail: {
          height: 1,
          backgroundColor: BASE_THEME.palette.grey[500],
        },
        mark: {
          backgroundColor: BASE_THEME.palette.grey[500],
        },
        markActive: {
          height: 0,
        },
        thumb: {
          height: 16,
          width: 16,
          cursor: 'col-resize',
          '&:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: `0 0 0 4px ${alpha(CUSTOM_COLORS.marketbaseBlue, 0.2)}`,
          },
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
        square: true,
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          boxShadow: BASE_THEME.shadows[2],
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          textTransform: 'uppercase',
          letterSpacing: '0.08rem',
          fontSize: BASE_THEME.typography.pxToRem(12),
          lineHeight: '32px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
        focusRipple: true,
      },
      styleOverrides: {
        root: {
          '&.MuiButton-containedSecondary.Mui-disabled': {
            backgroundColor: BASE_THEME.palette.grey[100],
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        disableTypography: true,
      },
      styleOverrides: {
        root: {
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        edgeStart: {
          marginLeft: BASE_THEME.spacing(-1),
        },
        colorSecondary: {
          color: BASE_THEME.palette.grey[500],
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        textPrimary: {
          color: BASE_THEME.palette.text.primary,
        },
        textSecondary: {
          color: BASE_THEME.palette.text.secondary,
        },
        outlinedPrimary: {
          borderColor: BASE_THEME.palette.grey[300],
          color: BASE_THEME.palette.text.primary,
          '&:hover, &:active, &:focus': {
            borderColor: BASE_THEME.palette.grey[500],
            color: BASE_THEME.palette.text.primary,
          },
        },
        containedSecondary: {
          backgroundColor: BASE_THEME.palette.common.white,
          border: `1px solid ${BASE_THEME.palette.grey[300]}`,
          color: BASE_THEME.palette.text.primary,
          '&:hover, &:active, &:focus': {
            backgroundColor: BASE_THEME.palette.common.white,
            borderColor: BASE_THEME.palette.grey[500],
            color: BASE_THEME.palette.text.primary,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          paddingLeft: BASE_THEME.spacing(1.5),
          paddingRight: BASE_THEME.spacing(1.5),
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: BASE_THEME.palette.text.secondary,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: `1px solid ${BASE_THEME.palette.grey[400]}`,
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: `1px solid ${BASE_THEME.palette.grey[500]} !important`,
          },
          '&:after': {
            borderBottom: `1px solid ${BASE_THEME.palette.text.primary} !important`,
          },
          '&.MuiOutlinedInput-root:not(.Mui-error)': {
            '& fieldset': {
              borderColor: BASE_THEME.palette.grey[300],
              transition: 'border-color 0.2s',
            },
          },
          '&.MuiOutlinedInput-root:not(.Mui-disabled, .Mui-error)': {
            '&:hover fieldset': {
              borderColor: BASE_THEME.palette.grey[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: BASE_THEME.palette.text.secondary,
              borderWidth: 1,
            },
          },
        },
        input: {
          fontSize: BASE_THEME.typography.pxToRem(14),
          '&.Mui-disabled': {
            WebkitTextFillColor: 'inherit',
            color: BASE_THEME.palette.text.secondary,
          },
        },
        inputSizeSmall: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          '& legend': {
            fontSize: '0.85em',
            maxWidth: '100%',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: BASE_THEME.typography.pxToRem(14),
            color: BASE_THEME.palette.text.secondary,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        shrink: {
          transform: 'scale(0.85)',
          fontWeight: BASE_THEME.typography.fontWeightMedium,
          '&.Mui-focused': {
            color: BASE_THEME.palette.text.primary,
          },
          '&.MuiInputLabel-standard': {
            transform: 'translate(0, -4px) scale(0.85)',
            color: '#4F4F4F',
          },
          '&.MuiInputLabel-outlined': {
            transform: 'translate(15px, -8px) scale(0.85)',
          },
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          width: 1,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          borderWidth: 1,
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        variant: 'scrollable',
      },
      styleOverrides: {
        indicator: {
          height: 1,
          backgroundColor: BASE_THEME.palette.text.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: BASE_THEME.spacing(2),
          paddingLeft: BASE_THEME.spacing(1.5),
          paddingRight: BASE_THEME.spacing(1.5),
          fontSize: BASE_THEME.typography.pxToRem(14),
          fontFamily: BASE_THEME.typography.fontFamily,
          lineHeight: 1.5,
          fontWeight: BASE_THEME.typography.fontWeightMedium,
          transition: 'color 0.2s',
          '&.Mui-selected': {
            color: BASE_THEME.palette.text.primary,
          },
          '&:hover': {
            color: BASE_THEME.palette.text.primary,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: BASE_THEME.typography.pxToRem(18),
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        disableShrink: true,
      },
      styleOverrides: {
        root: {
          animationDuration: '700ms',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: BASE_THEME.spacing(1),
        },
      },
    },
  },
  typography: {
    fontFamily: BASE_THEME.typography.fontFamily,
    h1: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(40),
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h2: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(32),
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h3: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(24),
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h4: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(20),
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h5: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(18),
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h6: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(16),
      lineHeight: 1.5,
      letterSpacing: '-0.005em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    body1: {
      fontSize: BASE_THEME.typography.pxToRem(14),
    },
    body2: {
      fontSize: BASE_THEME.typography.pxToRem(12),
    },
    overline: {
      fontWeight: BASE_THEME.typography.fontWeightMedium,
      letterSpacing: '0.05em',
    },
    button: {
      textTransform: 'none',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
      lineHeight: 1.5,
    },
    caption: {
      letterSpacing: 0,
      lineHeight: 1.5,
    },
  },
  shadows: [
    'none',
    '0px 4px 15px rgba(33, 36, 67, 0.04), 0px 0px 2px rgba(33, 36, 67, 0.04), 0px 0px 1px rgba(33, 36, 67, 0.04)',
    '0px 10px 20px rgba(33, 36, 67, 0.04), 0px 2px 6px rgba(33, 36, 67, 0.04), 0px 0px 1px rgba(33, 36, 67, 0.04)',
    '0px 16px 24px rgba(33, 36, 67, 0.05), 0px 2px 6px rgba(33, 36, 67, 0.05), 0px 0px 1px rgba(33, 36, 67, 0.05)',
    '0px 24px 32px rgba(33, 36, 67, 0.06), 0px 16px 24px rgba(33, 36, 67, 0.06), 0px 4px 8px rgba(33, 36, 67, 0.06), 0px 0px 1px rgba(33, 36, 67, 0.06)',
    '0px 3px 5px -1px rgba(58, 53, 65, 0.2), 0px 5px 8px 0px rgba(58, 53, 65, 0.14), 0px 1px 14px 0px rgba(58, 53, 65, 0.12)',
    '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
    '0px 4px 5px -2px rgba(58, 53, 65, 0.2), 0px 7px 10px 1px rgba(58, 53, 65, 0.14), 0px 2px 16px 1px rgba(58, 53, 65, 0.12)',
    '0px 5px 5px -3px rgba(58, 53, 65, 0.2), 0px 8px 10px 1px rgba(58, 53, 65, 0.14), 0px 3px 14px 2px rgba(58, 53, 65, 0.12)',
    '0px 5px 6px -3px rgba(58, 53, 65, 0.2), 0px 9px 12px 1px rgba(58, 53, 65, 0.14), 0px 3px 16px 2px rgba(58, 53, 65, 0.12)',
    '0px 6px 6px -3px rgba(58, 53, 65, 0.2), 0px 10px 14px 1px rgba(58, 53, 65, 0.14), 0px 4px 18px 3px rgba(58, 53, 65, 0.12)',
    '0px 6px 7px -4px rgba(58, 53, 65, 0.2), 0px 11px 15px 1px rgba(58, 53, 65, 0.14), 0px 4px 20px 3px rgba(58, 53, 65, 0.12)',
    '0px 7px 8px -4px rgba(58, 53, 65, 0.2), 0px 12px 17px 2px rgba(58, 53, 65, 0.14), 0px 5px 22px 4px rgba(58, 53, 65, 0.12)',
    '0px 7px 8px -4px rgba(58, 53, 65, 0.2), 0px 13px 19px 2px rgba(58, 53, 65, 0.14), 0px 5px 24px 4px rgba(58, 53, 65, 0.12)',
    '0px 7px 9px -4px rgba(58, 53, 65, 0.2), 0px 14px 21px 2px rgba(58, 53, 65, 0.14), 0px 5px 26px 4px rgba(58, 53, 65, 0.12)',
    '0px 8px 9px -5px rgba(58, 53, 65, 0.2), 0px 15px 22px 2px rgba(58, 53, 65, 0.14), 0px 6px 28px 5px rgba(58, 53, 65, 0.12)',
    '0px 8px 10px -5px rgba(58, 53, 65, 0.2), 0px 16px 24px 2px rgba(58, 53, 65, 0.14), 0px 6px 30px 5px rgba(58, 53, 65, 0.12)',
    '0px 8px 11px -5px rgba(58, 53, 65, 0.2), 0px 17px 26px 2px rgba(58, 53, 65, 0.14), 0px 6px 32px 5px rgba(58, 53, 65, 0.12)',
    '0px 9px 11px -5px rgba(58, 53, 65, 0.2), 0px 18px 28px 2px rgba(58, 53, 65, 0.14), 0px 7px 34px 6px rgba(58, 53, 65, 0.12)',
    '0px 9px 12px -6px rgba(58, 53, 65, 0.2), 0px 19px 29px 2px rgba(58, 53, 65, 0.14), 0px 7px 36px 6px rgba(58, 53, 65, 0.12)',
    '0px 10px 13px -6px rgba(58, 53, 65, 0.2), 0px 20px 31px 3px rgba(58, 53, 65, 0.14), 0px 8px 38px 7px rgba(58, 53, 65, 0.12)',
    '0px 10px 13px -6px rgba(58, 53, 65, 0.2), 0px 21px 33px 3px rgba(58, 53, 65, 0.14), 0px 8px 40px 7px rgba(58, 53, 65, 0.12)',
    '0px 10px 14px -6px rgba(58, 53, 65, 0.2), 0px 22px 35px 3px rgba(58, 53, 65, 0.14), 0px 8px 42px 7px rgba(58, 53, 65, 0.12)',
    '0px 11px 14px -7px rgba(58, 53, 65, 0.2), 0px 23px 36px 3px rgba(58, 53, 65, 0.14), 0px 9px 44px 8px rgba(58, 53, 65, 0.12)',
    '0px 11px 15px -7px rgba(58, 53, 65, 0.2), 0px 24px 38px 3px rgba(58, 53, 65, 0.14), 0px 9px 46px 8px rgba(58, 53, 65, 0.12)',
  ],
});

export default THEME;
