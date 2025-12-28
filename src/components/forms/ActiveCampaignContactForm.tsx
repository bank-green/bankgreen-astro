import { Anchor, Button, Checkbox, Group, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { CircleNotchIcon } from '@phosphor-icons/react'
import { useState } from 'react'

export interface ActiveCampaignContactFormProps {
  /** Tag used for ActiveCampaign segmentation */
  tag: string
  /** Fields to show in the form */
  fields?: {
    firstName?: boolean
    email?: boolean
    subject?: boolean
    message?: boolean
    isAgreeMarketing?: boolean
    isAgreeTerms?: boolean
  }
  /** Custom labels for fields */
  labels?: {
    firstName?: string
    email?: string
    subject?: string
    message?: string
    submit?: string
  }
  /** Custom placeholders for fields */
  placeholders?: {
    firstName?: string
    email?: string
    subject?: string
    message?: string
  }
  /** URL to redirect to after successful submission */
  successRedirect?: string
  /** Callback when form is successfully submitted (if no redirect) */
  onSuccess?: () => void
  /** Use dark theme styling */
  dark?: boolean
  /** Additional class name for the form */
  className?: string
  /** Layout style - 'stacked' or 'inline' */
  layout?: 'stacked' | 'inline'
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
  subject: false,
  message: false,
  isAgreeMarketing: true,
  isAgreeTerms: true,
}

const defaultLabels = {
  firstName: 'Your first name (optional)',
  email: 'Your email address',
  subject: 'Subject',
  message: 'Your message',
  submit: 'Submit',
}

const defaultPlaceholders = {
  firstName: 'First name, so we can say hi',
  email: 'Your email address',
  subject: 'Subject',
  message: 'Your message',
}

export function ActiveCampaignContactForm({
  tag,
  fields: fieldsProp,
  labels: labelsProp,
  placeholders: placeholdersProp,
  successRedirect,
  onSuccess,
  dark = false,
  className = '',
  layout = 'stacked',
}: ActiveCampaignContactFormProps) {
  const fields = { ...defaultFields, ...fieldsProp }
  const labels = { ...defaultLabels, ...labelsProp }
  const placeholders = { ...defaultPlaceholders, ...placeholdersProp }

  // Form state
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isAgreeMarketing, setIsAgreeMarketing] = useState(false)
  const [isAgreeTerms, setIsAgreeTerms] = useState(false)

  // UI state
  const [busy, setBusy] = useState(false)
  const [showWarnings, setShowWarnings] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    if (hasWarnings || busy) {
      return
    }

    setBusy(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          tag,
          isAgreeMarketing,
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
      setTimeout(() => setBusy(false), 100)
    }
  }

  // Success state
  if (isSent && !successRedirect) {
    return (
      <Stack className={`items-center justify-center gap-4 ${className}`}>
        <Text className={dark ? 'text-white' : 'text-gray-900'}>
          Thank you! We'll be in touch soon.
        </Text>
      </Stack>
    )
  }

  const inputClasses = dark
    ? '[&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder-white/50'
    : ''
  const textareaClasses = dark
    ? '[&_textarea]:bg-white/10 [&_textarea]:text-white [&_textarea]:placeholder-white/50'
    : ''
  const checkboxClasses = dark ? '[&_label]:text-white/90' : ''

  // Inline layout for simple forms (like UnknownBankContent)
  if (layout === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <Stack className="gap-4">
          <Group className="gap-2">
            <TextInput
              type="email"
              placeholder={placeholders.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={warnings.email}
              className={`flex-1 ${inputClasses}`}
              required
            />
            <Button type="submit" disabled={busy} className="bg-sushi-500 hover:bg-sushi-600">
              {busy ? <CircleNotchIcon className="animate-spin" size={20} /> : labels.submit}
            </Button>
          </Group>
          {fields.isAgreeTerms && (
            <Checkbox
              checked={isAgreeTerms}
              onChange={(e) => setIsAgreeTerms(e.target.checked)}
              error={warnings.isAgreeTerms}
              className={checkboxClasses}
              label={
                <Text span className={dark ? 'text-white/80' : ''}>
                  I have read and understood Bank.Green's{' '}
                  <Anchor href="/privacy" className={dark ? 'text-white underline' : ''}>
                    privacy policy
                  </Anchor>
                  .
                </Text>
              }
            />
          )}
          {error && <Text className="text-red-500 text-sm">{error}</Text>}
        </Stack>
      </form>
    )
  }

  // Stacked layout (default)
  return (
    <form onSubmit={handleSubmit} className={className}>
      <Stack className="gap-4">
        {fields.firstName && (
          <TextInput
            label={labels.firstName}
            placeholder={placeholders.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClasses}
            classNames={dark ? { label: 'text-white/90' } : undefined}
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
            className={inputClasses}
            classNames={dark ? { label: 'text-white/90' } : undefined}
            required
          />
        )}

        {fields.subject && (
          <TextInput
            label={labels.subject}
            placeholder={placeholders.subject}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={warnings.subject}
            className={inputClasses}
            classNames={dark ? { label: 'text-white/90' } : undefined}
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
            className={textareaClasses}
            classNames={dark ? { label: 'text-white/90' } : undefined}
            required
          />
        )}

        {fields.isAgreeMarketing && (
          <Checkbox
            checked={isAgreeMarketing}
            onChange={(e) => setIsAgreeMarketing(e.target.checked)}
            className={checkboxClasses}
            label={
              <Text span className={dark ? 'text-white/80' : ''}>
                I wish to receive more information via email from Bank.Green.
              </Text>
            }
          />
        )}

        {fields.isAgreeTerms && (
          <Checkbox
            checked={isAgreeTerms}
            onChange={(e) => setIsAgreeTerms(e.target.checked)}
            error={warnings.isAgreeTerms}
            className={checkboxClasses}
            label={
              <Text span className={dark ? 'text-white/80' : ''}>
                I have read and understood Bank.Green's{' '}
                <Anchor href="/privacy" className={dark ? 'text-white underline' : ''}>
                  privacy policy
                </Anchor>
                .
              </Text>
            }
          />
        )}

        {error && <Text className="text-red-500 text-sm">{error}</Text>}

        <Button type="submit" disabled={busy} className="bg-sushi-500 hover:bg-sushi-600">
          {busy ? (
            <Group className="items-center gap-2">
              <CircleNotchIcon className="animate-spin" size={20} />
              <Text span>Sending...</Text>
            </Group>
          ) : (
            labels.submit
          )}
        </Button>
      </Stack>
    </form>
  )
}

export default ActiveCampaignContactForm
