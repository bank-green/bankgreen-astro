/**
 * Bank.Green Mantine theme
 * Customize colors, fonts, spacing, etc. here
 * https://mantine.dev/theming/theme-object/
 */

import {
  Button,
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
  primaryShade: 5,
  components: {
    Accordion: {
      classNames: {
        root: 'bg-white rounded-lg',
        item: 'rounded-md border-none bg-gray-100/25',
        control:
          ' rounded-md bg-gray-100/25 hover:bg-gray-100/50 active:bg-gray-100/75 transition-all duration-100 border-b-2 border-white',
        label: 'font-semibold',
        content: 'py-4',
      },
    },
    Anchor: {
      classNames: {
        root: cx(
          'font-medium text-linkDefault transition-all duration-200 hover:text-linkHover active:text-linkActive',
          'no-underline decoration-[0.01em] decoration-wavy underline-offset-from-font'
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
        main: 'mx-auto w-full bg-sushi-100',
        footer: 'm-auto max-w-6xl w-full bg-white pt-6',
      },
    },
    Button: Button.extend({
      defaultProps: {
        variant: 'filled',
        gradient: {
          from: 'green.6',
          to: 'green.5',
          deg: 135,
        },
        autoContrast: false,
        radius: 'lg',
      },
      classNames: {
        root: cx(
          'group bg-green-600 font-medium',
          'transition-all duration-300 hover:duration-150 active:duration-50',
          'bg-center bg-radial bg-size-[150%_150%] from-green-500/70 via-green-500/50 to-blue-800/30',
          'hover:bg-green-600 hover:bg-size-[100%_100%]',
          'active:bg-green-700'
        ),
        label: cx(
          'text-shadow-2xs text-white/90 group-hover:text-white',
          'transition-all duration-100 group-active:duration-50',
          'group-hover:text-shadow-md group-active:text-shadow-none'
        ),
      },
    }),
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
    Input: {
      classNames: {
        input: 'bg-white border-gray-300 focus:border-gray-500 rounded-md',
      },
    },
    LoadingOverlay: {
      classNames: {
        overlay: 'bg-sushi-100/50 backdrop-blur-[2px]',
      },
    },
    Spoiler: {
      defaultProps: {
        maxHeight: '5rem',
      },
      classNames: {
        control: 'py-2',
      },
    },
    Tabs: {
      classNames: {
        root: 'bg-transparent',
        panel: 'w-full rounded-lg rounded-tl-none border-none bg-white px-8 pb-8',
        tab: 'rounded-t-lg border-none bg-white/50 transition-all duration-100 active:bg-white/90 active:translate-y-0.5 active:font-semibold data-active:bg-white hover:text-linkHover active:text-linkActive',
        list: 'gap-2 border-none bg-sushi-100 before:hidden',
        tabLabel: 'font-semibold',
      },
    },
  },
})

// const variantColorResolver: VariantColorsResolver = ({ color, variant, gradient, theme }) => {
//   const defaultResolvedColors = defaultVariantColorsResolver({ color, variant, gradient, theme })
//   const parsedColor = parseThemeColor({
//     color: color || theme.primaryColor,
//     theme: theme,
//   })

//   // Override some properties for variant
//   if (variant === 'filled') {
//     return {
//       ...defaultResolvedColors,
//       color: 'var(--mantine-color-green-1)',
//       hoverColor: 'var(--mantine-color-white)',
//       backgroundColor: 'var(--mantine-color-white)',
//     }
//   }

//   // Completely override variant
//   if (variant === 'light') {
//     return {
//       background: rgba(parsedColor.value, 0.1),
//       hover: rgba(parsedColor.value, 0.15),
//       border: `1px solid ${parsedColor.value}`,
//       color: darken(parsedColor.value, 0.1),
//     }
//   }

//   // Add new variants support
//   if (variant === 'danger') {
//     return {
//       background: 'var(--mantine-color-red-9)',
//       hover: 'var(--mantine-color-red-8)',
//       color: 'var(--mantine-color-white)',
//       border: 'none',
//     }
//   }

//   return defaultResolvedColors
// }

export default theme
