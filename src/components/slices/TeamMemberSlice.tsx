import { Card, Stack, Title, Text, Button, Group } from '@mantine/core';
import { asLink, asText } from '@prismicio/client';

interface Props {
  primary?: {
    name?: any;
    description?: any;
    img?: {
      url?: string;
    };
    link?: any;
  };
  slice_type?: string;
}

export function TeamMemberSlice({ primary, slice_type }: Props) {
  const nameText = primary?.name ? asText(primary.name) : '';
  const descriptionText = primary?.description ? asText(primary.description) : '';
  const href = primary?.link ? asLink(primary.link) : undefined;

  return (
    <Card data-slice-type={slice_type} shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        {primary?.img?.url && (
          <img src={primary.img.url} alt={nameText || ''} style={{ maxWidth: '100%' }} />
        )}
        <Title order={3}>{nameText}</Title>
        <Text>{descriptionText}</Text>
        {href && (
          <Button component="a" href={href} variant="light">
            View profile
          </Button>
        )}
      </Stack>
    </Card>
  );
}
