/**
 * TeamMemberSlice - Displays a team member card.
 *
 * Variations: default
 */
import type { Content } from '@prismicio/client'
import { asLink, asText } from '@prismicio/client'

interface Props {
  slice: Content.TeamMemberSliceSlice
}

export function TeamMemberSlice({ slice }: Props) {
  const { name, description, img, link } = slice.primary

  const nameText = asText(name)
  const descriptionText = asText(description)
  const href = asLink(link)

  return (
    <article data-slice-type={slice.slice_type}>
      {img?.url && <img src={img.url} alt={nameText || ''} />}
      <h3>{nameText}</h3>
      <p>{descriptionText}</p>
      {href && <a href={href}>View profile</a>}
    </article>
  )
}
