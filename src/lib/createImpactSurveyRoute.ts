import type { APIRoute } from 'astro'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

// Same Django service as the GraphQL endpoint, REST side. Dev points at localhost so a local
// submission can never write to the production database.
const BASE_URL = import.meta.env.DEV ? 'http://localhost:8000' : 'https://data.bank.green'

export function createImpactSurveyRoute(endpoint: string): APIRoute {
  return async ({ request }) => {
    try {
      // Do not verify the Turnstile token here. Django verifies it, and that check is the only
      // thing stopping unauthenticated writes. Tokens are single-use, so verifying twice fails.
      const response = await fetch(`${BASE_URL}/api/${endpoint}/`, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: await request.text(),
      })

      return new Response(response.body, { status: response.status, headers: JSON_HEADERS })
    } catch (error) {
      console.error(`${endpoint} error:`, error)
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: JSON_HEADERS,
      })
    }
  }
}
