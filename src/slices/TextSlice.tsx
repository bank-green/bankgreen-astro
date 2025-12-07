/**
 * TextSlice - Renders rich text content from Prismic.
 *
 * Variations: default
 */
import type { Content } from "@prismicio/client";
import { renderRichText } from "@lib/prismicHelpers";

interface Props {
  slice: Content.TextSliceSlice;
}

export function TextSlice({ slice }: Props) {
  return <section data-slice-type={slice.slice_type}>{renderRichText(slice.primary.text)}</section>;
}
