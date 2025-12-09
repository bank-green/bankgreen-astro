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
      {image?.url && (
        <img src={image.url} alt={image.alt || ''} className="mx-auto" style={{ maxWidth: '100%' }} />
      )}
      {caption && <figcaption className="text-center">{renderRichText(caption)}</figcaption>}
    </figure>
  )
}
