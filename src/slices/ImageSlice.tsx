/**
 * ImageSlice - Renders an image with optional caption.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import type { Content } from '@prismicio/client'

interface Props {
  slice: Content.ImageSliceSlice
}

export function ImageSlice({ slice }: Props) {
  const { image, caption } = slice.primary

  return (
    <figure data-slice-type={slice.slice_type}>
      {image?.url && <img src={image.url} alt={image.alt || ''} />}
      {caption && <figcaption>{renderRichText(caption)}</figcaption>}
    </figure>
  )
}
