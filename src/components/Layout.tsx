import { AppShell, Burger, MantineProvider } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/global.css";
import { theme } from "../styles/theme";
import type { ReactNode } from "react";


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
 export function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  return <MantineProvider theme={theme}>
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />

        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
    
    
    </MantineProvider>;
}
