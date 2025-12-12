import { Container, MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import { theme } from '../styles/theme'

interface Props {
  children: ReactNode
}

/**
 * Wraps page content with MantineProvider and padding. Not used on HomePage because of the breakout sections.
 * Provides Mantine theme context to all child components.
 */
export function PageContent({ children }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Container strategy="grid" className="px-6 pt-12 pb-16">
        {children}
      </Container>
    </MantineProvider>
  )
}
