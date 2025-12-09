import { AppShell, MantineProvider } from '@mantine/core'
import '@mantine/core/styles/baseline.css'
import '@mantine/core/styles/default-css-variables.css'
import '@mantine/core/styles/global.css'
import { useHeadroom } from '@mantine/hooks'
import type { ReactNode } from 'react'
import { theme } from '../styles/theme'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
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
  const pinned = useHeadroom({ fixedAt: 120 })

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 52, collapsed: !pinned }}>
        <Header />
        <AppShell.Main>{children}</AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  )
}
