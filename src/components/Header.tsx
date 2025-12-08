import { Anchor, Group } from "@mantine/core";

export function Header() {
  return (
    <Group className="justify-between w-full bg-sky-800 p-4 ">
      <Anchor href="/" className="text-white" underline="never">
        bank.green
      </Anchor>
      <Group className="gap-2">
        <Anchor href="/sustainable-eco-banks" underline="hover">
          Sustainable Banks
        </Anchor>
        <Anchor href="/blog" underline="hover">
          Blog
        </Anchor>
        <Anchor href="/faq" underline="hover">
          FAQ
        </Anchor>
        <Anchor href="/contact" underline="hover">
          Contact
        </Anchor>
        <Anchor href="/take-action" underline="hover">
          Take Action
        </Anchor>
        <Anchor href="/impact" underline="hover">
          Switch Survey
        </Anchor>
        <Anchor href="/donate" underline="hover">
          Donate
        </Anchor>
      </Group>
    </Group>
  );
}
