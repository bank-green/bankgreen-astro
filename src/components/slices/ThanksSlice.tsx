import { Stack, Title, Text } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    title?: any;
    description?: any;
    show_explore_section?: boolean;
  };
  slice_type?: string;
}

export function ThanksSlice({ primary, slice_type }: Props) {
  const titleText = primary?.title ? PrismicDOM.RichText.asText(primary.title) : '';
  const descriptionText = primary?.description ? PrismicDOM.RichText.asText(primary.description) : '';

  return (
    <section data-slice-type={slice_type}>
      <Stack>
        <Title order={1}>{titleText}</Title>
        {descriptionText && <Text>{descriptionText}</Text>}
        {primary?.show_explore_section && (
          <nav aria-label="Explore more">
            <Text>Explore more options...</Text>
          </nav>
        )}
      </Stack>
    </section>
  );
}
