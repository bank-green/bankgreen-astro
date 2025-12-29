/**
 * ActiveCampaign API client with mock mode support for local testing
 *
 * Environment variables:
 * - CONTACT_FORM_MODE: "mock" | "real" (default: "real")
 * - CONTACT_FORM_DEBUG: "true" to enable verbose logging
 * - ACTIVE_CAMPAIGN_KEY: API key for ActiveCampaign
 * - ACTIVE_CAMPAIGN_URL: Base URL for ActiveCampaign API
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

function getEnv(key: string): string | undefined {
  // In SSR context, check process.env first (runtime), then import.meta.env (build time)
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key]
  }
  return import.meta.env[key]
}

function getMode(): 'mock' | 'real' {
  return getEnv('CONTACT_FORM_MODE') === 'mock' ? 'mock' : 'real'
}

function isDebug(): boolean {
  return getEnv('CONTACT_FORM_DEBUG') === 'true'
}

function getApiKey(): string | undefined {
  return getEnv('ACTIVE_CAMPAIGN_KEY')
}

function getBaseUrl(): string | undefined {
  return getEnv('ACTIVE_CAMPAIGN_URL')
}

function log(level: 'info' | 'debug' | 'error', message: string, data?: unknown) {
  if (!isDebug() && level !== 'error') return

  const prefix = `[ActiveCampaign:${getMode()}]`
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
  payload: { contact: ActiveCampaignContact },
  tag: string
): Promise<ActiveCampaignResult> {
  const apiKey = getApiKey()
  const baseUrl = getBaseUrl()

  if (!apiKey || !baseUrl) {
    log('error', 'ActiveCampaign API credentials not configured')
    return { success: false, mode: 'real', error: 'API credentials not configured' }
  }

  try {
    log('debug', 'Sending contact to ActiveCampaign...')

    const contactResponse = await fetch(`${baseUrl}/contact/sync`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token': apiKey,
      },
      body: JSON.stringify(payload),
    })

    const contactData = (await contactResponse.json()) as ActiveCampaignResponse

    log('debug', 'Contact sync response:', contactData)

    if (contactData?.contact?.id) {
      log('debug', `Adding tag ${tag} (ID: ${getTagId(tag)}) to contact ${contactData.contact.id}`)

      const tagResponse = await fetch(`${baseUrl}/contactTags`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Api-Token': apiKey,
        },
        body: JSON.stringify({
          contactTag: {
            contact: contactData.contact.id,
            tag: getTagId(tag),
          },
        }),
      })

      const tagData = await tagResponse.json()
      log('debug', 'Tag response:', tagData)

      return {
        success: true,
        mode: 'real',
        contactId: contactData.contact.id,
        payload,
      }
    }

    log('error', 'Failed to create contact - no ID returned', contactData)
    return { success: false, mode: 'real', error: 'Failed to create contact' }
  } catch (error) {
    log('error', 'ActiveCampaign API error:', error)
    return {
      success: false,
      mode: 'real',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

function mockSend(payload: { contact: ActiveCampaignContact }, tag: string): ActiveCampaignResult {
  const mockContactId = `mock-${Date.now()}`

  log('info', `[MOCK] Would create/update contact with ID: ${mockContactId}`)
  log('info', `[MOCK] Would add tag: ${tag} (ID: ${getTagId(tag)})`)
  log('debug', '[MOCK] Payload:', payload)

  return {
    success: true,
    mode: 'mock',
    contactId: mockContactId,
    payload,
  }
}

export async function sendContact(message: ContactMessage): Promise<ActiveCampaignResult> {
  const mode = getMode()
  const payload = buildPayload(message)

  log('info', `Mode: ${mode}`)
  log('debug', 'Contact message:', message)

  if (mode === 'mock') {
    return mockSend(payload, message.tag)
  }

  return sendToActiveCampaignReal(payload, message.tag)
}
