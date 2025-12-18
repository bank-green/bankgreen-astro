/**
 * Slice components index
 *
 * Maps Prismic slice types to React components.
 * Use with SliceZone to render arrays of slices from Prismic.
 */
export { AccordionSlice } from './AccordionSlice'
export { ButtonSlice } from './ButtonSlice'
export { EmbedSlice } from './EmbedSlice'
export { ErrorMessage } from './ErrorMessage'
export { FeaturedInSlice } from './FeaturedInSlice'
export { ImageSlice } from './ImageSlice'
export { LeadGen } from './LeadGen'
export { SharePicGallerySlice } from './SharePicGallerySlice'
export { SocialSharerSlice } from './SocialSharerSlice'
export { TableSlice } from './TableSlice'
export { TeamMemberSlice } from './TeamMemberSlice'
export { TextSlice } from './TextSlice'
export { ThanksSlice } from './ThanksSlice'

import { AccordionSlice } from './AccordionSlice'
import { ButtonSlice } from './ButtonSlice'
import { EmbedSlice } from './EmbedSlice'
import { ErrorMessage } from './ErrorMessage'
import { FeaturedInSlice } from './FeaturedInSlice'
import { ImageSlice } from './ImageSlice'
import { LeadGen } from './LeadGen'
import { SharePicGallerySlice } from './SharePicGallerySlice'
import { SocialSharerSlice } from './SocialSharerSlice'
import { TableSlice } from './TableSlice'
import { TeamMemberSlice } from './TeamMemberSlice'
import { TextSlice } from './TextSlice'
import { ThanksSlice } from './ThanksSlice'
import type { ComponentType } from 'react'

/**
 * Map of slice type identifiers to their React components.
 * Keys match the slice_type values from Prismic.
 */
export const sliceComponents: Record<string, ComponentType<{ slice: unknown }>> = {
  accordion_slice: AccordionSlice,
  button_slice: ButtonSlice,
  embed_slice: EmbedSlice,
  error_message: ErrorMessage,
  featured_in_slice: FeaturedInSlice,
  image_slice: ImageSlice,
  lead_gen: LeadGen,
  share_pic_gallery_slice: SharePicGallerySlice,
  social_sharer_slice: SocialSharerSlice,
  table_slice: TableSlice,
  team_member_slice: TeamMemberSlice,
  text_slice: TextSlice,
  thanks_slice: ThanksSlice,
}

/**
 * SliceZone component - renders an array of Prismic slices.
 *
 * Usage in Astro:
 * ```astro
 * ---
 * import { SliceZone } from "@/slices";
 * const page = await prismicClient.getSingle("homepage");
 * ---
 * <SliceZone slices={page.data.slices} />
 * ```
 */

interface SliceZoneProps {
  slices: Array<{ slice_type: string; [key: string]: unknown }>
}
export function SliceZone({ slices }: SliceZoneProps) {
  if (!slices || !Array.isArray(slices)) {
    return null
  }

  return (
    <>
      {slices.map((slice, index) => {
        const Component = sliceComponents[slice.slice_type]

        if (!Component) {
          console.warn(`Unknown slice type: ${slice.slice_type}`)
          return (
            <div
              key={`${slice.slice_type}-${index}`}
              data-slice-type={slice.slice_type}
              data-unknown="true"
            >
              Unknown slice type: {slice.slice_type}
            </div>
          )
        }

        return <Component key={`${slice.slice_type}-${index}`} slice={slice} />
      })}
    </>
  )
}
