/**
 * GDPR Cookie Consent Banner
 * Implements 2025 GDPR best practices with equal prominence for accept/decline
 * Uses Mantine Drawer sliding up from bottom
 */

import { Anchor, Button, Drawer, Group, MantineProvider, Stack, Text } from '@mantine/core'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { acceptCookies, declineCookies, initGdprStores, showBannerStore } from '@/lib/gdpr-store'
import { theme } from '@/styles/theme'

export function GdprBanner() {
  const isOpen = useStore(showBannerStore)

  useEffect(() => {
    // Initialize stores by reading cookies client-side
    initGdprStores()
  }, [])

  const handleAccept = () => {
    acceptCookies()
  }

  const handleDecline = () => {
    declineCookies()
  }

  return (
    <MantineProvider theme={theme}>
      <Drawer
        opened={isOpen}
        onClose={() => {}} // Prevent closing without choice
        position="bottom"
        withCloseButton={false}
        trapFocus
        lockScroll={false}
        size="12rem"
        classNames={{
          content: 'bg-sky-900',
          body: 'p-8',
        }}
      >
        <Group className="contain items-start justify-between gap-3">
          <Stack className="gap-1 text-textInverse">
            <Text className="text-sm">
              We use cookies to improve the site experience and analyze traffic. You can choose to
              accept or decline cookies.
            </Text>

            <Anchor href="/privacy" className="text-sm">
              Privacy policy
            </Anchor>
          </Stack>

          <Group className="gap-3">
            {/* Equal prominence for both buttons per GDPR 2025 requirements */}
            <Button onClick={handleDecline} size="md">
              Decline cookies
            </Button>

            <Button onClick={handleAccept} size="md">
              Allow cookies
            </Button>
          </Group>
        </Group>
      </Drawer>
    </MantineProvider>
  )
}
