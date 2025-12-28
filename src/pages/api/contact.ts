import type { APIRoute } from 'astro'

export const prerender = false

interface ContactRequestBody {
  firstName?: string
  lastName?: string
  email: string
  message?: string
  subject?: string
  tag?: string
  bank?: string
  bankDisplayName?: string
  isAgreeMarketing?: boolean
  currentStatus?: string
  captchaToken?: string
}

interface ContactMessage {
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

const AC_API_KEY = import.meta.env.ACTIVE_CAMPAIGN_KEY
const AC_BASE_URL = import.meta.env.ACTIVE_CAMPAIGN_URL
const CAPTCHA_SECRET = import.meta.env.CLOUDFLARE_CAPTCHA_SECRET

function getTagId(tag: string): number {
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

async function verifyCaptcha(token: string): Promise<boolean> {
  if (!CAPTCHA_SECRET) {
    console.warn('CAPTCHA_SECRET not configured, skipping verification')
    return true
  }

  const formData = new FormData()
  formData.append('secret', CAPTCHA_SECRET)
  formData.append('response', token)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  const result = (await response.json()) as { success: boolean }
  return result.success
}

async function sendToActiveCampaign(message: ContactMessage): Promise<{ success: boolean }> {
  if (!AC_API_KEY || !AC_BASE_URL) {
    console.error('ActiveCampaign API credentials not configured')
    return { success: false }
  }

  const reqBody: { contact: ActiveCampaignContact } = {
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

  try {
    const contactResponse = await fetch(`${AC_BASE_URL}/contact/sync`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token': AC_API_KEY,
      },
      body: JSON.stringify(reqBody),
    })

    const contactData = (await contactResponse.json()) as ActiveCampaignResponse

    if (contactData?.contact?.id) {
      // Add tag to the contact
      await fetch(`${AC_BASE_URL}/contactTags`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Api-Token': AC_API_KEY,
        },
        body: JSON.stringify({
          contactTag: {
            contact: contactData.contact.id,
            tag: getTagId(message.tag),
          },
        }),
      })

      return { success: true }
    }

    return { success: false }
  } catch (error) {
    console.error('ActiveCampaign API error:', error)
    return { success: false }
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as ContactRequestBody

    // Validate required fields
    if (!body.email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Verify captcha in production
    const isDev = import.meta.env.DEV
    if (!isDev && body.captchaToken) {
      const captchaValid = await verifyCaptcha(body.captchaToken)
      if (!captchaValid) {
        return new Response(JSON.stringify({ error: 'Captcha verification failed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    // Extract Cloudflare headers for geolocation
    const headers = request.headers
    const ip = headers.get('cf-connecting-ip') || ''
    const country = headers.get('cf-ipcountry') || ''
    const city = headers.get('cf-ipcity') || ''

    const message: ContactMessage = {
      app_env: isDev ? 'development' : 'production',
      first_name: body.firstName || '',
      last_name: body.lastName || '',
      email: body.email,
      created_at: Date.now(),
      message: body.message || '',
      subject: body.subject || '',
      tag: body.tag || 'form tag not defined',
      bank: body.bank || '',
      bank_display_name: body.bankDisplayName || '',
      is_agree_marketing: body.isAgreeMarketing,
      current_status: body.currentStatus || '',
      ip,
      location: { country, city },
    }

    const result = await sendToActiveCampaign(message)

    if (result.success) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Failed to submit contact form' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
