interface Props {
  primary?: {
    logo?: {
      url?: string;
      alt?: string;
    };
    class?: string;
  };
  slice_type?: string;
}

export function FeaturedInSlice({ primary, slice_type }: Props) {
  if (!primary?.logo?.url) {
    return null;
  }

  const src = `${primary.logo.url}&w=400`;
  const className = primary.class ?? 'h-10 w-auto';

  return (
    <img
      data-slice-type={slice_type}
      src={src}
      alt={primary.logo.alt || ''}
      className={className}
    />
  );
}
