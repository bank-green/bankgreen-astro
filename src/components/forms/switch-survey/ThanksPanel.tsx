import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import { Anchor, Group, Stack, Text } from '@mantine/core'
import { CheckIcon } from '@phosphor-icons/react'

export function ThanksPanel({
  content,
  extendedHref,
}: {
  content: SwitchSurveyContent

  extendedHref?: string | null
}) {
  return (
    <Stack className="items-center gap-3 px-4 py-6">
      <Group className="h-[42px] w-[42px] items-center justify-center rounded-full bg-green-500">
        <CheckIcon size={22} weight="bold" />
      </Group>
      <Text className="text-sm">{content.thanksText}</Text>
      {extendedHref && (
        <Text className="text-center text-sm text-white">
          {content.extendedFormText}{' '}
          <Anchor href={extendedHref} className="text-green-300 text-sm underline">
            {content.extendedFormCta}
          </Anchor>
        </Text>
      )}
    </Stack>
  )
}
