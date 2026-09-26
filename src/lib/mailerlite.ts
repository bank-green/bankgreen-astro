/**
 * MailerLite API client with mock mode support for local testing
 *
 * All configuration is passed in via the `env` parameter from Cloudflare
 * Worker runtime bindings (accessed via `locals.runtime.env` in API routes).
 *
 * Runtime env vars (set in Cloudflare dashboard):
 * - MAILERLITE_API_KEY: API key for MailerLite
 * - MAILERLITE_URL: Base URL for MailerLite API
 * - CONTACT_FORM_MODE: "mock" | "real" (default: "real")
 * - CONTACT_FORM_DEBUG: "true" to enable verbose logging
 */

export const MAX_FIELD_LENGTH = 1024

export function characterCount(value: string): number {
  return Array.from(value).length
}

const ENQUIRY_FIELDS = ['subject', 'message']

export const CONTACT_FORM_TAGS = [
  'contact page form',
  'join form',
  'FAQ bottom',
  'index bottom',
  'partners bottom',
  'not listed bottom',
  'green directory',
  'green bank',
] as const

export type ContactFormTag = (typeof CONTACT_FORM_TAGS)[number]

const GROUP_IDS = {
  newsletter: '198800186308298642',
  contactRequests: '198800047461107004',
} as const

export interface ContactMessage {
  app_env: string
  first_name: string
  email: string
  created_at: number
  message: string
  subject: string
  tag: ContactFormTag
  bank: string
  is_agree_marketing?: boolean
  current_status: string
  ip: string
  location: {
    country: string
    city: string
  }
}

export interface MailerLiteEnv {
  MAILERLITE_API_KEY: string
  MAILERLITE_URL: string
  CONTACT_FORM_MODE?: string
  CONTACT_FORM_DEBUG?: string
}

export interface MailerLitePayload {
  email: string
  fields: Record<string, string>
  groups: string[]
  resubscribe?: true
}

interface MailerLiteResponse {
  data?: {
    id?: string
  }
  message?: string
  errors?: Record<string, string[]>
}

export type MailerLiteError =
  | 'not_configured'
  | 'rate_limited'
  | 'invalid_email'
  | 'refused_enquiry'
  | 'rejected'
  | 'request_failed'

export interface MailerLiteResult {
  success: boolean
  mode: 'mock' | 'real'
  subscriberId?: string
  payload?: MailerLitePayload
  droppedFields?: string[]
  error?: MailerLiteError
}

function getMode(env: MailerLiteEnv): 'mock' | 'real' {
  return env.CONTACT_FORM_MODE === 'mock' ? 'mock' : 'real'
}

function isDebug(env: MailerLiteEnv): boolean {
  return env.CONTACT_FORM_DEBUG === 'true'
}

function log(
  env: MailerLiteEnv,
  level: 'info' | 'debug' | 'error',
  message: string,
  data?: unknown
) {
  if (!isDebug(env) && level !== 'error') return

  const prefix = `[MailerLite:${getMode(env)}]`
  const logFn = level === 'error' ? console.error : console.log

  if (data) {
    logFn(`${prefix} ${message}`, typeof data === 'object' ? JSON.stringify(data, null, 2) : data)
  } else {
    logFn(`${prefix} ${message}`)
  }
}

export function isContactFormTag(tag: unknown): tag is ContactFormTag {
  return typeof tag === 'string' && (CONTACT_FORM_TAGS as readonly string[]).includes(tag)
}

export function findOverLengthFields(values: Record<string, string>): string[] {
  return Object.entries(values)
    .filter(([, value]) => characterCount(value) > MAX_FIELD_LENGTH)
    .map(([name]) => name)
}

export function groupsFor(tag: ContactFormTag, isAgreeMarketing?: boolean): string[] {
  const groups: string[] = []
  if (isAgreeMarketing) groups.push(GROUP_IDS.newsletter)
  if (tag === 'contact page form') groups.push(GROUP_IDS.contactRequests)
  return groups
}

export function buildPayload(message: ContactMessage): MailerLitePayload {
  const optional: Record<string, string> = {
    name: message.first_name,
    current_status: message.current_status,
    subject: message.subject,
    message: message.message,
  }

  if (message.tag === 'not listed bottom') {
    optional.bank_name_when_not_found = message.bank
  }
  if (message.tag === 'green bank') {
    optional.leadgen_bank = message.bank
  }

  const country = message.location.country.trim().toUpperCase()
  if (/^[A-Z]{2}$/.test(country) && country !== 'XX' && country !== 'T1') {
    optional.country = country
  }

  const fields: Record<string, string> = {}
  for (const [key, value] of Object.entries(optional)) {
    if (value) fields[key] = value
  }
  fields.agreed_to_marketing = String(Boolean(message.is_agree_marketing))
  fields.signup_source = message.tag

  const payload: MailerLitePayload = {
    email: message.email,
    fields,
    groups: groupsFor(message.tag, message.is_agree_marketing),
  }
  if (message.is_agree_marketing) payload.resubscribe = true

  return payload
}

export function rejectedFieldKeys(response: unknown, payload: MailerLitePayload): string[] {
  const errors = (response as MailerLiteResponse | null)?.errors
  if (!errors || typeof errors !== 'object') return []

  const keys = Object.keys(errors)
  const fieldKeys = keys
    .filter((key) => key.startsWith('fields.'))
    .map((key) => key.slice('fields.'.length))
    .filter((key) => key in payload.fields)

  return fieldKeys.length > 0 && fieldKeys.length === keys.length ? fieldKeys : []
}

function withoutFields(payload: MailerLitePayload, keys: string[]): MailerLitePayload {
  const fields = { ...payload.fields }
  for (const key of keys) delete fields[key]
  return { ...payload, fields }
}

async function postSubscriber(
  env: MailerLiteEnv,
  payload: MailerLitePayload,
  signal?: AbortSignal
): Promise<{ status: number; data: MailerLiteResponse | null; retryAfter: string | null }> {
  const response = await fetch(`${env.MAILERLITE_URL.replace(/\/+$/, '')}/subscribers`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify(payload),
    signal,
  })

  let data: MailerLiteResponse | null
  try {
    data = (await response.json()) as MailerLiteResponse
  } catch {
    data = null
  }

  return { status: response.status, data, retryAfter: response.headers.get('retry-after') }
}

function isSuccess(status: number): boolean {
  return status === 200 || status === 201
}

function logFailure(
  env: MailerLiteEnv,
  tag: string,
  result: { status: number; data: MailerLiteResponse | null; retryAfter: string | null }
): MailerLiteError {
  if (result.status === 429) {
    log(env, 'error', `Rate limited (429) for tag "${tag}"`, { retryAfter: result.retryAfter })
    return 'rate_limited'
  }

  log(env, 'error', `Request failed with HTTP ${result.status} for tag "${tag}"`, {
    message: result.data?.message,
    errors: result.data?.errors,
  })
  if (result.status !== 422) return 'request_failed'
  return result.data?.errors && 'email' in result.data.errors ? 'invalid_email' : 'rejected'
}

async function sendToMailerLiteReal(
  env: MailerLiteEnv,
  payload: MailerLitePayload,
  tag: string,
  signal?: AbortSignal
): Promise<MailerLiteResult> {
  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_URL) {
    log(env, 'error', 'MailerLite API credentials not configured')
    return { success: false, mode: 'real', error: 'not_configured' }
  }

  try {
    log(env, 'debug', 'Sending subscriber to MailerLite...')

    const first = await postSubscriber(env, payload, signal)
    log(env, 'debug', `Subscriber response (HTTP ${first.status}):`, first.data)

    if (isSuccess(first.status)) {
      return { success: true, mode: 'real', subscriberId: first.data?.data?.id, payload }
    }

    const rejected = first.status === 422 ? rejectedFieldKeys(first.data, payload) : []
    if (rejected.length === 0) {
      return { success: false, mode: 'real', error: logFailure(env, tag, first) }
    }

    if (rejected.some((key) => ENQUIRY_FIELDS.includes(key))) {
      log(env, 'error', `Refused enquiry text for tag "${tag}", not retrying`, {
        refusedFields: rejected,
        errors: first.data?.errors,
      })
      return { success: false, mode: 'real', error: 'refused_enquiry' }
    }

    log(env, 'error', `Refused fields for tag "${tag}", retrying without them`, {
      droppedFields: rejected,
      errors: first.data?.errors,
    })

    const retryPayload = withoutFields(payload, rejected)
    const retry = await postSubscriber(env, retryPayload, signal)
    log(env, 'debug', `Retry response (HTTP ${retry.status}):`, retry.data)

    if (isSuccess(retry.status)) {
      return {
        success: true,
        mode: 'real',
        subscriberId: retry.data?.data?.id,
        payload: retryPayload,
        droppedFields: rejected,
      }
    }

    const retryRejected = retry.status === 422 ? rejectedFieldKeys(retry.data, retryPayload) : []
    if (retryRejected.some((key) => ENQUIRY_FIELDS.includes(key))) {
      log(env, 'error', `Refused enquiry text for tag "${tag}" on retry`, {
        refusedFields: retryRejected,
        errors: retry.data?.errors,
      })
      return { success: false, mode: 'real', error: 'refused_enquiry' }
    }

    return { success: false, mode: 'real', error: logFailure(env, tag, retry) }
  } catch (error) {
    log(env, 'error', 'MailerLite API error:', error instanceof Error ? error.message : error)
    return { success: false, mode: 'real', error: 'request_failed' }
  }
}

function mockSend(env: MailerLiteEnv, payload: MailerLitePayload, tag: string): MailerLiteResult {
  const mockSubscriberId = `mock-${Date.now()}`

  log(env, 'info', `[MOCK] Would create/update subscriber with ID: ${mockSubscriberId}`)
  log(env, 'info', `[MOCK] Would set signup_source: ${tag}, groups: ${payload.groups.join(', ')}`)
  log(env, 'debug', '[MOCK] Payload:', payload)

  return {
    success: true,
    mode: 'mock',
    subscriberId: mockSubscriberId,
    payload,
  }
}

export async function sendContact(
  env: MailerLiteEnv,
  message: ContactMessage,
  signal?: AbortSignal
): Promise<MailerLiteResult> {
  const mode = getMode(env)
  const payload = buildPayload(message)

  log(env, 'info', `Mode: ${mode}`)
  log(env, 'debug', 'Contact message:', message)

  if (mode === 'mock') {
    return mockSend(env, payload, message.tag)
  }

  return sendToMailerLiteReal(env, payload, message.tag, signal)
}
