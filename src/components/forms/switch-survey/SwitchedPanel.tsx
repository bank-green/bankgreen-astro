import type { Bank } from '@lib/banks'
import { CURRENCIES } from '@lib/constants/switch-survey'
import type { SwitchedValues } from '@lib/switch-survey-schemas'
import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import { Button, Group, Input, Select, Stack, Text, TextInput } from '@mantine/core'
import type { useForm } from '@mantine/form'
import BankAutocomplete from '../BankAutocomplete'
import { ConsentCheckboxes } from './ConsentCheckboxes'

export function SwitchedPanel({
  form,
  onSubmit,
  submitError,
  isSubmitting,
  banks,
  banksLoading,
  content,
  captchaWidget,
  captchaPending,
}: {
  form: ReturnType<typeof useForm<SwitchedValues>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  submitError: string | null
  isSubmitting: boolean
  banks: Bank[]
  banksLoading: boolean
  content: SwitchSurveyContent
  captchaWidget?: React.ReactNode
  captchaPending?: boolean
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack className="gap-3 p-4">
        <BankAutocomplete
          banks={banks}
          value={form.values.bankLeft}
          onChange={(bank) => form.setFieldValue('bankLeft', bank)}
          onBlur={() => form.validateField('bankLeft')}
          label={content.switchedLabelBankLeft}
          loading={banksLoading}
          error={!!form.errors.bankLeft}
          required
        />
        <BankAutocomplete
          banks={banks}
          value={form.values.bankTo}
          onChange={(bank) => form.setFieldValue('bankTo', bank)}
          onBlur={() => form.validateField('bankTo')}
          label={content.switchedLabelBankTo}
          loading={banksLoading}
          error={!!form.errors.bankTo}
          required
        />
        <Stack className="gap-1" role="group" aria-labelledby="amount-label">
          <Input.Label id="amount-label" labelElement="div" required size="sm" className="text-sm">
            {content.switchedLabelAmount}
          </Input.Label>
          <Group className="items-start gap-2">
            <Select
              data={CURRENCIES}
              classNames={{ root: 'w-28' }}
              {...form.getInputProps('currency')}
            />
            <TextInput
              placeholder={content.switchedPlaceholderAmount}
              className="flex-1"
              {...form.getInputProps('amount')}
              error={!!form.errors.amount}
            />
          </Group>
        </Stack>
        <TextInput
          label={content.switchedLabelEmail}
          type="email"
          placeholder={content.switchedPlaceholderEmail}
          {...form.getInputProps('email')}
        />
        <ConsentCheckboxes form={form} email={form.values.email} content={content} />
        {captchaWidget}
        {submitError && <Text className="text-sm text-textError">{submitError}</Text>}
        <Button type="submit" loading={isSubmitting} disabled={!form.isValid() || captchaPending}>
          {content.switchedBtnSubmit}
        </Button>
      </Stack>
    </form>
  )
}
