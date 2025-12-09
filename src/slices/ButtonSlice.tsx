/**
 * ButtonSlice - Renders a link styled as a button.
 *
 * Variations: default
 */
import type { Content } from '@prismicio/client'
import { asLink } from '@prismicio/client'

interface Props {
  slice: Content.ButtonSliceSlice
}

export function ButtonSlice({ slice }: Props) {
  const { link, label } = slice.primary
  const href = asLink(link) || '#'

  return (
    <p data-slice-type={slice.slice_type}>
      <a href={href}>{label}</a>
    </p>
  )
}
