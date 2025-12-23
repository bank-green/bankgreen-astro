import {
  Anchor,
  Box,
  Button,
  Group,
  List,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { CheckIcon } from '@phosphor-icons/react'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import type { ReactNode } from 'react'
import { Swoosh } from '../Swoosh'

interface BankLayoutGoodProps {
  section1: ReactNode
  section2: ReactNode
  section3?: ReactNode
  callToActionSlices?: Slice[]
  showLeadGenSlice?: boolean
}

export function BankLayoutGood({
  section1,
  section2,
  section3,
  callToActionSlices = [],
  showLeadGenSlice = false,
}: BankLayoutGoodProps) {
  return (
    <Box className="page">
      {/* SECTION ONE */}
      <Box
        id="section-one"
        className="bg-linear-to-b from-sushi-50 to-sushi-100 pt-28"
        data-breakout
      >
        <Stack className="contain">{section1}</Stack>
        <Swoosh />
      </Box>

      {/* SECTION TWO */}
      <Box id="section-two" className="overflow-hidden bg-gray-50 py-16 text-gray-800">
        <div className="contain">{section2}</div>
      </Box>

      {/* SECTION THREE */}
      {section3 && <Box id="section-three">{section3}</Box>}

      {/* CALL TO ACTION */}
      <Box id="call-to-action" className="bg-ocean-100 text-gray-800" data-breakout>
        <Swoosh direction="down" />
        <div className="contain pt-32">
          {showLeadGenSlice && callToActionSlices && callToActionSlices.length > 0 ? (
            <SliceZone slices={callToActionSlices} />
          ) : (
            <Stack gap="lg">
              <Title order={2} className="mb-4 text-center">
                Join the Money Movement
              </Title>
              <Group className="mx-auto max-w-4xl flex-col items-center justify-center md:flex-row md:space-x-8">
                <Stack className="md:max-w-sm lg:w-1/2">
                  <Text className="mb-4 text-lg md:text-2xl">
                    We can't say it better than environmentalist Bill McKibben: "Money is the oxygen
                    on which the fire of global warming burns." But don't wait for the fire
                    department to turn up – join us!
                  </Text>
                </Stack>
                <Stack className="my-8 w-full rounded-2xl bg-white p-8 pl-4 lg:w-1/2">
                  <List
                    spacing="sm"
                    className="space-y-3"
                    icon={
                      <ThemeIcon color="green.1" size={24} radius="xl" className="shrink-0">
                        <CheckIcon size={18} weight="bold" className="text-green-500" />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>Learn about the issues via our blog updates</List.Item>
                    <List.Item>Join our campaigns to take action against fossil finance</List.Item>
                    <List.Item>Discover other ways to divest from fossil fuels</List.Item>
                  </List>
                </Stack>
              </Group>
              <Stack className="items-center">
                <Paper className="my-8 w-full max-w-4xl rounded-lg bg-sky-800 p-6 shadow-sm">
                  <Stack className="gap-4">
                    <Title order={3} className="mb-4 text-center text-textInverse">
                      Sign up to Bank.Green. We'll take the fight to the banks together.
                    </Title>
                    {/* Placeholder for signup form - will be replaced with actual form */}
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
                </Paper>
              </Stack>
            </Stack>
          )}
        </div>

        {/* Footer Image - Placeholder for Lottie animation */}
        <div className="pointer-events-none flex items-end justify-end">
          <div className="w-11/12">{/* Lottie animation placeholder */}</div>
        </div>
      </Box>

      {/* FOOTER */}
      <Box className="bg-sky-800" data-breakout>
        <Group className="contain w-full flex-wrap items-center py-4 text-gray-100 md:flex-nowrap md:py-8">
          <Stack className="w-full items-center p-6 md:p-8">
            <Title order={2} className="mb-4 w-full text-center text-gray-100">
              How do we derive our results?
            </Title>
            <Anchor href="/methodology" className="button-green inline-block w-max">
              Find out more
            </Anchor>
          </Stack>
        </Group>
      </Box>
    </Box>
  )
}
