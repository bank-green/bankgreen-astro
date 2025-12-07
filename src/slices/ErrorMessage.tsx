/**
 * ErrorMessage - Displays an error message with title and content.
 *
 * Variations: default
 */
import type { Content } from "@prismicio/client";
import { renderRichText } from "@lib/prismicHelpers";

interface Props {
  slice: Content.ErrorMessageSlice;
}

export function ErrorMessage({ slice }: Props) {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} role="alert">
      <h3>{slice.primary.title}</h3>
      {renderRichText(slice.primary.content)}
    </section>
  );
}
