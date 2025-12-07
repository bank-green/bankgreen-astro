/**
 * AccordionSlice - Expandable accordion with title and content.
 *
 * Variations:
 * - default (Content Link): Links to another Prismic document
 * - richText: Inline rich text content
 * - richTextWithStep: Rich text with a step number prefix
 *
 * Note: This is an interactive component and needs client-side hydration.
 */
import { useState } from "react";
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { renderRichText } from "@lib/prismicHelpers";

interface Props {
  slice: Content.AccordionSliceSlice;
  // For "default" variation, the linked document's slices need to be passed in
  linkedContent?: Content.AccordionSliceSlice[];
}

export function AccordionSlice({ slice, linkedContent }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Determine title based on variation
  let title: string;
  if (slice.variation === "default") {
    // Content Link variation - title comes from linked document
    const linkedData = slice.primary.contentlink as { data?: { title?: string } } | undefined;
    title = linkedData?.data?.title || "Untitled";
  } else if (slice.variation === "richTextWithStep") {
    const primary = slice.primary as { step?: string; title?: string };
    title = primary.step ? `${primary.step}: ${primary.title || ""}` : (primary.title || "");
  } else {
    // richText variation
    const primary = slice.primary as { title?: string };
    title = primary.title || "";
  }

  return (
    <details
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary>
        <h2>{title}</h2>
      </summary>
      <div>
        {slice.variation === "default" && linkedContent ? (
          // Render linked document's slices - would need SliceZone here
          <p>[Linked content would render here]</p>
        ) : (
          renderRichText((slice.primary as { content?: Content.TextSliceSlice["primary"]["text"] }).content)
        )}
      </div>
    </details>
  );
}
