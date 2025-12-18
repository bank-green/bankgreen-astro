/**
 * LeadGen - Lead generation form slice.
 *
 * Variations: default
 *
 * Note: This is a complex interactive component that will need full
 * implementation with form handling, validation, and submission.
 * This is a semantic placeholder showing the structure.
 */
import {
  Container,
  Stack,
  Title,
  List,
  TextInput,
  Select,
  Checkbox,
  Button,
} from '@mantine/core'
import type { RichTextField } from '@prismicio/client'
import { asText } from '@prismicio/client'

type LeadGenSlice = {
  slice_type: 'lead_gen'
  primary: {
    title?: RichTextField
    show_bank_field?: boolean
    show_status_field?: boolean
    form_bank_label?: string
    form_name_label?: string
    form_email_label?: string
    form_status_label?: string
    button_label?: string
  }
  items: Array<{
    bullet_text?: RichTextField
    dropdown_status_option?: string
  }>
}

interface Props {
  slice: LeadGenSlice
}

export function LeadGen({ slice }: Props) {
  const primary = slice.primary
  const items = slice.items

  const title = primary.title ? asText(primary.title) : 'Curious about switching to a green bank?'
  const showBankField = primary.show_bank_field ?? true
  const showStatusField = primary.show_status_field ?? true

  // Extract bullet points for the value proposition list
  const bulletPoints = items
    .map((item) => (item.bullet_text ? asText(item.bullet_text) : ''))
    .filter((text) => text.length > 0)

  // Extract status options for the dropdown
  const statusOptions = items
    .map((item) => item.dropdown_status_option)
    .filter((opt): opt is string => typeof opt === 'string' && opt !== 'Select none (default)')

  return (
    <Container component="section" data-slice-type={slice.slice_type}>
      <Stack gap="lg">
        <Title id="lead-gen-title">{title}</Title>

        {bulletPoints.length > 0 && (
          <List>
            {bulletPoints.map((point, index) => (
              <List.Item key={index}>{point}</List.Item>
            ))}
          </List>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <Stack gap="md">
            {showBankField && (
              <TextInput
                label={primary.form_bank_label || 'I am interested in'}
                id="bank"
                name="bank"
                placeholder="Search for a bank..."
              />
            )}

            <TextInput
              label={primary.form_name_label || 'First name'}
              id="firstName"
              name="firstName"
              placeholder="First name, so we can say hi"
            />

            <TextInput
              label={primary.form_email_label || 'Email address'}
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
              required
            />

            {showStatusField && statusOptions.length > 0 && (
              <Select
                label={primary.form_status_label || 'Which option best describes your current status?'}
                id="status"
                name="status"
                placeholder="Select an option..."
                data={statusOptions}
              />
            )}

            <Checkbox
              name="isAgreeMarketing"
              label="I wish to receive more information via email from Bank.Green."
            />

            <Checkbox
              name="isAgreeTerms"
              label={
                <>
                  I have read and understood Bank.Green's{' '}
                  <a href="/privacy">privacy policy</a>.
                </>
              }
              required
            />

            <Button type="submit" fullWidth>
              {primary.button_label || 'Complete Sign Up'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}
