import type { APIRoute } from 'astro'

export const prerender = false

const GRAPHQL_ENDPOINT = 'https://data.bank.green/graphql'

const ALL_BRANDS_QUERY = `
  query BrandsByCountryQuery {
    brands {
      edges {
        node {
          name
          tag
          countries {
            code
          }
          stateLicensed {
            tag
            name
          }
          website
          aliases
          commentary {
            displayOnWebsite
            institutionType {
              name
            }
          }
        }
      }
    }
  }
`

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ALL_BRANDS_QUERY }),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache at the Cloudflare edge for 1 hour; browsers may cache for 5 minutes
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Brands API error:', error)
    return new Response(
      JSON.stringify({
        errors: [
          {
            message:
              error instanceof Error ? error.message : 'Failed to fetch brands',
          },
        ],
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
