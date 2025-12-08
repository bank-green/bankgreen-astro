import { Anchor, Group, Stack, Text } from "@mantine/core";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <nav className={classes.nav}>
        <Stack gap="sm" className={classes.section}>
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
        <Stack gap="sm" className={classes.section}>
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
        <Stack gap="sm" className={classes.section}>
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
      </nav>
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
    </footer>
  );
}
