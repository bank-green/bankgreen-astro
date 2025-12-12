import { Anchor, AppShell, Container, Group, Stack, Text } from '@mantine/core'
import classes from './Footer.module.css'

export function Footer() {
  return (
    <AppShell.Footer className="relative">
      <Container className="mx-auto w-full px-6 lg:px-0">
        <Group className="w-full items-start justify-between py-4">
          <img className="h-8 lg:my-2" src="/img/trim-hor-light.svg" alt="Bank.Green"></img>

          <Group className="grow items-start justify-between gap-12 md:grow-0 md:gap-36">
            <Stack gap="sm" className="text-right">
              <Anchor href="/sustainable-eco-banks" underline="hover">
                Sustainable Banks
              </Anchor>
              <Anchor href="/take-action" underline="hover">
                Take Action
              </Anchor>
              <Anchor href="/donate" underline="hover">
                Donate
              </Anchor>
              <Anchor href="/certification" underline="hover">
                Fossil Free Certification
              </Anchor>
            </Stack>
            <Stack gap="sm" className="text-right">
              <Anchor href="/blog" underline="hover">
                Blog
              </Anchor>
              <Anchor href="/partners" underline="hover">
                Our Partners
              </Anchor>
              <Anchor href="/press" underline="hover">
                Press
              </Anchor>
              <Anchor href="/volunteers" underline="hover">
                Volunteering
              </Anchor>
            </Stack>
            <Stack gap="sm" className="text-right">
              <Anchor href="/team" underline="hover">
                Who We Are
              </Anchor>
              <Anchor href="/contact" underline="hover">
                Contact Us
              </Anchor>
              <Anchor href="/faq" underline="hover">
                FAQ
              </Anchor>
            </Stack>
          </Group>
        </Group>
      </Container>
      <Text size="sm" className={classes.copyright}>
        Bank.Green is a project of Empowerment Works Inc. 501(c)(3)
      </Text>
      <Group gap="md" className={classes.legal}>
        <Anchor href="/disclaimer" underline="hover" size="sm">
          Disclaimer
        </Anchor>
        <Anchor href="/privacy" underline="hover" size="sm">
          Privacy Policy
        </Anchor>
      </Group>
    </AppShell.Footer>
  )
}
