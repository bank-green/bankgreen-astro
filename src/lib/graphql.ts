/**
 * GraphQL Client Setup for Django Backend
 *
 * For simple queries, you can use fetch directly.
 * For more complex needs, consider installing a GraphQL client:
 *   pnpm add graphql-request graphql
 *
 * Or for React islands with caching:
 *   pnpm add @tanstack/react-query graphql-request graphql
 */

// During build (SSG), use the direct endpoint from env var
// During runtime (client-side), use the API proxy route to avoid CORS
function getGraphQLEndpoint(): string {
  // Check if we're running in Node.js (SSG build time)
  if (typeof window === 'undefined') {
    // Use environment variable during build
    return import.meta.env.PUBLIC_GRAPHQL_ENDPOINT || 'https://data.bank.green/graphql'
  }
  // Use proxy route in browser
  return '/api/graphql'
}

/**
 * Simple GraphQL fetch function.
 * Use this in Astro pages/components for static data fetching.
 */
export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const endpoint = getGraphQLEndpoint()

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add authentication headers if needed
      // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error('GraphQL errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'GraphQL request failed')
  }

  return json.data
}

/**
 * Example usage in an Astro page:
 *
 * ---
 * import { graphqlFetch } from "../lib/graphql";
 *
 * interface EventsData {
 *   events: Array<{ id: string; title: string; date: string }>;
 * }
 *
 * const data = await graphqlFetch<EventsData>(`
 *   query GetEvents {
 *     events {
 *       id
 *       title
 *       date
 *     }
 *   }
 * `);
 * ---
 *
 * {data.events.map((event) => <div>{event.title}</div>)}
 */
