/**
 * ThanksSlice - Displays a thank you message section.
 *
 * Variations: default
 */
import type { Content } from '@prismicio/client'
import { asText } from '@prismicio/client'

interface Props {
  slice: Content.ThanksSliceSlice
}

export function ThanksSlice({ slice }: Props) {
  const { title, description, show_explore_section } = slice.primary

  const titleText = asText(title)
  const descriptionText = asText(description)

  return (
    <section data-slice-type={slice.slice_type}>
      <h1>{titleText}</h1>
      {descriptionText && <p>{descriptionText}</p>}
      {show_explore_section && (
        <nav aria-label="Explore more">
          {/* Explore section content would go here */}
          <p>Explore more options...</p>
        </nav>
      )}
    </section>
  )
}
