import { Stack, Title, Alert } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    title?: string;
    content?: any;
  };
  variation?: string;
  slice_type?: string;
}

export function ErrorMessage({ primary, variation, slice_type }: Props) {
  const contentHtml = primary?.content ? PrismicDOM.RichText.asHtml(primary.content) : '';

  return (
    <section data-slice-type={slice_type} data-slice-variation={variation} role="alert">
      <Alert color="red">
        <Stack>
          <Title order={3}>{primary?.title}</Title>
          {contentHtml && <div dangerouslySetInnerHTML={{ __html: contentHtml }} />}
        </Stack>
      </Alert>
    </section>
  );
}
