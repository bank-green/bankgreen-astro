/**
 * Central type definitions for all Prismic slice types.
 *
 * This file contains:
 * - Individual slice type definitions
 * - Discriminated union type (Slice) combining all slices
 * - Mapped type (SliceTypeMap) for type-safe component registry
 */

import type { ImageField, LinkField, RichTextField } from '@prismicio/client'

export type AccordionSlice = {
  slice_type: 'accordion_slice'
  variation: 'default' | 'richText' | 'richTextWithStep'
  primary: {
    contentlink?: {
      data?: {
        title?: string
        slices?: Slice[]
      }
    }
    step?: string
    title?: string
    content?: RichTextField
  }
}

export type ButtonSlice = {
  slice_type: 'button_slice'
  primary: {
    link?: LinkField
    label?: string
  }
}

export type EmbedSlice = {
  slice_type: 'embed_slice'
  primary: {
    target?: {
      html?: string
      provider_name?: string
    }
  }
}

export type ErrorMessageSlice = {
  slice_type: 'error_message'
  variation: string
  primary: {
    title?: string
    content?: RichTextField
  }
}

export type FeaturedInSlice = {
  slice_type: 'featured_in_slice'
  primary: {
    logo?: ImageField
    class?: string
  }
}

export type ImageSlice = {
  slice_type: 'image_slice'
  primary: {
    image?: ImageField
    caption?: RichTextField
  }
}

export type LeadGenSlice = {
  slice_type: 'lead_gen'
  primary: {
    title?: RichTextField
    show_bank_field?: boolean
    show_status_field?: boolean
    form_bank_label?: string
    form_name_label?: string
    form_email_label?: string
    form_status_label?: string
    button_label?: string
  }
  items: Array<{
    bullet_text?: RichTextField
    dropdown_status_option?: string
  }>
}

export type SharePicGallerySlice = {
  slice_type: 'share_pic_gallery_slice'
  primary: Record<string, unknown>
}

export type SocialSharerSlice = {
  slice_type: 'social_sharer_slice'
  primary: {
    text?: RichTextField
  }
}

export type TableSlice = {
  slice_type: 'table_slice'
  variation: string
  primary: {
    column_1_header?: string
    column_2_header?: string
    column_3_header?: string
    column_4_header?: string
  }
  items: Array<{
    icon?: { url?: string; name?: string }
    column_1?: RichTextField
    column_2?: RichTextField
    column_3?: RichTextField
    column_4?: RichTextField
  }>
}

export type TeamMemberSlice = {
  slice_type: 'team_member_slice'
  primary: {
    name?: RichTextField
    description?: RichTextField
    img?: ImageField
    link?: LinkField
  }
}

export type TextSlice = {
  slice_type: 'text_slice'
  primary: {
    text?: RichTextField
  }
}

export type ThanksSlice = {
  slice_type: 'thanks_slice'
  primary: {
    title?: RichTextField
    description?: RichTextField
    show_explore_section?: boolean
  }
}

/**
 * Discriminated union of all slice types.
 * TypeScript can narrow this type based on the slice_type discriminator.
 */
export type Slice =
  | AccordionSlice
  | ButtonSlice
  | EmbedSlice
  | ErrorMessageSlice
  | FeaturedInSlice
  | ImageSlice
  | LeadGenSlice
  | SharePicGallerySlice
  | SocialSharerSlice
  | TableSlice
  | TeamMemberSlice
  | TextSlice
  | ThanksSlice

/**
 * Type-safe mapping from slice_type strings to their corresponding types.
 * Used for creating a type-safe component registry.
 */
export type SliceTypeMap = {
  accordion_slice: AccordionSlice
  button_slice: ButtonSlice
  embed_slice: EmbedSlice
  error_message: ErrorMessageSlice
  featured_in_slice: FeaturedInSlice
  image_slice: ImageSlice
  lead_gen: LeadGenSlice
  share_pic_gallery_slice: SharePicGallerySlice
  social_sharer_slice: SocialSharerSlice
  table_slice: TableSlice
  team_member_slice: TeamMemberSlice
  text_slice: TextSlice
  thanks_slice: ThanksSlice
}

/**
 * Union of all valid slice_type string literals.
 * Useful for type guards and runtime validation.
 */
export type SliceType = keyof SliceTypeMap
