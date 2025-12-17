import { Stack } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    image?: {
      url?: string;
      alt?: string;
    };
    caption?: any;
  };
  slice_type?: string;
}

export function ImageSlice({ primary, slice_type }: Props) {
  const captionHtml = primary?.caption ? PrismicDOM.RichText.asHtml(primary.caption) : '';

  return (
    <figure data-slice-type={slice_type}>
      <Stack>
        {primary?.image?.url && (
          <img src={primary.image.url} alt={primary.image.alt || ''} style={{ maxWidth: '100%' }} />
        )}
        {captionHtml && (
          <figcaption style={{ textAlign: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: captionHtml }} />
          </figcaption>
        )}
      </Stack>
    </figure>
  );
}
