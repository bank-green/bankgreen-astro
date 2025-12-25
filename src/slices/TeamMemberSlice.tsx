/**
 * TeamMemberSlice - Displays a team member card.
 *
 * Variations: default
 */
import { Button, Card, Image, Stack, Text, Title } from '@mantine/core'
import { asLink, asText } from '@prismicio/client'
import type { TeamMemberSlice as TeamMemberSliceType } from './types'

interface Props {
  slice: TeamMemberSliceType
  className?: string
}

export function TeamMemberSlice({ slice, className }: Props) {
  const { name, description, img, link } = slice.primary

  const nameText = asText(name)
  const descriptionText = asText(description)
  const href = asLink(link)

  return (
    <Card
      data-slice-type={slice.slice_type}
      p="lg"
      radius="md"
      className={`w-full ${className || ''}`}
    >
      <Card.Section className="py-8">
        {img?.url && (
          <Image
            src={img.url}
            alt={nameText || ''}
            className="mx-auto aspect-square h-auto w-1/2 rounded-full"
          />
        )}
      </Card.Section>

      <Stack className="grow justify-between">
        <Stack>
          <Title order={3}>{nameText}</Title>
          <Text size="sm">{descriptionText}</Text>
        </Stack>
        {href && (
          <Button component="a" href={href} variant="light" fullWidth>
            View profile
          </Button>
        )}
      </Stack>
    </Card>
  )
}
