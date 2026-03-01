import type { Client } from '@prismicio/client'
import { asHTML } from '@prismicio/helpers'
import Fuse from 'fuse.js'

export interface Bank {
  name: string
  tag: string
  website?: string | null
  aliases?: string | null
  countries?: Array<{ code: string }> | null
  stateLicensed?: Array<{ tag: string; name: string }> | null
  commentary?: {
    institutionType?: Array<{ name: string }> | null
  } | null
}

export function findBanks(banks: Bank[], searchName: string): Bank[] {
  if (!searchName.trim()) {
    return banks
  }

  const fuse = new Fuse(banks, { threshold: 0.3, keys: ['name', 'aliases'] })
  const result = fuse.search(searchName)
  return result.map((x) => x.item)
}

export type DefaultFields = {
  rating?: string
  headline: string
  subtitle: string
  description1: string
  description2: string
  description3: string
  description4: string
}

/**
 * Check if an error is a Prismic "not found" error.
 * These are expected when optional content doesn't exist.
 */
function isNotFoundError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'NotFoundError' || error.message.includes('No documents were returned'))
  )
}

/**
 * Fetches default content from Prismic for bank pages based on rating
 * @param prismicClient - Prismic client instance
 * @param rating - Bank rating (good, bad, worst, ok, unknown)
 * @param bankname - Bank name for fallback messages
 * @param institutionType - Type of institution (Bank, Credit Union, etc.)
 * @returns Default fields with HTML content
 */
export async function getDefaultFields(
  prismicClient: Client,
  rating: string,
  bankname: string = 'this bank',
  institutionType: string = 'Bank'
): Promise<DefaultFields> {
  // Determine Prismic document UID based on rating and institution type
  const queryKey =
    rating === 'unknown'
      ? `unknownbank-${institutionType.toLowerCase().replace(/\s/g, '')}`
      : `${rating}bank`

  try {
    const response = await prismicClient.getByUID('bankpage', queryKey)
    const prismicDefaultFields = response?.data

    return {
      headline: asHTML(prismicDefaultFields?.headline) || '',
      subtitle: asHTML(prismicDefaultFields?.subtitle) || '',
      description1: asHTML(prismicDefaultFields?.description1) || '',
      description2: asHTML(prismicDefaultFields?.description2) || '',
      description3: asHTML(prismicDefaultFields?.description3) || '',
      description4: asHTML(prismicDefaultFields?.description4) || '',
    }
  } catch (err) {
    // Only log unexpected errors (not "document not found")
    if (import.meta.env.DEV && !isNotFoundError(err)) {
      console.warn(`Prismic: Error fetching bankpage "${queryKey}"`, err)
    }

    // Fallback content when Prismic document not found
    return {
      rating: 'unknown',
      headline: `<p>Sorry, we don't know enough about ${bankname} yet.</p>`,
      subtitle: '',
      description1: `<p>Unfortunately, we don't yet have enough information on ${bankname} to know what it's funding. What we do know however, is that contacting ${bankname} to ask them yourself will send a powerful message – banks will have no choice but to reassess socially irresponsible funding activities if they realize their customers are concerned. To take positive action, keep on scrolling…</p>`,
      description2: `<p>Bank.Green was founded on the belief that banks have had an easy time from their customers for too long. Mass movements will pull us out of the climate crisis – and they'll pull ${bankname} out, too.</p>`,
      description3: '',
      description4: '',
    }
  }
}
