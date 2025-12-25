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
import { Accordion, Stack, Text, Title } from '@mantine/core'
import type { AccordionSlice as AccordionSliceType } from './types'

interface Props {
  slice: AccordionSliceType
  className?: string
  // For "default" variation, the linked document's slices need to be passed in
  linkedContent?: AccordionSliceType[]
}

export function AccordionSlice({ slice, className, linkedContent }: Props) {
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
    <Accordion
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={className}
    >
      <Accordion.Item value="accordion-item">
        <Accordion.Control>
          <Title order={4}>{title}</Title>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack className="[&_a]:inline">
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
