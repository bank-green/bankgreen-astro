/**
 * ThanksSlice - Displays a thank you message section.
 *
 * Variations: default
 */
import { Stack, Title, Text, Container } from '@mantine/core'
import type { RichTextField } from '@prismicio/client'
import { asText } from '@prismicio/client'

type ThanksSlice = {
  slice_type: 'thanks_slice'
  primary: {
    title?: RichTextField
    description?: RichTextField
    show_explore_section?: boolean
  }
}

interface Props {
  slice: ThanksSlice
}

export function ThanksSlice({ slice }: Props) {
  const { title, description, show_explore_section } = slice.primary

  const titleText = asText(title)
  const descriptionText = asText(description)

  return (
    <Container component="section" data-slice-type={slice.slice_type}>
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
