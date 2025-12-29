/**
 * GDPR Cookie Consent Banner
 * Implements 2025 GDPR best practices with equal prominence for accept/decline
 * Uses Mantine Drawer sliding up from bottom
 */

import { Anchor, Button, Drawer, Group, Stack, Text } from '@mantine/core'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { acceptCookies, declineCookies, initGdprStores, showBannerStore } from '@/lib/gdpr-store'

interface GdprBannerProps {
  showBanner: boolean
  allowCookies: boolean
}

export function GdprBanner({ showBanner, allowCookies }: GdprBannerProps) {
  const isOpen = useStore(showBannerStore)

  useEffect(() => {
    // Initialize stores with server-provided values
    initGdprStores(showBanner, allowCookies)
  }, [showBanner, allowCookies])

  const handleAccept = () => {
    acceptCookies()
  }

  const handleDecline = () => {
    declineCookies()
  }

  return (
    <Drawer
      opened={isOpen}
      onClose={() => {}} // Prevent closing without choice
      position="bottom"
      withCloseButton={false}
      trapFocus
      lockScroll={false}
      size="auto"
      padding="lg"
      classNames={{
        content: 'bg-gray-900',
        body: 'p-0',
      }}
      styles={{
        content: {
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        },
      }}
    >
      <Stack className="mx-auto max-w-screen-lg gap-4 px-4 py-2">
        <Text className="text-gray-200 text-sm leading-relaxed">
          We use cookies to improve the site experience and analyze traffic. You can choose to
          accept or decline cookies.
        </Text>

        <Group className="flex-wrap items-center justify-between gap-3">
          <Anchor
            href="/privacy"
            className="font-semibold text-sm text-sushi-200 no-underline hover:text-sushi-100 hover:underline"
          >
            Privacy policy
          </Anchor>

          <Group className="gap-3">
            {/* Equal prominence for both buttons per GDPR 2025 requirements */}
            <Button
              onClick={handleDecline}
              className="min-w-[120px] bg-gray-700 px-6 py-2 font-medium text-white hover:bg-gray-600"
              size="md"
            >
              Decline cookies
            </Button>

            <Button
              onClick={handleAccept}
              className="min-w-[120px] bg-sushi-500 px-6 py-2 font-medium text-white hover:bg-sushi-400"
              size="md"
            >
              Allow cookies
            </Button>
          </Group>
        </Group>
      </Stack>
    </Drawer>
  )
}
