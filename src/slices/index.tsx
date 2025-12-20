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

import type { ComponentType } from 'react'
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
import type { Slice, SliceType, SliceTypeMap } from './types'

// Export all types for use in other files
export type {
  AccordionSlice as AccordionSliceType,
  ButtonSlice as ButtonSliceType,
  EmbedSlice as EmbedSliceType,
  ErrorMessageSlice,
  FeaturedInSlice as FeaturedInSliceType,
  ImageSlice as ImageSliceType,
  LeadGenSlice,
  SharePicGallerySlice as SharePicGallerySliceType,
  Slice,
  SliceType,
  SliceTypeMap,
  SocialSharerSlice as SocialSharerSliceType,
  TableSlice as TableSliceType,
  TeamMemberSlice as TeamMemberSliceType,
  TextSlice as TextSliceType,
  ThanksSlice as ThanksSliceType,
} from './types'

/**
 * Type-safe component registry using mapped types.
 * Each component expects the exact slice type that corresponds to its key.
 */
type SliceComponentMap = {
  [K in SliceType]: ComponentType<{ slice: SliceTypeMap[K] }>
}

/**
 * Map of slice type identifiers to their React components.
 * Keys match the slice_type values from Prismic.
 *
 * This registry is fully type-safe: each component expects the exact
 * slice type that corresponds to its slice_type key.
 */
export const sliceComponents: SliceComponentMap = {
  accordion_slice: AccordionSlice as ComponentType<{ slice: SliceTypeMap['accordion_slice'] }>,
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
 * Type guard to check if a slice_type is valid.
 * Narrows the type from string to SliceType.
 */
function isValidSliceType(sliceType: string): sliceType is SliceType {
  return sliceType in sliceComponents
}

/**
 * SliceZone component - renders an array of Prismic slices.
 *
 * Usage in Astro:
 * ```astro
 * ---
 * import { SliceZone } from "@/slices";
 * import type { Slice } from "@/slices";
 * const page = await prismicClient.getSingle("homepage");
 * const slices = (page?.data?.slices || []) as Slice[];
 * ---
 * <SliceZone slices={slices} />
 * ```
 */

interface SliceZoneProps {
  slices: Slice[]
}

export function SliceZone({ slices }: SliceZoneProps) {
  if (!slices || !Array.isArray(slices)) {
    return null
  }

  return (
    <>
      {slices.map((slice, index) => {
        const key = `${slice.slice_type}-${index}`

        // Type guard to ensure we have a valid slice type
        if (!isValidSliceType(slice.slice_type)) {
          console.warn(`Unknown slice type: ${slice.slice_type}`)
          return (
            <div key={key} data-slice-type={slice.slice_type} data-unknown="true">
              Unknown slice type: {slice.slice_type}
            </div>
          )
        }

        // Type-safe component lookup - TypeScript knows slice_type is valid
        const Component = sliceComponents[slice.slice_type]

        // TypeScript now knows that Component expects the correct slice type
        // We need a type assertion here because TypeScript can't guarantee
        // the slice matches the component's expected type at this level
        return <Component key={key} slice={slice as never} />
      })}
    </>
  )
}
