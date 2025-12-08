import { MantineProvider, Paper } from "@mantine/core";
import { theme } from "../styles/theme";
import type { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

  /**
   * Wraps page content with MantineProvider and Paper component.
   * Provides Mantine theme context to all child components.
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
  return (
    <MantineProvider theme={theme}>
      <Paper>{children}</Paper>
    </MantineProvider>
  )

}
