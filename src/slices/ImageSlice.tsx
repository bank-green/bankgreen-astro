/**
 * ImageSlice - Renders an image with optional caption.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Box, Image, Text } from '@mantine/core'
import type { ImageSlice as ImageSliceType } from './types'

interface Props {
  slice: ImageSliceType
  className?: string
}

export function ImageSlice({ slice, className }: Props) {
  const { image, caption } = slice.primary

  return (
    <Box component="figure" data-slice-type={slice.slice_type} className={`m-0 ${className}`}>
      {image?.url && <Image src={image.url} alt={image.alt || ''} className="max-w-full" />}
      {caption && (
        <Text component="figcaption" ta="center" size="sm">
          {renderRichText(caption)}
        </Text>
      )}
    </Box>
  )
}
