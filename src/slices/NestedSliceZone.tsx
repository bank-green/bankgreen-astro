/**
 * NestedSliceZone - Renders slices for nested/linked content.
 *
 * This component is separate from the main SliceZone to avoid circular dependencies.
 * It supports all slice types EXCEPT accordion_slice to prevent infinite nesting.
 *
 * Use this for rendering linked accordion content that should not contain more accordions.
 */

import type { ComponentType } from 'react'
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
import type { Slice, SliceTypeMap } from './types'

// Exclude accordion_slice from nested rendering to prevent infinite nesting
type NestedSliceType = Exclude<keyof SliceTypeMap, 'accordion_slice'>

// Type-safe component registry WITHOUT AccordionSlice
type NestedSliceComponentMap = {
  [K in NestedSliceType]: ComponentType<{ slice: SliceTypeMap[K]; className?: string }>
}

const nestedSliceComponents: NestedSliceComponentMap = {
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

function isNestedSliceType(sliceType: string): sliceType is NestedSliceType {
  return sliceType in nestedSliceComponents
}

interface NestedSliceZoneProps {
  slices: Slice[]
  className?: string
}

export function NestedSliceZone({ slices, className }: NestedSliceZoneProps) {
  if (!slices || !Array.isArray(slices)) {
    return null
  }

  return (
    <>
      {slices.map((slice, index) => {
        const key = `${slice.slice_type}-${index}`

        // Prevent nested accordions
        if (slice.slice_type === 'accordion_slice') {
          console.warn('Nested accordions are not supported - skipping accordion_slice')
          return null
        }

        if (!isNestedSliceType(slice.slice_type)) {
          console.warn(`Unknown or unsupported nested slice type: ${slice.slice_type}`)
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

        const Component = nestedSliceComponents[slice.slice_type]

        return (
          <Component
            key={key}
            slice={slice as never}
            className={className}
            data-slice-type={slice.slice_type}
          />
        )
      })}
    </>
  )
}
