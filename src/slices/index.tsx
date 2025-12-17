/**
 * Slice components index
 *
 * Maps Prismic slice types to React components.
 * Use with SliceZone to render arrays of slices from Prismic.
 */
export { AccordionSlice } from '@components/slices/AccordionSlice'
export { ButtonSlice } from '@components/slices/ButtonSlice'
export { EmbedSlice } from '@components/slices/EmbedSlice'
export { ErrorMessage } from '@components/slices/ErrorMessage'
export { FeaturedInSlice } from '@components/slices/FeaturedInSlice'
export { ImageSlice } from '@components/slices/ImageSlice'
export { LeadGen } from '@components/slices/LeadGen'
export { SharePicGallerySlice } from '@components/slices/SharePicGallerySlice'
export { SocialSharerSlice } from '@components/slices/SocialSharerSlice'
export { TableSlice } from '@components/slices/TableSlice'
export { TeamMemberSlice } from '@components/slices/TeamMemberSlice'
export { TextSlice } from '@components/slices/TextSlice'
export { ThanksSlice } from '@components/slices/ThanksSlice'

import type { ComponentType } from 'react'

import { AccordionSlice } from '@components/slices/AccordionSlice'
import { ButtonSlice } from '@components/slices/ButtonSlice'
import { EmbedSlice } from '@components/slices/EmbedSlice'
import { ErrorMessage } from '@components/slices/ErrorMessage'
import { FeaturedInSlice } from '@components/slices/FeaturedInSlice'
import { ImageSlice } from '@components/slices/ImageSlice'
import { LeadGen } from '@components/slices/LeadGen'
import { SharePicGallerySlice } from '@components/slices/SharePicGallerySlice'
import { SocialSharerSlice } from '@components/slices/SocialSharerSlice'
import { TableSlice } from '@components/slices/TableSlice'
import { TeamMemberSlice } from '@components/slices/TeamMemberSlice'
import { TextSlice } from '@components/slices/TextSlice'
import { ThanksSlice } from '@components/slices/ThanksSlice'

/**
 * Map of slice type identifiers to their React components.
 * Keys match the slice_type values from Prismic.
 */
export const sliceComponents: Record<string, ComponentType<any>> = {
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

        return <Component key={`${slice.slice_type}-${index}`} {...slice} />
      })}
    </>
  )
}
