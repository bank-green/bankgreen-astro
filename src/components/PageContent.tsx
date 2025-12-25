import { Container, MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import { theme } from '../styles/theme'

interface Props {
  children: ReactNode
  fullWidth?: boolean
}

/**
 * Wraps page content with MantineProvider and padding. Not used on HomePage because of the breakout sections.
 * Provides Mantine theme context to all child components.
 */
export function PageContent({ children, fullWidth = false }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Container
        strategy="grid"
        className={fullWidth ? 'px-0 pt-12 pb-16' : 'px-6 pt-12 pb-16 lg:px-0'}
      >
        {children}
      </Container>
    </MantineProvider>
  )
}
