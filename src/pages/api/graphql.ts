import type { APIRoute } from 'astro'

export const prerender = false

const GRAPHQL_ENDPOINT = 'https://data.bank.green/graphql'

export const POST: APIRoute = async ({ request }) => {
  try {
    // Read the request body as text first, then parse
    const bodyText = await request.text()
    const body = bodyText ? JSON.parse(bodyText) : {}

    // console.log('GraphQL Proxy - Request body:', JSON.stringify(body, null, 2))

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    // console.log('GraphQL Proxy - Response:', JSON.stringify(data, null, 2).substring(0, 500))

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('GraphQL proxy error:', error)
    return new Response(
      JSON.stringify({
        errors: [
          {
            message:
              error instanceof Error ? error.message : 'Failed to fetch from GraphQL endpoint',
          },
        ],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
