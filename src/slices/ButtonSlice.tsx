/**
 * ButtonSlice - Renders a link styled as a button using Mantine Button.
 *
 * Variations: default
 */
import { Button } from '@mantine/core'
import { asLink } from '@prismicio/client'
import type { ButtonSlice as ButtonSliceType } from './types'

interface Props {
  slice: ButtonSliceType
  className?: string
}

export function ButtonSlice({ slice, className }: Props) {
  const { link, label } = slice.primary
  const href = asLink(link) || '#'

  return (
    <Button
      data-slice-type={slice.slice_type}
      component="a"
      href={href}
      variant="filled"
      className={`max-w-fit ${className}`}
      size="md"
    >
      {label}
    </Button>
  )
}
