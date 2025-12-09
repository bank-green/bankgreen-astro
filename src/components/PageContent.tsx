import { Container, MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import { theme } from '../styles/theme'

interface Props {
  children: ReactNode
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
      <Container strategy="grid">{children}</Container>
    </MantineProvider>
  )
}
