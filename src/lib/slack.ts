/**
 * Slack notification for contact page enquiries, sent through an incoming webhook.
 *
 * Runtime env vars:
 * - SLACK_WEBHOOK_URL: incoming webhook URL (secret), posts to one fixed channel
 * - CONTACT_FORM_MODE: "mock" logs the Slack message instead of sending it
 */

import type { ContactMessage } from '@lib/mailerlite'

export interface SlackEnv {
  SLACK_WEBHOOK_URL?: string
  CONTACT_FORM_MODE?: string
}

// Slack treats <...> as links and mentions (<!channel>, <@U123>), so escape user input
function escapeMrkdwn(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function buildSlackMessage(message: ContactMessage) {
  const subject = message.subject.replace(/[\r\n]+/g, ' ').trim() || '(no subject)'

  const fields = [
    `*Name:* ${escapeMrkdwn(message.first_name) || '(not given)'}`,
    `*Email:* ${escapeMrkdwn(message.email)}`,
    `*Agreed to marketing:* ${message.is_agree_marketing === true}`,
  ]

  return {
    text: `Contact form: ${escapeMrkdwn(subject)}`,
    blocks: [
      // plain_text is shown as typed, so the header takes the raw subject
      { type: 'section', text: { type: 'mrkdwn', text: fields.join('\n') } },
      {
        type: 'section',
        text: { type: 'plain_text', text: `Subject: ${subject}`.slice(0, 150) },
      },
      {
        type: 'section',
        // Section text is capped at 3000 characters; escaping can grow a 1024-character message past it
        text: {
          type: 'mrkdwn',
          text: `Message: ${escapeMrkdwn(message.message).slice(0, 3000) || '(no message)'}`,
        },
      },
    ],
  }
}

export async function notifySlack(env: SlackEnv, message: ContactMessage): Promise<void> {
  const payload = buildSlackMessage(message)

  if (env.CONTACT_FORM_MODE === 'mock') {
    console.log('[Slack:mock] Would post message:', JSON.stringify(payload, null, 2))
    return
  }

  if (!env.SLACK_WEBHOOK_URL) {
    throw new Error('SLACK_WEBHOOK_URL is not configured')
  }

  const response = await fetch(env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Slack webhook failed: ${response.status} ${await response.text()}`)
  }
}
