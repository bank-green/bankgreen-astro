import { Anchor, AppShell, Burger, Button, Drawer, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export function Header() {
  const [opened, { toggle }] = useDisclosure()

  const NavLink = ({ classes, href, label }: { classes: string; href: string; label: string }) => (
    <Anchor href={href} className={classes} underline="hover">
      {label}
    </Anchor>
  )

  const NavLinks = ({ classes }: { classes: string }) => (
    <>
      <NavLink classes={classes} href="/sustainable-eco-banks" label="Sustainable Banks" />
      <NavLink classes={classes} href="/blog" label="Blog" />
      <NavLink classes={classes} href="/faq" label="FAQ" />
      <NavLink classes={classes} href="/contact" label="Contact" />
      <NavLink classes={classes} href="/take-action" label="Take Action" />
      <NavLink classes={classes} href="/impact" label="Switch Survey" />
      <Button
        href="/donate"
        size="compact-md"
        component="a"
        className="rounded-full bg-leaf-300 px-4 text-sky-800"
      >
        Donate
      </Button>
    </>
  )

  return (
    <AppShell.Header className="flex w-full items-center bg-sky-800 px-4 py-0 lg:mt-2 lg:rounded-xl lg:pl-6">
      <Group className="w-full items-center justify-between">
        <Anchor href="/" className="h-full" underline="never">
          <img src="/img/logo.svg" alt="Bank.Green" className="mt-2 ml-1 h-5 w-auto" />
        </Anchor>
        <Burger
          className="h-6 text-white"
          color="white"
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          size="sm"
        />
        <Group visibleFrom="md" className="gap-8">
          <NavLinks classes="text-sky-200 hover:text-white hover:no-underline transition" />
        </Group>
        <Drawer
          opened={opened}
          onClose={toggle}
          position="right"
          hiddenFrom="md"
          classNames={{
            content:
              'bg-linear-to-b bg-transparent from-[40px] from-transparent to-[40px] to-sky-800',
            body: 'bg-transparent',
            overlay:
              'bg-linear-to-l bg-transparent from-[120px] from-transparent to-[200px] to-black/75',
            header:
              'items-start bg-linear-to-l bg-transparent from-[40px] from-transparent to-[120px] to-sky-800 p-0',
            close: 'top-0 right-0 h-12 w-12 opacity-0 hover:bg-transparent',
          }}
        >
          <Stack className="items-start">
            <NavLinks classes="text-white" />
          </Stack>
        </Drawer>
      </Group>
    </AppShell.Header>
  )
}
