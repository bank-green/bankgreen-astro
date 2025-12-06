import { MantineProvider, createTheme } from "@mantine/core";
// Mantine 8 splits styles into separate files
import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/global.css";
import type { ReactNode } from "react";

// Customize your Mantine theme here
// https://mantine.dev/theming/theme-object/
const theme = createTheme({
  // primaryColor: "blue",
  // fontFamily: "...",
});

interface Props {
  children: ReactNode;
}

/**
 * Wrap any React island that uses Mantine components with this provider.
 *
 * Usage in Astro:
 * <MantineWrapper client:load>
 *   <YourMantineComponent />
 * </MantineWrapper>
 */
export function MantineWrapper({ children }: Props) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
