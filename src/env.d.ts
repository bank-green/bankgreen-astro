/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  CLOUDFLARE_CAPTCHA_SECRET: string
  ACTIVE_CAMPAIGN_KEY: string
  ACTIVE_CAMPAIGN_URL: string
}>

declare namespace App {
  interface Locals extends Runtime {}
}
