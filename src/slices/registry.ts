/**
 * Shared slice component registry.
 *
 * This file provides a centralized registry for slice components,
 * used by both SliceZone and NestedSliceZone.
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
import type { SliceType, SliceTypeMap } from './types'

/**
 * Base slice components (excludes accordion to prevent infinite nesting).
 * Used by NestedSliceZone for rendering linked content.
 */
export type BaseSliceType = Exclude<SliceType, 'accordion_slice'>

type BaseSliceComponentMap = {
  [K in BaseSliceType]: ComponentType<{ slice: SliceTypeMap[K]; className?: string }>
}

export const baseSliceComponents: BaseSliceComponentMap = {
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
 * Type guard to check if a slice_type is a valid base slice type.
 */
export function isBaseSliceType(sliceType: string): sliceType is BaseSliceType {
  return sliceType in baseSliceComponents
}

/**
 * Type guard to check if a slice_type is valid (including accordion).
 */
export function isValidSliceType(sliceType: string): sliceType is SliceType {
  return sliceType === 'accordion_slice' || isBaseSliceType(sliceType)
}
