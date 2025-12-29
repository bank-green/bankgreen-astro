import { AppShell, MantineProvider } from '@mantine/core'
import '@mantine/core/styles/baseline.css'
import '@mantine/core/styles/default-css-variables.css'
import '@mantine/core/styles/global.css'
import type { ReactNode } from 'react'
import { useStableHeadroom } from '@/lib/useStableHeadroom'
import { theme } from '../styles/theme'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
}

/**
 * Wraps page content with MantineProvider.
 * Used by all React page components to ensure consistent theming.
 */
export function Layout({ children }: Props) {
  const pinned = useStableHeadroom({
    fixedAt: 120,
    bottomThreshold: 100,
  })

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 52, collapsed: !pinned }}
        classNames={{
          header: pinned ? '' : 'shadow-xl/25',
        }}
      >
        <Header />
        <AppShell.Main>{children}</AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  )
}
