/**
 * EmbedSlice - Renders embedded content (YouTube, Instagram, etc.)
 *
 * Variations: default
 */
import type { Content } from "@prismicio/client";

interface Props {
  slice: Content.EmbedSliceSlice;
}

export function EmbedSlice({ slice }: Props) {
  const embed = slice.primary.target;

  if (!embed?.html) {
    return null;
  }

  // Make YouTube embeds responsive by replacing fixed dimensions
  let html = embed.html;
  if (embed.provider_name === "YouTube") {
    html = html.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
  }

  return (
    <figure data-slice-type={slice.slice_type} data-provider={embed.provider_name}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
