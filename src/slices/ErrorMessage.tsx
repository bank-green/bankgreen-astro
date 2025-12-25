/**
 * ErrorMessage - Displays an error message with title and content.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Alert, Stack } from '@mantine/core'
import { WarningIcon } from '@phosphor-icons/react'
import type { ErrorMessageSlice as ErrorMessageSliceType } from './types'

interface Props {
  slice: ErrorMessageSliceType
  className?: string
}

export function ErrorMessage({ slice, className }: Props) {
  return (
    <Alert
      title={slice.primary.title}
      color="red"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      role="alert"
      icon={<WarningIcon />}
      className={className}
    >
      <Stack gap="xs">{renderRichText(slice.primary.content)}</Stack>
    </Alert>
  )
}
