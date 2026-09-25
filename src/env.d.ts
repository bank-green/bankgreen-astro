/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  CLOUDFLARE_CAPTCHA_SECRET: string
  MAILERLITE_API_KEY: string
  MAILERLITE_URL: string
  CONTACT_FORM_MODE?: string
  CONTACT_FORM_DEBUG?: string
  EMAIL?: import('@lib/notify').SendEmail
  SLACK_WEBHOOK_URL?: string
}>

declare namespace App {
  interface Locals extends Runtime {}
}
