import { type ContactMessage, sendContact } from '@lib/activecampaign'
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

async function verifyCaptcha(token: string, captchaSecret: string): Promise<boolean> {
  if (!captchaSecret) {
    throw new Error('CLOUDFLARE_CAPTCHA_SECRET is not configured')
  }

  const formData = new FormData()
  formData.append('secret', captchaSecret)
  formData.append('response', token)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  const result = (await response.json()) as { success: boolean }
  return result.success
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { env } = locals.runtime
    const body = (await request.json()) as ContactRequestBody

    // Validate required fields
    if (!body.email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Verify captcha (skip in dev mode unless CAPTCHA_TEST_MODE is enabled)
    const isDev = import.meta.env.DEV
    const captchaTestMode = import.meta.env.CAPTCHA_TEST_MODE === 'true'
    const shouldVerifyCaptcha = !isDev || captchaTestMode

    if (shouldVerifyCaptcha) {
      if (!body.captchaToken) {
        return new Response(JSON.stringify({ error: 'Captcha token is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      const captchaValid = await verifyCaptcha(body.captchaToken, env.CLOUDFLARE_CAPTCHA_SECRET)
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

    const result = await sendContact(env, message)
    const isDebug = env.CONTACT_FORM_DEBUG === 'true'

    if (result.success) {
      // In debug mode, include additional info for testing
      const responseData = isDebug
        ? { success: true, mode: result.mode, contactId: result.contactId, payload: result.payload }
        : { success: true }

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ error: result.error || 'Failed to submit contact form' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
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
