/**
 * Bank.Green Mantine theme
 * Customize colors, fonts, spacing, etc. here
 * https://mantine.dev/theming/theme-object/
 */


import {
  DEFAULT_THEME,
  type MantineColorsTuple,
  type MantineThemeColors,
  createTheme,
} from '@mantine/core'

// Design tokens are shared between Mantine and Tailwind
import { breakpointTokens, colorTokens, fontTokens } from './tokens.mjs'

const convertedColors: MantineThemeColors = Object.entries(colorTokens).reduce(
  (acc, [key, value]) => {
    acc[key] = Object.values(value) as unknown as MantineColorsTuple
    return acc
  },
  {} as MantineThemeColors
)

export const theme = createTheme({
  ...DEFAULT_THEME,
  breakpoints: breakpointTokens,
  colors: convertedColors,
  cursorType: 'pointer',
  fontFamily: fontTokens.body.join(', '),
  headings: {
    fontFamily: fontTokens.headings.join(', '),
    textWrap: 'balance',
  },
  primaryColor: 'blue',
  primaryShade: 6,
})

export default theme
