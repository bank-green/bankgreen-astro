/**
 * Bank.Green Mantine theme
 * Customize colors, fonts, spacing, etc. here
 * https://mantine.dev/theming/theme-object/
 */

import {
  Container,
  createTheme,
  DEFAULT_THEME,
  type MantineColorsTuple,
  type MantineThemeColors,
} from '@mantine/core'
import cx from 'clsx'
// Design tokens are shared between Mantine and Tailwind
import { breakpointTokens, colorTokens, fontTokens } from './tokens.mjs'

const convertedColors: MantineThemeColors = Object.entries(colorTokens).reduce(
  (acc, [key, value]) => {
    acc[key] = Object.values(value) as unknown as MantineColorsTuple
    return acc
  },
  {} as MantineThemeColors
)

const CONTAINER_SIZES: Record<string, string> = breakpointTokens

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
  primaryColor: 'green',
  primaryShade: 6,
  components: {
    Anchor: {
      classNames: {
        root: cx(
          'font-medium text-linkDefault transition-all duration-200 hover:text-linkHover active:text-linkActive',
          'no-underline decoration-[0.01em] decoration-wavy underline-offset-from-font hover:underline'
        ),
      },
    },
    AppShell: {
      defaultProps: {
        padding: 0,
        header: { height: 54, offset: false },
        footer: { height: 'auto', collapsed: true },
        withBorder: false,
      },
      classNames: {
        header: 'm-auto max-w-6xl w-full',
        main: 'm-auto w-full bg-sushi-100',
        footer: 'm-auto max-w-6xl w-full bg-white pt-6',
      },
    },
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? CONTAINER_SIZES[size]
              : undefined,
        },
      }),
      defaultProps: {
        size: 'lg',
      },
      classNames: {
        root: 'px-0',
      },
    }),
  },
})

export default theme
