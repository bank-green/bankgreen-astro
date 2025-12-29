/**
 * LeadGen - Lead generation form slice using shared ContactFormContainer.
 *
 * Variations: default
 *
 * Features:
 * - Full form validation and submission to /api/contact
 * - Turnstile CAPTCHA integration
 * - Customizable field visibility (bank, status)
 * - Custom labels from Prismic
 * - Bullet point list from Prismic items
 * - Success redirect not configured (defaults to inline thank you message)
 *
 * LIMITATIONS:
 * - Status field options are hardcoded in ContactForm (cannot use custom options from Prismic)
 * - Uses two-column layout with dark background (matches HomePage/FaqPage style)
 * - Ignores items[].dropdown_status_option field (ContactForm has fixed status options)
 *
 * Prismic fields:
 * - primary.title: Main heading (RichTextField)
 * - primary.show_bank_field: Toggle bank field visibility (default: true)
 * - primary.show_status_field: Toggle status dropdown visibility (default: true)
 * - primary.form_bank_label: Custom label for bank field
 * - primary.form_name_label: Custom label for first name field
 * - primary.form_email_label: Custom label for email field
 * - primary.form_status_label: Custom label for status field
 * - primary.button_label: Custom submit button text
 * - items[].bullet_text: Bullet points for value proposition list
 * - items[].dropdown_status_option: IGNORED (ContactForm uses hardcoded options)
 */
import ContactFormContainer from '@components/forms/ContactFormContainer'
import { asText } from '@lib/prismicHelpers'
import type { LeadGenSlice } from './types'

interface Props {
  slice: LeadGenSlice
  className?: string
}

/**
 * Safely extract text from a RichTextField, handling edge cases
 */
function safeAsText(field: unknown): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (Array.isArray(field) && field.length > 0) {
    try {
      return asText(field as Parameters<typeof asText>[0])
    } catch {
      return ''
    }
  }
  return ''
}

export function LeadGen({ slice, className }: Props) {
  const primary = slice.primary
  const items = slice.items

  // Convert title from RichTextField to string
  const title = safeAsText(primary.title) || 'Curious about switching to a green bank?'

  // Extract bullet points from items (filter out empty strings)
  const listItems = items
    .map((item) => safeAsText(item.bullet_text))
    .filter((text) => text.length > 0)

  // Configure field visibility based on Prismic settings
  const fields = {
    firstName: true,
    email: true,
    bank: primary.show_bank_field ?? true,
    subject: false,
    message: false,
    status: primary.show_status_field ?? true,
    isAgreeMarketing: true,
    isAgreeTerms: true,
  }

  // Configure custom labels from Prismic (with defaults)
  const labels = {
    firstName: primary.form_name_label || 'First name',
    email: primary.form_email_label || 'Email address',
    bank: primary.form_bank_label || 'I am interested in',
    status: primary.form_status_label || 'Which option best describes your current status?',
    submit: primary.button_label || 'Complete Sign Up',
  }

  return (
    <ContactFormContainer
      title={title}
      showList={listItems.length > 0}
      listItems={listItems}
      tag="green bank"
      fields={fields}
      labels={labels}
      className={className}
    />
  )
}
