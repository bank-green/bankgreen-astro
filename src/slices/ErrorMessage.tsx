/**
 * ErrorMessage - Displays an error message with title and content.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Alert, Stack } from '@mantine/core'
import type { RichTextField } from '@prismicio/client'
import { WarningIcon } from '@phosphor-icons/react'

type ErrorMessageSlice = {
  slice_type: 'error_message'
  variation: string
  primary: {
    title?: string
    content?: RichTextField
  }
}

interface Props {
  slice: ErrorMessageSlice
}

export function ErrorMessage({ slice }: Props) {
  return (
    <Alert
      title={slice.primary.title}
      color="red"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      role="alert"
      icon={<WarningIcon />}
    >
      <Stack gap="xs">
        {renderRichText(slice.primary.content)}
      </Stack>
    </Alert>
  )
}
