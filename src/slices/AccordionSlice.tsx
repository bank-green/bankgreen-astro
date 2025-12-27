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
import { Accordion, Stack, Title } from '@mantine/core'
import { NestedSliceZone } from './NestedSliceZone'
import type { AccordionSlice as AccordionSliceType, Slice } from './types'

interface Props {
  slice: AccordionSliceType
  className?: string
}

export function AccordionSlice({ slice, className }: Props) {
  // Determine title and extract linked slices based on variation
  let title: string
  let linkedSlices: Slice[] | undefined

  if (slice.variation === 'default') {
    // Content Link variation - title and slices come from linked document
    const linkedData = slice.primary.contentlink?.data
    title = linkedData?.title || 'Untitled'
    linkedSlices = linkedData?.slices
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
          <Title order={5}>{title}</Title>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack className="[&_a]:inline">
            {slice.variation === 'default' && linkedSlices ? (
              <NestedSliceZone slices={linkedSlices} />
            ) : (
              renderRichText(slice.primary.content)
            )}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
