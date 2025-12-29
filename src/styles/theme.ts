/**
 * Bank.Green Mantine theme
 * Customize colors, fonts, spacing, etc. here
 * https://mantine.dev/theming/theme-object/
 */

import {
  Button,
  Card,
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
  },
  primaryColor: 'green',
  primaryShade: 5,
  components: {
    Accordion: {
      classNames: {
        root: 'rounded-lg',
        item: 'rounded-md border-none bg-sky-900/5',
        control:
          'rounded-md bg-sky-600 text-textInverse hover:bg-sky-700 active:bg-sky-500 transition-all duration-100 border-b-2 border-white',
        label: 'font-semibold text-lg',
        content: 'py-4 [&_li]:list-disc [&_li]:ml-4 [&_li]:marker:text-green-500',
      },
    },
    Alert: {
      classNames: {
        root: 'bg-white',
        title: 'text-lg',
        message: 'text-base',
        body: 'pl-2',
      },
    },
    Anchor: {
      classNames: {
        root: cx(
          'text-linkDefault transition-all duration-150 hover:text-linkHover active:text-linkActive',
          'decoration-[0.5em] decoration-green-500/15 underline-offset-0 hover:underline hover:decoration-[0.15em] hover:underline-offset-1'
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
      classNames: (_theme, props) => ({
        root: cx({
          [`
            bg-center bg-radial bg-size-[225%_350%] hover:bg-size-[100%_150%] 
            from-green-600/50 to-green-500 
            bg-green-500 active:bg-green-700 hover:bg-green-600 
            transition-all duration-300 hover:duration-100 active:duration-50
          `]: props.variant === 'filled',
        }),
        label: cx(
          'no-underline focus:no-underline',
          {
            'text-linkDefault [--button-color:--color-linkDefault] hover:text-linkHover':
              props.variant === 'default' || props.variant === 'transparent',
          },
          {
            'text-white': props.variant === 'filled',
          }
        ),
      }),
    }),
    Card: Card.extend({
      defaultProps: {
        withBorder: false,
        padding: '1.5rem',
      },
      classNames: (_theme, props) => ({
        root: cx('rounded-xl', {
          [`
            transition-all duration-200
            mix-blend-luminosity grayscale-100 hover:mix-blend-normal hover:filter-none
            shadow-lg/0 hover:shadow-lg active:shadow-xs
          `]: props.variant === 'color-hover',
        }),
      }),
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
        input: 'disabled:opacity-50 disabled:bg-white',
      },
    },
    LoadingOverlay: {
      classNames: {
        overlay: 'bg-sushi-100/50 backdrop-blur-[2px]',
      },
    },
    Spoiler: {
      defaultProps: {
        maxHeight: 140,
      },
      classNames: {
        root: 'mx-auto max-w-4xl rounded-md pb-8',
        content: cx(
          'relative mb-8',
          'mask-b-from-50% mask-b-to-100%',
          '[button[aria-expanded=true]~&]:mask-none'
        ),
        control: '-mt-16 py-4',
      },
    },
    Switch: {
      classNames: { label: 'pl-2' },
    },
    Table: {
      defaultProps: {
        horizontalSpacing: 0,
      },
      classNames: {
        td: 'text-sm',
        tr: 'border-b-borderLight has-[th]:border-b-borderDefault',
      },
    },
    Tabs: {
      classNames: {
        root: 'bg-transparent',
        panel: 'w-full rounded-lg rounded-tl-none border-none bg-(--tabs-bg-color,white) p-8',
        tab: cx(
          'rounded-t-lg border-none bg-(--tabs-bg-color,white)/50 lg:px-8',
          'transition-all duration-100',
          'hover:text-linkHover',
          'active:translate-y-0.5 active:bg-(--tabs-bg-color,white)/90 active:text-linkActive data-active:bg-(--tabs-bg-color,white)'
        ),
        list: 'gap-0.5 sm:gap-2 border-none bg-(--tabs-container-bg-color,--mantine-color-bg) before:hidden',
        tabLabel: 'font-semibold',
      },
    },
  },
})

export default theme
