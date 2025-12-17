import { Stack } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    text?: any;
  };
  slice_type?: string;
}

export function TextSlice({ primary, slice_type }: Props) {
  const html = primary?.text ? PrismicDOM.RichText.asHtml(primary.text) : '';

  return (
    <section data-slice-type={slice_type}>
      <Stack>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      </Stack>
    </section>
  );
}
