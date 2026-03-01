/**
 * ActiveCampaign API client with mock mode support for local testing
 *
 * All configuration is passed in via the `env` parameter from Cloudflare
 * Worker runtime bindings (accessed via `locals.runtime.env` in API routes).
 *
 * Runtime env vars (set in Cloudflare dashboard or wrangler.jsonc):
 * - ACTIVE_CAMPAIGN_KEY: API key for ActiveCampaign
 * - ACTIVE_CAMPAIGN_URL: Base URL for ActiveCampaign API
 * - CONTACT_FORM_MODE: "mock" | "real" (default: "real")
 * - CONTACT_FORM_DEBUG: "true" to enable verbose logging
 */

export interface ContactMessage {
  app_env: string
  first_name: string
  last_name: string
  email: string
  created_at: number
  message: string
  subject: string
  tag: string
  bank: string
  bank_display_name: string
  is_agree_marketing?: boolean
  current_status: string
  ip: string
  location: {
    country: string
    city: string
  }
}

export interface ActiveCampaignEnv {
  ACTIVE_CAMPAIGN_KEY: string
  ACTIVE_CAMPAIGN_URL: string
  CONTACT_FORM_MODE?: string
  CONTACT_FORM_DEBUG?: string
}

interface ActiveCampaignContact {
  email: string
  firstName: string
  subject: string
  message: string
  fieldValues: Array<{
    field: string
    value: string | boolean | undefined
  }>
}

interface ActiveCampaignResponse {
  contact?: {
    id?: string
  }
}

export interface ActiveCampaignResult {
  success: boolean
  mode: 'mock' | 'real'
  contactId?: string
  payload?: { contact: ActiveCampaignContact }
  error?: string
}

function getMode(env: ActiveCampaignEnv): 'mock' | 'real' {
  return env.CONTACT_FORM_MODE === 'mock' ? 'mock' : 'real'
}

function isDebug(env: ActiveCampaignEnv): boolean {
  return env.CONTACT_FORM_DEBUG === 'true'
}

function log(
  env: ActiveCampaignEnv,
  level: 'info' | 'debug' | 'error',
  message: string,
  data?: unknown
) {
  if (!isDebug(env) && level !== 'error') return

  const prefix = `[ActiveCampaign:${getMode(env)}]`
  const logFn = level === 'error' ? console.error : console.log

  if (data) {
    logFn(`${prefix} ${message}`, typeof data === 'object' ? JSON.stringify(data, null, 2) : data)
  } else {
    logFn(`${prefix} ${message}`)
  }
}

export function getTagId(tag: string): number {
  switch (tag) {
    case 'FAQ bottom':
      return 124
    case 'partners bottom':
      return 24
    case 'index bottom':
      return 11
    case 'join form':
      return 201
    case 'not listed bottom':
      return 26
    case 'contact page form':
      return 14
    case 'green directory':
      return 878
    case 'green bank':
      return 879
    default:
      console.error('ActiveCampaign form used without a tag defined.')
      return 8
  }
}

function buildPayload(message: ContactMessage): { contact: ActiveCampaignContact } {
  return {
    contact: {
      email: message.email,
      firstName: message.first_name,
      subject: message.subject,
      message: message.message,
      fieldValues: [
        { field: '2', value: message.bank_display_name },
        { field: '11', value: message.is_agree_marketing },
        { field: '18', value: message.current_status },
        { field: '19', value: message.subject },
        { field: '20', value: message.message },
      ],
    },
  }
}

async function sendToActiveCampaignReal(
  env: ActiveCampaignEnv,
  payload: { contact: ActiveCampaignContact },
  tag: string
): Promise<ActiveCampaignResult> {
  if (!env.ACTIVE_CAMPAIGN_KEY || !env.ACTIVE_CAMPAIGN_URL) {
    log(env, 'error', 'ActiveCampaign API credentials not configured')
    return { success: false, mode: 'real', error: 'API credentials not configured' }
  }

  try {
    log(env, 'debug', 'Sending contact to ActiveCampaign...')

    const contactResponse = await fetch(`${env.ACTIVE_CAMPAIGN_URL}/contact/sync`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token': env.ACTIVE_CAMPAIGN_KEY,
      },
      body: JSON.stringify(payload),
    })

    const contactData = (await contactResponse.json()) as ActiveCampaignResponse

    log(env, 'debug', 'Contact sync response:', contactData)

    if (contactData?.contact?.id) {
      log(
        env,
        'debug',
        `Adding tag ${tag} (ID: ${getTagId(tag)}) to contact ${contactData.contact.id}`
      )

      const tagResponse = await fetch(`${env.ACTIVE_CAMPAIGN_URL}/contactTags`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Api-Token': env.ACTIVE_CAMPAIGN_KEY,
        },
        body: JSON.stringify({
          contactTag: {
            contact: contactData.contact.id,
            tag: getTagId(tag),
          },
        }),
      })

      const tagData = await tagResponse.json()
      log(env, 'debug', 'Tag response:', tagData)

      return {
        success: true,
        mode: 'real',
        contactId: contactData.contact.id,
        payload,
      }
    }

    log(env, 'error', 'Failed to create contact - no ID returned', contactData)
    return { success: false, mode: 'real', error: 'Failed to create contact' }
  } catch (error) {
    log(env, 'error', 'ActiveCampaign API error:', error)
    return {
      success: false,
      mode: 'real',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

function mockSend(
  env: ActiveCampaignEnv,
  payload: { contact: ActiveCampaignContact },
  tag: string
): ActiveCampaignResult {
  const mockContactId = `mock-${Date.now()}`

  log(env, 'info', `[MOCK] Would create/update contact with ID: ${mockContactId}`)
  log(env, 'info', `[MOCK] Would add tag: ${tag} (ID: ${getTagId(tag)})`)
  log(env, 'debug', '[MOCK] Payload:', payload)

  return {
    success: true,
    mode: 'mock',
    contactId: mockContactId,
    payload,
  }
}

export async function sendContact(
  env: ActiveCampaignEnv,
  message: ContactMessage
): Promise<ActiveCampaignResult> {
  const mode = getMode(env)
  const payload = buildPayload(message)

  log(env, 'info', `Mode: ${mode}`)
  log(env, 'debug', 'Contact message:', message)

  if (mode === 'mock') {
    return mockSend(env, payload, message.tag)
  }

  return sendToActiveCampaignReal(env, payload, message.tag)
}
