/**
 * AccordionSlice - Expandable accordion with title and content using Mantine Accordion.
 *
 * Variations:
 * - default (Content Link): Links to another Prismic document
 * - richText: Inline rich text content
 * - richTextWithStep: Rich text with a step number prefix
 *
 * Note: This is an interactive component and needs client-side hydration.
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Accordion, Stack, Title, Text } from '@mantine/core'
import type { RichTextField } from '@prismicio/client'

type AccordionSlice = {
  slice_type: 'accordion_slice'
  variation: 'default' | 'richText' | 'richTextWithStep'
  primary: {
    contentlink?: { data?: { title?: string } }
    step?: string
    title?: string
    content?: RichTextField
  }
}

interface Props {
  slice: AccordionSlice
  // For "default" variation, the linked document's slices need to be passed in
  linkedContent?: AccordionSlice[]
}

export function AccordionSlice({ slice, linkedContent }: Props) {
  // Determine title based on variation
  let title: string
  if (slice.variation === 'default') {
    // Content Link variation - title comes from linked document
    const linkedData = slice.primary.contentlink as { data?: { title?: string } } | undefined
    title = linkedData?.data?.title || 'Untitled'
  } else if (slice.variation === 'richTextWithStep') {
    const primary = slice.primary as { step?: string; title?: string }
    title = primary.step ? `${primary.step}: ${primary.title || ''}` : primary.title || ''
  } else {
    // richText variation
    const primary = slice.primary as { title?: string }
    title = primary.title || ''
  }

  return (
    <Accordion data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Accordion.Item value="accordion-item">
        <Accordion.Control>
          <Title order={4}>{title}</Title>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            {slice.variation === 'default' && linkedContent ? (
              // Render linked document's slices - would need SliceZone here
              <Text>[Linked content would render here]</Text>
            ) : (
              renderRichText(slice.primary.content)
            )}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
