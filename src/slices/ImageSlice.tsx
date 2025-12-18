/**
 * ImageSlice - Renders an image with optional caption.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Image, Stack, Text } from '@mantine/core'
import type { RichTextField, ImageField } from '@prismicio/client'

type ImageSlice = {
  slice_type: 'image_slice'
  primary: {
    image?: ImageField
    caption?: RichTextField
  }
}

interface Props {
  slice: ImageSlice
}

export function ImageSlice({ slice }: Props) {
  const { image, caption } = slice.primary

  return (
    <Stack component="figure" data-slice-type={slice.slice_type} align="center">
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt || ''}
          style={{ maxWidth: '100%' }}
        />
      )}
      {caption && (
        <Text component="figcaption" ta="center" size="sm">
          {renderRichText(caption)}
        </Text>
      )}
    </Stack>
  )
}
