/**
 * Exit Intent Dialog
 * Shows a less obtrusive dialog (top-right corner) when user shows exit intent
 * Content loaded from Prismic CMS switchsurveyexit document
 */

import { Anchor, Button, Dialog, MantineProvider, Stack, Text, Title } from '@mantine/core'
import '@mantine/core/styles/Dialog.css'
import { useStore } from '@nanostores/react'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import { useEffect } from 'react'
import {
  clearExitIntentTimeout,
  handleExitIntent,
  initExitIntentStore,
  markDialogSeen,
  showDialogStore,
} from '@/lib/exit-intent-store'
import { theme } from '@/styles/theme'

interface ExitIntentDialogProps {
  hasSeenDialog: boolean
  content: PrismicDocument | null
}

export function ExitIntentDialog({ hasSeenDialog, content }: ExitIntentDialogProps) {
  const isOpen = useStore(showDialogStore)

  // Initialize stores on mount
  useEffect(() => {
    initExitIntentStore(hasSeenDialog)
  }, [hasSeenDialog])

  // Attach event listeners
  useEffect(() => {
    if (hasSeenDialog) {
      return
    }

    window.addEventListener('mousemove', handleExitIntent)
    document.body.addEventListener('mouseout', handleExitIntent)

    return () => {
      window.removeEventListener('mousemove', handleExitIntent)
      document.body.removeEventListener('mouseout', handleExitIntent)
      clearExitIntentTimeout()
    }
  }, [hasSeenDialog])

  const handleClick = () => {
    markDialogSeen()
  }

  const title = content?.data?.title as RichTextField | undefined
  const subtitle = content?.data?.subtitle as RichTextField | undefined
  const buttontext = content?.data?.buttontext as RichTextField | undefined
  const linkHref = '/impact'

  const titleText = title ? prismic.asText(title) : 'Before you go...'
  const subtitleText = subtitle
    ? prismic.asText(subtitle)
    : 'Help us understand why banks should go green by taking our quick survey.'
  const buttonText = buttontext ? prismic.asText(buttontext) : 'Take the Survey'

  return (
    <MantineProvider theme={theme}>
      <Dialog
        opened={isOpen}
        onClose={handleClick}
        position={{ top: 20, right: 20 }}
        size="lg"
        withCloseButton={true}
        zIndex={1000}
        classNames={{
          root: 'rounded-3xl bg-linear-to-bl from-blue-100 to-white shadow-xl',
          closeButton: 'rounded-full hover:bg-sky-900/10',
        }}
      >
        <Stack className="gap-4 p-10">
          <Title order={2} className="text-center text-gray-900">
            {titleText}
          </Title>

          <Text className="text-center text-gray-700">{subtitleText}</Text>

          <Anchor href={linkHref} onClick={handleClick}>
            <Button className="w-full">{buttonText}</Button>
          </Anchor>
        </Stack>
      </Dialog>
    </MantineProvider>
  )
}
