/**
 * FeaturedInSlice - Displays a "featured in" logo.
 *
 * Variations: default
 */
import { Image } from '@mantine/core'
import type { ImageField } from '@prismicio/client'

type FeaturedInSlice = {
  slice_type: 'featured_in_slice'
  primary: {
    logo?: ImageField
    class?: string
  }
}

interface Props {
  slice: FeaturedInSlice
}

export function FeaturedInSlice({ slice }: Props) {
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
    />
  )
}
