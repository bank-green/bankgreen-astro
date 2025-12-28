import { Button, Checkbox, Select, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'

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

interface FormWarnings {
  email?: string
  isAgreeTerms?: string
  subject?: string
  message?: string
}

const defaultFields = {
  firstName: true,
  email: true,
  bank: false,
  subject: false,
  message: false,
  status: false,
  isAgreeMarketing: true,
  isAgreeTerms: true,
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
  email: 'You email address',
  bank: 'Your bank name',
  subject: 'Message subject',
  message: 'Your message',
}

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

  // Form state
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [bank, setBank] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [isAgreeMarketing, setIsAgreeMarketing] = useState(false)
  const [isAgreeTerms, setIsAgreeTerms] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string>('')

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [showWarnings, setShowWarnings] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Environment
  const isDev = import.meta.env.DEV
  const captchaSitekey = import.meta.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY

  // Compute warnings
  const getWarnings = (): FormWarnings => {
    if (!showWarnings) return {}

    const warnings: FormWarnings = {}

    if (fields.email && !email) {
      warnings.email = 'Your email is required.'
    } else if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      warnings.email = 'Please enter a valid email address.'
    }

    if (fields.isAgreeTerms && !isAgreeTerms) {
      warnings.isAgreeTerms = 'You need to agree to the terms.'
    }

    if (fields.subject && !subject) {
      warnings.subject = 'Subject is required.'
    }

    if (fields.message && !message) {
      warnings.message = 'Message is required.'
    }

    return warnings
  }

  const warnings = getWarnings()
  const hasWarnings = Object.keys(warnings).length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowWarnings(true)
    setError(null)

    if (hasWarnings || isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          bank: bank.trim(),
          subject: subject.trim(),
          message: message.trim(),
          currentStatus: status,
          tag,
          isAgreeMarketing,
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
  }

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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        )}

        {fields.email && (
          <TextInput
            label={labels.email}
            type="email"
            placeholder={placeholders.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={warnings.email}
            required
          />
        )}

        {fields.bank && (
          <TextInput
            label={labels.bank}
            placeholder={placeholders.bank}
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
        )}

        {fields.subject && (
          <TextInput
            label={labels.subject}
            placeholder={placeholders.subject}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={warnings.subject}
            required
          />
        )}

        {fields.message && (
          <Textarea
            label={labels.message}
            placeholder={placeholders.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={warnings.message}
            rows={3}
            required
          />
        )}

        {fields.status && (
          <Select
            label={labels.status}
            placeholder="Select an option"
            data={STATUS_OPTIONS}
            value={status}
            onChange={setStatus}
          />
        )}

        <Stack className="my-4 gap-2">
          {fields.isAgreeMarketing && (
            <Checkbox
              checked={isAgreeMarketing}
              onChange={(e) => setIsAgreeMarketing(e.target.checked)}
              label="I wish to receive more information via email from Bank.Green."
            />
          )}

          {fields.isAgreeTerms && (
            <Checkbox
              checked={isAgreeTerms}
              onChange={(e) => setIsAgreeTerms(e.target.checked)}
              error={warnings.isAgreeTerms}
              label={
                <>
                  I have read and understood Bank.Green's <a href="/privacy">privacy policy</a>.
                </>
              }
            />
          )}
        </Stack>

        {!isDev && captchaSitekey && (
          <Turnstile siteKey={captchaSitekey} onSuccess={setCaptchaToken} />
        )}

        {error && <Text className="text-sm text-textError">{error}</Text>}

        <Button type="submit" loading={isLoading}>
          {labels.submit}
        </Button>
      </Stack>
    </form>
  )
}

export default ContactForm
