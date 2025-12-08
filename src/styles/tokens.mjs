export const colorTokens = {
  blue: {
    50: '#F2F4FF',
    100: '#EBECFF',
    200: '#C9CDFD',
    300: '#A7AFFB',
    400: '#8591FA',
    500: '#6473F8',
    600: '#5060F7',
    700: '#3245CC',
    800: '#2735A0',
    900: '#1D2773',
    950: '#121747',
  },
  gray: {
    0: '#FFF',
    50: '#FAF7F2',
    100: '#F0ECE4',
    200: '#E5E1DA',
    300: '#D4CFC8',
    400: '#B8B1A9',
    500: '#958F87',
    600: '#7E776F',
    700: '#635C54',
    800: '#4A433C',
    900: '#2E2720',
    950: '#241A0F',
    1000: '#000',
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
  yellow: {
    50: '#FFF4D9',
    100: '#F8E4AF',
    200: '#F2D382',
    300: '#E5B73F',
    400: '#D89C00',
    500: '#C07D00',
    600: '#A16901',
    700: '#865700',
    800: '#694502',
    900: '#4B3205',
    950: '#342307',
  },
  // Colors transferred from Nuxt Tailwind config
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
    100: '#DCEDFF',
    400: '#2563EB',
  },
  leaf: {
    300: '#7BB123',
    400: '#3A6028',
    500: '#0D5D43',
    700: '#123F30',
  },
  sky: {
    50: '#F4F8FD',
    100: '#D9E0F2',
    600: '#434F6D',
    800: '#282d46',
  },
}

export const brandColorTokens = {
  primaryDark: colorTokens.sky[800],
  primaryLight: colorTokens.sky[600],
  oceanBlue: colorTokens.sky[800],
  woodlandGreen: '#1E4132',
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
  linkActive: colorTokens.blue[700],
  linkDefault: colorTokens.blue[600],
  linkHover: colorTokens.blue[500],
  linkVisited: colorTokens.blue[700],
  textDefault: colorTokens.sky[800],
  textHeadings: colorTokens.sky[800],
  textInverse: colorTokens.sky[0],
  textLight: colorTokens.sky[600],
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
  headings: ['Reddit Sans', 'serif'],
  script: ['blitz', 'mono'],
}

export const breakpointTokens = {
  '2xs': '20em',
  xs: '32em',
  sm: '48em',
  md: '62em',
  lg: '75em',
  xl: '88em',
  '2xl': '96em',
  mobile: '32em',
  max: '96em',
  min: '20em',
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
