import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  List,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { CheckIcon } from '@phosphor-icons/react'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import { Swoosh } from './Swoosh'

const CHECK_LIST = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels',
]

interface Props {
  page: PrismicDocument | null
}

export function UnknownBankContent({ page }: Props) {
  const text3 = page?.data?.text3 as RichTextField | undefined
  const text4 = page?.data?.text4 as RichTextField | undefined
  const text5 = page?.data?.text5 as RichTextField | undefined
  const text6 = page?.data?.text6 as RichTextField | undefined

  const text3Str = text3 ? prismic.asText(text3) : ''
  const text4Str = text4 ? prismic.asText(text4) : ''
  const text5Str = text5 ? prismic.asText(text5) : ''
  const text6Str = text6 ? prismic.asText(text6) : ''

  return (
    <>
      <Box data-breakout className="bg-white">
        <Grid className="contain py-24" gutter={32}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="/img/illustrations/dig.svg" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack className="h-full justify-center gap-6 pt-8">
              {text3 && text4 && (
                <Text>
                  <Text span className="font-bold text-lg md:text-2xl">
                    {text3Str}
                  </Text>{' '}
                  <Text span className="text-lg md:text-2xl">
                    {text4Str}
                  </Text>{' '}
                </Text>
              )}
              <Text className="md:text-xl">{text5Str}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>

      <Box data-breakout className="bg-arcticBlue">
        {/* Swoosh transitions from white down into arctic blue */}
        <Swoosh direction="down" color="var(--color-white)" />
        <Stack className="my-32 gap-12">
          <Title className="mx-auto">Join the Money Movement</Title>
          <Grid className="contain w-full" gutter={48}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Center className="h-full">
                <Text span className="text-lg md:text-xl lg:max-w-lg">
                  {text6Str}
                </Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List
                className="space-y-3 rounded-2xl bg-white p-8"
                icon={
                  <ThemeIcon color="green.1" size={24} radius="xl" className="shrink-0">
                    <CheckIcon size={18} weight="bold" className="text-green-500" />
                  </ThemeIcon>
                }
              >
                {CHECK_LIST.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </Grid.Col>
          </Grid>

          <Box className="contain my-8 w-full bg-sky-800 p-8 lg:rounded-2xl">
            <Stack className="gap-4">
              <Title order={3} className="mb-4 text-center text-textInverse">
                Sign up to Bank.Green. We'll take the fight to the banks together.
              </Title>
              <form className="mx-auto w-full max-w-160">
                <Group className="gap-2">
                  <TextInput
                    type="email"
                    placeholder="Your email address"
                    className="flex-1"
                    required
                  />
                  <Button type="submit">Join the Money Movement</Button>
                </Group>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
export default UnknownBankContent
