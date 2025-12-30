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
export { NestedSliceZone } from './NestedSliceZone'
export { SharePicGallerySlice } from './SharePicGallerySlice'
export { SocialSharerSlice } from './SocialSharerSlice'
export { TableSlice } from './TableSlice'
export { TeamMemberSlice } from './TeamMemberSlice'
export { TextSlice } from './TextSlice'
export { ThanksSlice } from './ThanksSlice'

import type { ComponentType } from 'react'
import { AccordionSlice } from './AccordionSlice'
import { baseSliceComponents, isValidSliceType } from './registry'
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

// Re-export registry utilities
export { isValidSliceType } from './registry'

/**
 * Type-safe component registry using mapped types.
 * Each component expects the exact slice type that corresponds to its key.
 */
type SliceComponentMap = {
  [K in SliceType]: ComponentType<{ slice: SliceTypeMap[K]; className?: string }>
}

/**
 * Map of slice type identifiers to their React components.
 * Keys match the slice_type values from Prismic.
 *
 * This registry includes all slice components, extending the base registry
 * with accordion support for top-level slice rendering.
 */
export const sliceComponents: SliceComponentMap = {
  ...baseSliceComponents,
  accordion_slice: AccordionSlice,
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
  className?: string | undefined
}

export function SliceZone({ slices, className }: SliceZoneProps) {
  if (!slices || !Array.isArray(slices)) {
    return null
  }

  return (
    <>
      {slices.map((slice, index) => {
        const key = `${slice.slice_type}-${index}`

        // Type guard to ensure we have a valid slice type
        if (!isValidSliceType(slice.slice_type)) {
          if (import.meta.env.DEV) {
            console.warn(`Unknown slice type: ${slice.slice_type}`)
          }
          return (
            <div
              key={key}
              data-slice-type={slice.slice_type}
              data-unknown="true"
              className={className}
            >
              Unknown slice type: {slice.slice_type}
            </div>
          )
        }

        // Get the component for this slice type
        // The type assertion is safe here because we've validated the slice_type
        // via isValidSliceType, and the discriminated union guarantees the slice
        // data matches the expected shape for that slice_type
        const Component = sliceComponents[slice.slice_type] as ComponentType<{
          slice: typeof slice
          className?: string
        }>

        return <Component key={key} slice={slice} className={className} data-slice-type={slice.slice_type} />
      })}
    </>
  )
}
