import type { PlanningValues } from '@lib/switch-survey-schemas'
import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import { Button, Stack, Text, TextInput } from '@mantine/core'
import type { useForm } from '@mantine/form'
import { ConsentCheckboxes } from './ConsentCheckboxes'

export function PlanningPanel({
  form,
  onSubmit,
  submitError,
  isSubmitting,
  content,
  captchaWidget,
  captchaPending,
}: {
  form: ReturnType<typeof useForm<PlanningValues>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  submitError: string | null
  isSubmitting: boolean
  content: SwitchSurveyContent
  captchaWidget?: React.ReactNode
  captchaPending?: boolean
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack className="gap-3 p-4">
        <Text className="text-sm">{content.planningText}</Text>
        <TextInput
          label={content.planningLabelEmail}
          type="email"
          placeholder={content.planningPlaceholderEmail}
          {...form.getInputProps('email')}
          required
        />
        <ConsentCheckboxes form={form} email={form.values.email} content={content} />
        {captchaWidget}
        {submitError && <Text className="text-sm text-textError">{submitError}</Text>}
        <Button type="submit" loading={isSubmitting} disabled={!form.isValid() || captchaPending}>
          {content.planningBtnSubmit}
        </Button>
      </Stack>
    </form>
  )
}
