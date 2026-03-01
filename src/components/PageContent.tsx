import { Container, MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import { theme } from '../styles/theme'

interface Props {
  children: ReactNode
  fullWidth?: boolean
  className?: string
}

/**
 * Wraps page content with MantineProvider and padding. Not used on HomePage because of the breakout sections.
 * Provides Mantine theme context to all child components.
 */
export function PageContent({ children, fullWidth = false, className = '' }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Container
        strategy="grid"
        className={`${fullWidth ? 'fullwidth pt-12' : 'px-6 pt-12 pb-16 lg:px-0'} ${className}`}
      >
        {children}
      </Container>
    </MantineProvider>
  )
}
