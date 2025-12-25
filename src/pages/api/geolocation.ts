import type { APIRoute } from 'astro'

/**
 * Geolocation API endpoint
 *
 * Production (Cloudflare): Uses Cloudflare's request.cf geolocation headers (unlimited, free)
 * Development: Multiple fallback options:
 *   1. Query params: /api/geolocation?country=US&state=CA
 *   2. Environment vars: DEV_LOCATION_COUNTRY=US, DEV_LOCATION_STATE=CA
 *   3. ip-api.com (free tier: 45 requests/minute, CORS-enabled)
 *
 * Query params take priority over env vars in development.
 */
export const prerender = false

interface IpApiResponse {
  status?: string
  countryCode?: string
  regionName?: string
  region?: string
}

interface CloudflareRequest {
  country?: string
  region?: string
  regionCode?: string
}

interface LocationData {
  country: string | null
  region: string | null
  regionCode: string | null
}

function createNullResponse(): Response {
  const nullLocation: LocationData = {
    country: null,
    region: null,
    regionCode: null,
  }

  return new Response(JSON.stringify(nullLocation), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const GET: APIRoute = async ({ url, request }) => {
  // Development: Check for location override via query params or env vars
  const isDev = import.meta.env.DEV
  if (isDev) {
    const queryCountry = url.searchParams.get('country')
    const queryState = url.searchParams.get('state')
    const envCountry = import.meta.env.DEV_LOCATION_COUNTRY
    const envState = import.meta.env.DEV_LOCATION_STATE

    // Query params take priority over env vars
    const devCountry = queryCountry || envCountry
    const devState = queryState || envState

    if (devCountry) {
      console.log(
        `[DEV] Using simulated location: ${devCountry}${devState ? ` (${devState})` : ''}`
      )
      return new Response(
        JSON.stringify({
          country: devCountry,
          region: devState || null,
          regionCode: devState || null,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }

  // Try Cloudflare headers first (production on Cloudflare Workers/Pages)
  const cf = (request as { cf?: CloudflareRequest }).cf
  if (cf?.country) {
    const locationData: LocationData = {
      country: cf.country || null,
      region: cf.region || null,
      regionCode: cf.regionCode || cf.region || null,
    }

    return new Response(JSON.stringify(locationData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Fallback to ip-api.com (free tier: 45 requests/minute, no API key needed)
  try {
    const response = await fetch('http://ip-api.com/json/')

    if (!response.ok) {
      console.warn(`ip-api.com returned status ${response.status}: ${response.statusText}`)
      return createNullResponse()
    }

    const data: IpApiResponse = await response.json()

    if (data.status === 'fail') {
      console.warn('ip-api.com: Failed to detect location')
      return createNullResponse()
    }

    const locationData: LocationData = {
      country: data.countryCode || null,
      region: data.regionName || null,
      regionCode: data.region || null,
    }

    return new Response(JSON.stringify(locationData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Geolocation detection error:', error)
    return createNullResponse()
  }
}
