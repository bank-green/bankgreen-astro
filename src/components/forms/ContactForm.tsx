import { Box, Button, Checkbox, Select, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Turnstile } from '@marsidev/react-turnstile'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import { z } from 'zod'

export interface ContactFormProps {
  /** Tag used for ActiveCampaign segmentation */
  tag:
    | 'contact page form'
    | 'FAQ bottom'
    | 'green bank'
    | 'green directory'
    | 'index bottom'
    | 'join form'
    | 'not listed bottom'
    | 'partners bottom'
  /** Fields to show in the form */
  fields?: {
    firstName?: boolean
    email?: boolean
    bank?: boolean
    subject?: boolean
    message?: boolean
    status?: boolean
    isAgreeMarketing?: boolean
    isAgreeTerms?: boolean
  }
  /** Custom labels for fields */
  labels?: {
    firstName?: string
    email?: string
    bank?: string
    subject?: string
    message?: string
    status?: string
    submit?: string
  }
  /** Custom placeholders for fields */
  placeholders?: {
    firstName?: string
    email?: string
    bank?: string
    subject?: string
    message?: string
  }
  /** URL to redirect to after successful submission */
  successRedirect?: string
  /** Callback when form is successfully submitted (if no redirect) */
  onSuccess?: () => void
}

const defaultFields = {
  firstName: true,
  email: true,
  bank: false,
  subject: false,
  message: false,
  status: false,
  isAgreeMarketing: false,
  isAgreeTerms: false,
}

const STATUS_OPTIONS = ['Student', 'Employed', 'Self-employed', 'Retired', 'Unemployed']

const defaultLabels = {
  firstName: 'First name',
  email: 'Email address',
  bank: 'Bank name',
  subject: 'Subject',
  message: 'Message',
  status: 'Which option best describes your current status?',
  submit: 'Submit',
}

const defaultPlaceholders = {
  firstName: 'Your first name',
  email: 'Your email address',
  bank: 'Your bank name',
  subject: 'Message subject',
  message: 'Your message',
}

const buildSchema = (fields: typeof defaultFields) =>
  z.object({
    firstName: z.string(),
    email: fields.email
      ? z
          .string()
          .min(1, 'Your email is required.')
          .regex(z.regexes.email, { message: 'Please enter a valid email address.' })
      : z.string(),
    bank: z.string(),
    subject: fields.subject ? z.string().min(1, 'Subject is required.') : z.string(),
    message: fields.message ? z.string().min(1, 'Message is required.') : z.string(),
    status: z.string().nullable(),
    isAgreeMarketing: z.boolean(),
    isAgreeTerms: z.boolean().refine((val) => val === true, {
      message: 'Please agree to the terms.',
    }),
  })

type FormValues = z.infer<ReturnType<typeof buildSchema>>

export function ContactForm({
  tag,
  fields: fieldsProp,
  labels: labelsProp,
  placeholders: placeholdersProp,
  successRedirect,
  onSuccess,
}: ContactFormProps) {
  const fields = { ...defaultFields, ...fieldsProp }
  const labels = { ...defaultLabels, ...labelsProp }
  const placeholders = { ...defaultPlaceholders, ...placeholdersProp }

  const schema = buildSchema(fields)

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      email: '',
      bank: '',
      subject: '',
      message: '',
      status: null,
      isAgreeMarketing: false,
      isAgreeTerms: false,
    },
    validate: zod4Resolver(schema),
    validateInputOnBlur: true,
  })

  // UI state
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Environment
  const isDev = import.meta.env.DEV
  const captchaTestMode = import.meta.env.PUBLIC_CAPTCHA_TEST_MODE === 'true'
  const captchaSitekey = import.meta.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY
  const showCaptcha = !isDev || captchaTestMode

  const handleSubmit = form.onSubmit(async (values: FormValues) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          email: values.email.trim(),
          bank: values.bank.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          currentStatus: values.status,
          tag,
          isAgreeMarketing: values.isAgreeMarketing,
          isAgreeTerms: values.isAgreeTerms,
          captchaToken,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit form')
      }

      setIsSent(true)

      if (successRedirect) {
        window.location.href = successRedirect
      } else if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setTimeout(() => setIsLoading(false), 100)
    }
  })

  // Success state
  if (isSent && !successRedirect) {
    return (
      <Stack className="items-center justify-center gap-4">
        <Text>Thank you! We'll be in touch soon.</Text>
      </Stack>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Stack className="gap-4">
        {fields.firstName && (
          <TextInput
            label={labels.firstName}
            placeholder={placeholders.firstName}
            {...form.getInputProps('firstName')}
          />
        )}

        {fields.email && (
          <TextInput
            label={labels.email}
            type="email"
            placeholder={placeholders.email}
            {...form.getInputProps('email')}
            required
          />
        )}

        {fields.bank && (
          <TextInput
            label={labels.bank}
            placeholder={placeholders.bank}
            {...form.getInputProps('bank')}
          />
        )}

        {fields.subject && (
          <TextInput
            label={labels.subject}
            placeholder={placeholders.subject}
            {...form.getInputProps('subject')}
            required
          />
        )}

        {fields.message && (
          <Textarea
            label={labels.message}
            placeholder={placeholders.message}
            {...form.getInputProps('message')}
            rows={3}
            required
          />
        )}

        {fields.status && (
          <Select
            label={labels.status}
            placeholder="Select an option"
            data={STATUS_OPTIONS}
            {...form.getInputProps('status')}
          />
        )}

        <Stack className="my-4 gap-2">
          {fields.isAgreeMarketing && (
            <Checkbox
              {...form.getInputProps('isAgreeMarketing', { type: 'checkbox' })}
              label="I wish to receive more information via email from Bank.Green."
            />
          )}

          {fields.isAgreeTerms && (
            <Checkbox
              {...form.getInputProps('isAgreeTerms', { type: 'checkbox' })}
              label={
                <>
                  I have read and understood Bank.Green's <a href="/privacy">privacy policy</a>.
                  <span className="text-red-300"> *</span>
                </>
              }
              required
            />
          )}
        </Stack>

        {showCaptcha && captchaSitekey && (
          <Box className="h-[65px]">
            <Turnstile
              siteKey={captchaSitekey}
              onSuccess={setCaptchaToken}
              onError={() => {
                // Return truthy to suppress Turnstile's default console logging
                return true
              }}
            />
          </Box>
        )}

        {error && <Text className="text-sm text-textError">{error}</Text>}

        <Button type="submit" loading={isLoading} disabled={!form.isValid()}>
          {labels.submit}
        </Button>
      </Stack>
    </form>
  )
}

export default ContactForm
