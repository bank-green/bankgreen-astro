import { Accordion, Stack } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    contentlink?: {
      data?: {
        title?: string;
      };
    };
    step?: string;
    title?: string;
    content?: any;
  };
  variation?: string;
  slice_type?: string;
}

export function AccordionSlice({ primary, variation, slice_type }: Props) {
  // Determine title based on variation
  let title = '';
  if (variation === 'default') {
    const linkedData = primary?.contentlink as { data?: { title?: string } } | undefined;
    title = linkedData?.data?.title || 'Untitled';
  } else if (variation === 'richTextWithStep') {
    title = primary?.step ? `${primary.step}: ${primary?.title || ''}` : primary?.title || '';
  } else {
    title = primary?.title || '';
  }

  const contentHtml = primary?.content ? PrismicDOM.RichText.asHtml(primary.content) : '';

  return (
    <Accordion data-slice-type={slice_type} data-slice-variation={variation}>
      <Accordion.Item value="accordion-item">
        <Accordion.Control>
          <h2>{title}</h2>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            {contentHtml && <div dangerouslySetInnerHTML={{ __html: contentHtml }} />}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
