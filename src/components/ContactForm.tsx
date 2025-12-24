import { Button, MantineProvider, Paper, Stack, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { theme } from '../styles/theme'

/**
 * Example contact form as a React island.
 * This component is interactive and needs client-side JavaScript.
 */
function ContactFormInner() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission (send to your Django backend)
    console.log({ name, email })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Paper p="xl" radius="md" withBorder>
        <Title order={3}>Thanks for reaching out!</Title>
        <p>We'll get back to you soon.</p>
      </Paper>
    )
  }

  return (
    <Paper p="xl" radius="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={3}>Contact Us</Title>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <Button type="submit">Send Message</Button>
        </Stack>
      </form>
    </Paper>
  )
}

/**
 * Export the wrapped version for use in Astro pages.
 * The MantineWrapper provides the theme context.
 */
export function ContactForm() {
  return (
    <MantineProvider theme={theme}>
      <ContactFormInner />
    </MantineProvider>
  )
}
