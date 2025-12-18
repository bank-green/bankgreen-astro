/**
 * ButtonSlice - Renders a link styled as a button using Mantine Button.
 *
 * Variations: default
 */
import { Button } from '@mantine/core'
import type { LinkField } from '@prismicio/client'
import { asLink } from '@prismicio/client'

type ButtonSlice = {
  slice_type: 'button_slice'
  primary: {
    link?: LinkField
    label?: string
  }
}

interface Props {
  slice: ButtonSlice
}

export function ButtonSlice({ slice }: Props) {
  const { link, label } = slice.primary
  const href = asLink(link) || '#'

  return (
    <Button
      data-slice-type={slice.slice_type}
      component="a"
      href={href}
      variant="filled"
    >
      {label}
    </Button>
  )
}
