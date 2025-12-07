/**
 * FeaturedInSlice - Displays a "featured in" logo.
 *
 * Variations: default
 */
import type { Content } from "@prismicio/client";

interface Props {
  slice: Content.FeaturedInSliceSlice;
}

export function FeaturedInSlice({ slice }: Props) {
  const { logo } = slice.primary;

  if (!logo?.url) return null;

  // Append width parameter for optimization
  const src = `${logo.url}&w=400`;

  return <img data-slice-type={slice.slice_type} src={src} alt={logo.alt || ""} />;
}
