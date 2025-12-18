/**
 * TextSlice - Renders rich text content from Prismic.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Container } from '@mantine/core'
import type { RichTextField } from '@prismicio/client'

type TextSlice = {
  slice_type: 'text_slice'
  primary: {
    text?: RichTextField
  }
}

interface Props {
  slice: TextSlice
}

export function TextSlice({ slice }: Props) {
  return (
    <Container component="section" data-slice-type={slice.slice_type}>
      {renderRichText(slice.primary.text)}
    </Container>
  )
}
