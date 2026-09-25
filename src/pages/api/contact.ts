import {
  type ContactMessage,
  findOverLengthFields,
  isContactFormTag,
  MAX_FIELD_LENGTH,
  sendContact,
} from '@lib/mailerlite'
import { notifyTeam } from '@lib/notify'
import { notifySlack } from '@lib/slack'
import type { APIRoute } from 'astro'

export const prerender = false

const GENERIC_ERROR = 'Sorry, we could not submit the form. Please try again later.'
const INVALID_EMAIL_ERROR = 'Please enter a valid email address.'
const REFUSED_ENQUIRY_ERROR = 'Please rephrase your message and try again.'

interface ContactRequestBody {
  firstName?: string
  email: string
  message?: string
  subject?: string
  tag?: string
  bank?: string
  isAgreeMarketing?: boolean
  currentStatus?: string
  captchaToken?: string
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
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
    const email = text(body.email)
    if (!email) {
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

    if (!isContactFormTag(body.tag)) {
      console.error('Contact form submitted with an unknown tag:', JSON.stringify(body.tag))
      return new Response(JSON.stringify({ error: GENERIC_ERROR }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Extract Cloudflare headers for geolocation
    const headers = request.headers
    const ip = headers.get('cf-connecting-ip') || ''
    const country = headers.get('cf-ipcountry') || ''
    const city = headers.get('cf-ipcity') || ''

    const message: ContactMessage = {
      app_env: isDev ? 'development' : 'production',
      first_name: text(body.firstName),
      email,
      created_at: Date.now(),
      message: text(body.message),
      subject: text(body.subject),
      tag: body.tag,
      bank: text(body.bank),
      is_agree_marketing: body.isAgreeMarketing === true,
      current_status: text(body.currentStatus),
      ip,
      location: { country, city },
    }

    const overLength = findOverLengthFields({
      name: message.first_name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      bank: message.bank,
      current_status: message.current_status,
    })
    if (overLength.length > 0) {
      console.error(`Contact form fields over ${MAX_FIELD_LENGTH} characters:`, overLength)
      return new Response(
        JSON.stringify({
          error: `Please keep each field to ${MAX_FIELD_LENGTH} characters or fewer.`,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const result = await sendContact(env, message)
    const isDebug = env.CONTACT_FORM_DEBUG === 'true'

    if (result.success) {
      if (message.tag === 'contact page form') {
        await notifyTeam(env, message)

        // A Slack failure must not fail the submission: MailerLite already has the contact
        try {
          await notifySlack(env, message)
        } catch (error) {
          console.error('Slack notification error:', error)
        }
      }

      // In debug mode, include additional info for testing
      const responseData = isDebug
        ? {
            success: true,
            mode: result.mode,
            subscriberId: result.subscriberId,
            droppedFields: result.droppedFields,
            payload: result.payload,
          }
        : { success: true }

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (result.error === 'invalid_email') {
      return new Response(JSON.stringify({ error: INVALID_EMAIL_ERROR }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (result.error === 'refused_enquiry') {
      return new Response(JSON.stringify({ error: REFUSED_ENQUIRY_ERROR }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: GENERIC_ERROR }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(JSON.stringify({ error: GENERIC_ERROR }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
