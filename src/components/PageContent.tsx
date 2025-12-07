import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/global.css";
import type { ReactNode } from "react";

/**
 * Bank.Green Mantine theme
 * Customize colors, fonts, spacing, etc. here
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({
  // Brand colors from the Nuxt project:
  // sushi green, sunglow yellow, ocean blue, arctic blue, pistachio
  // These will be configured properly when styling begins
});

interface Props {
  children: ReactNode;
}

/**
 * Wraps page content with MantineProvider.
 * Used by all React page components to ensure consistent theming.
 *
 * Usage:
 * export function FaqPage({ data }: Props) {
 *   return (
 *     <PageContent>
 *       <h1>FAQ</h1>
 *       ...
 *     </PageContent>
 *   );
 * }
 */
export function PageContent({ children }: Props) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
