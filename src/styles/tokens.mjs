export const colorTokens = {
  sushi: {
    DEFAULT: '#7BB123',
    50: '#F2F7EB',
    100: '#EDF5E5',
    200: '#CEE1B4',
    300: '#B7D290',
    400: '#9FC46B',
    500: '#7BB123',
    600: '#6C9039',
    700: '#506B2B',
    800: '#35471C',
    900: '#1A220E',
  },
  sunglow: {
    DEFAULT: '#FCC135',
    100: '#FFFFFE',
    200: '#FEEFCC',
    300: '#FDE09A',
    400: '#FDD067',
    500: '#FCC135',
    600: '#FAB104',
    700: '#C88E03',
    800: '#966A02',
    900: '#644601',
  },
  ocean: {
    50: '#EFF6FF',
    100: '#DCEDFF',
    200: '#C1E4FF',
    300: '#95D5FF',
    400: '#5DBAFF',
    500: '#3BA0FF',
    600: '#2563EB',
    700: '#1E4FBF',
    800: '#1A3F8F',
    900: '#122E62',
  },
  leaf: {
    300: '#7BB123',
    400: '#3A6028',
    500: '#0D5D43',
    700: '#123F30',
  },
  sky: {
    0: '#FFFFFF',
    50: '#F4F8FD',
    100: '#D9E0F2',
    200: '#BFC9E3',
    300: '#A5B2D4',
    400: '#8B9BC5',
    500: '#6D7FA0',
    600: '#434F6D',
    700: '#353E59',
    800: '#282d46',
    900: '#1C2032',
    1000: '#000000',
  },
  gray: {
    0: '#FFFFFF',
    50: '#f9fafa',
    100: '#e4e6e7',
    200: '#c9cdcf',
    300: '#aeb4b7',
    400: '#939b9f',
    500: '#6b7276',
    600: '#42484c',
    700: '#363b3e',
    800: '#292d30',
    900: '#1d2022',
    950: '#0f1011',
    1000: '#000000',
  },
  red: {
    50: '#FCEDE8',
    100: '#FADFD7',
    200: '#F8B9A6',
    300: '#F49376',
    400: '#EA7965',
    500: '#E05D52',
    600: '#BA4033',
    700: '#992E26',
    800: '#661A0B',
    900: '#420C02',
    950: '#360A02',
  },
}

colorTokens.blue = {}
for (const [shade, value] of Object.entries(colorTokens.ocean)) {
  colorTokens.blue[shade] = value
}
colorTokens.green = {}
for (const [shade, value] of Object.entries(colorTokens.sushi)) {
  colorTokens.green[shade] = value
}
colorTokens.yellow = {}
for (const [shade, value] of Object.entries(colorTokens.sunglow)) {
  colorTokens.yellow[shade] = value
}

export const brandColorTokens = {
  primaryDark: colorTokens.sky[800],
  primaryLight: colorTokens.sky[600],
  oceanBlue: colorTokens.sky[800],
  woodlandGreen: colorTokens.leaf[700],
  pistachioGreen: colorTokens.sushi[100],
  arcticBlue: colorTokens.ocean[100],
}

export const baseColorTokens = {
  black: colorTokens.gray[1000],
  white: colorTokens.gray[0],
  paper: colorTokens.gray[50],
  bgContrast: colorTokens.gray[100],
  bgDefault: colorTokens.gray[0],
  bgInverse: colorTokens.gray[800],
  borderDefault: colorTokens.gray[300],
  borderFocus: colorTokens.blue[600],
  borderHeavy: colorTokens.gray[400],
  borderHover: colorTokens.blue[400],
  borderLight: colorTokens.gray[200],
  linkActive: colorTokens.blue[600],
  linkDefault: colorTokens.blue[800],
  linkHover: colorTokens.blue[600],
  linkVisited: colorTokens.blue[800],
  linkInverse: colorTokens.blue[400],
  textDefault: colorTokens.gray[800],
  textHeadings: colorTokens.sky[800],
  textInverse: colorTokens.gray[0],
  textLight: colorTokens.gray[600],
}

export const statusColorTokens = {
  bgError: colorTokens.red[50],
  bgInfo: colorTokens.blue[50],
  bgSuccess: colorTokens.leaf[100],
  bgWarning: colorTokens.sunglow[200],
  borderError: colorTokens.red[500],
  borderInfo: colorTokens.blue[500],
  borderSuccess: colorTokens.leaf[500],
  borderWarning: colorTokens.sunglow[600],
  textError: colorTokens.red[600],
  textInfo: colorTokens.blue[600],
  textSuccess: colorTokens.leaf[700],
  textWarning: colorTokens.sunglow[800],
}

export const semanticColorTokens = {
  ...brandColorTokens,
  ...baseColorTokens,
  ...statusColorTokens,
}

export const fontTokens = {
  body: ['Reddit Sans', 'sans-serif'],
  headings: ['Reddit Sans', 'sans-serif'],
  script: ['blitz', 'mono'],
}

export const breakpointTokens = {
  xxs: '20rem',
  xs: '32rem',
  sm: '48rem',
  md: '62rem',
  lg: '72rem',
  xl: '96rem',
  xxl: '120rem',
  mobile: '32rem',
  max: '72rem',
  min: '20rem',
}

/**
 * Flatten these tokens and export for use by PostCSS and Tailwind
 */

const flatColors = {}
for (const [colorName, shades] of Object.entries(colorTokens)) {
  for (const [shade, value] of Object.entries(shades)) {
    flatColors[`color-${colorName}-${shade}`] = value
  }
}
for (const [tokenName, value] of Object.entries(semanticColorTokens)) {
  flatColors[`color-${tokenName}`] = value
}

const breakpoints = Object.entries(breakpointTokens).reduce((acc, [key, value]) => {
  acc[`breakpoint-${key}`] = value
  return acc
}, {})

export const variables = {
  ...breakpoints,
  'font-body': fontTokens.body,
  'font-headings': fontTokens.headings,
  ...flatColors,
}
