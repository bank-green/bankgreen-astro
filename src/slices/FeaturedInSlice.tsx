/**
 * FeaturedInSlice - Displays a "featured in" logo.
 *
 * Variations: default
 */
import { Image } from '@mantine/core'
import type { FeaturedInSlice as FeaturedInSliceType } from './types'

interface Props {
  slice: FeaturedInSliceType
  className?: string
}

export function FeaturedInSlice({ slice, className }: Props) {
  const { logo } = slice.primary

  if (!logo?.url) return null

  // Append width parameter for optimization
  const src = `${logo.url}&w=400`

  return (
    <Image
      src={src}
      alt={logo.alt || ''}
      data-slice-type={slice.slice_type}
      mah={40}
      w="auto"
      fit="contain"
      className={className}
    />
  )
}
