/**
 * Team notification email for contact page enquiries, sent through Cloudflare Email Service.
 *
 * Runtime bindings (see wrangler.jsonc):
 * - EMAIL: `send_email` binding, locked to the team inbox
 * - CONTACT_FORM_MODE: "mock" logs the email instead of sending it
 *
 * Dashboard setup: `fwd.bank.green` is the onboarded sending domain, and
 * `hello@bank.green` is a verified destination address.
 */

import type { ContactMessage } from '@lib/mailerlite'

const TEAM_ADDRESS = 'hello@bank.green'
const SENDER = { email: 'noreply@fwd.bank.green', name: 'Bank.Green website' }

interface EmailAddress {
  email: string
  name?: string
}

export interface SendEmail {
  send(message: {
    to: string | EmailAddress
    from: string | EmailAddress
    replyTo?: string | EmailAddress
    subject: string
    text?: string
    html?: string
  }): Promise<{ messageId: string }>
}

export interface NotifyEnv {
  EMAIL?: SendEmail
  CONTACT_FORM_MODE?: string
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export function buildNotification(message: ContactMessage) {
  const subject = `Contact form: ${singleLine(message.subject) || '(no subject)'}`
  const location = [message.location.city, message.location.country].filter(Boolean).join(', ')

  const text = [
    `Name: ${message.first_name || '(not given)'}`,
    `Email: ${message.email}`,
    `Agreed to marketing: ${message.is_agree_marketing === true}`,
    `Location: ${location || '(unknown)'}`,
    `Received: ${new Date(message.created_at).toISOString()}`,
    `Environment: ${message.app_env}`,
    '',
    `Subject: ${message.subject || '(no subject)'}`,
    '',
    'Message:',
    message.message || '(no message)',
  ].join('\n')

  const replyTo: EmailAddress = { email: message.email }
  const name = singleLine(message.first_name)
  if (name) replyTo.name = name

  return { to: TEAM_ADDRESS, from: SENDER, replyTo, subject, text }
}

// Rejects when the signal aborts. send() takes no signal, so the email can still arrive later
function whenAborted(signal: AbortSignal): Promise<never> {
  return new Promise((_, reject) => {
    if (signal.aborted) reject(signal.reason)
    signal.addEventListener('abort', () => reject(signal.reason), { once: true })
  })
}

export async function notifyTeam(
  env: NotifyEnv,
  message: ContactMessage,
  signal?: AbortSignal
): Promise<void> {
  const email = buildNotification(message)

  if (env.CONTACT_FORM_MODE === 'mock') {
    console.log('[Notify:mock] Would send team email:', JSON.stringify(email, null, 2))
    return
  }

  if (!env.EMAIL) {
    throw new Error('EMAIL send_email binding is not configured')
  }

  const sending = env.EMAIL.send(email)
  await (signal ? Promise.race([sending, whenAborted(signal)]) : sending)
}
