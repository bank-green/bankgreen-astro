import { isValidEmail } from '@lib/switch-survey-schemas'
import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import { Anchor, Checkbox, Text } from '@mantine/core'
import type { useForm } from '@mantine/form'

export function ConsentCheckboxes<
  Values extends { isAgreeMarketing: boolean; isAgreeTerms: boolean },
>({
  form,
  email,
  content,
}: {
  form: ReturnType<typeof useForm<Values>>
  email: string
  content: SwitchSurveyContent
}) {
  if (!isValidEmail(email)) return null
  return (
    <>
      <Checkbox
        {...form.getInputProps('isAgreeMarketing', { type: 'checkbox' })}
        label={content.consentMarketing}
        classNames={{ body: 'items-center' }}
      />
      <Checkbox
        {...form.getInputProps('isAgreeTerms', { type: 'checkbox' })}
        label={
          <Text component="span" inherit>
            {content.consentTermsText}{' '}
            <Anchor href="/privacy" inherit>
              {content.consentTermsLink}
            </Anchor>
            {'.'}
            <Text component="span" inherit className="text-red-300" aria-hidden={true}>
              {' *'}
            </Text>
          </Text>
        }
        required
        classNames={{ body: 'items-center' }}
      />
    </>
  )
}
