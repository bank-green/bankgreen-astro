import { Button, Group } from '@mantine/core';
import { asLink } from '@prismicio/client';

interface Props {
  primary?: {
    link?: any;
    label?: string;
  };
  slice_type?: string;
}

export function ButtonSlice({ primary, slice_type }: Props) {
  const href = primary?.link ? asLink(primary.link) : '#';

  return (
    <Group data-slice-type={slice_type}>
      <Button component="a" href={href || '#'} variant="filled">
        {primary?.label || 'Click here'}
      </Button>
    </Group>
  );
}
