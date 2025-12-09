/**
 * TextSlice - Renders rich text content from Prismic.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import type { Content } from '@prismicio/client'

interface Props {
  slice: Content.TextSliceSlice
}

export function TextSlice({ slice }: Props) {
  return <section data-slice-type={slice.slice_type}>{renderRichText(slice.primary.text)}</section>
}
