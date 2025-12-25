/**
 * ThanksSlice - Displays a thank you message section.
 *
 * Variations: default
 */
import { Container, Stack, Text, Title } from '@mantine/core'
import { asText } from '@prismicio/client'
import type { ThanksSlice as ThanksSliceType } from './types'

interface Props {
  slice: ThanksSliceType
  className?: string
}

export function ThanksSlice({ slice, className }: Props) {
  const { title, description, show_explore_section } = slice.primary

  const titleText = asText(title)
  const descriptionText = asText(description)

  return (
    <Container component="section" data-slice-type={slice.slice_type} className={className}>
      <Stack gap="lg">
        <Title order={1}>{titleText}</Title>
        {descriptionText && <Text>{descriptionText}</Text>}
        {show_explore_section && (
          <nav aria-label="Explore more">
            <Text>Explore more options...</Text>
          </nav>
        )}
      </Stack>
    </Container>
  )
}
