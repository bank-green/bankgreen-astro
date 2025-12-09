import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'

const repositoryName = 'bankgreen'

export const prismicClient = prismic.createClient(repositoryName, {
  // Add access token here if using a private API
  // accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
})

/**
 * Safely fetch a single document from Prismic.
 * Returns null if the document doesn't exist or fetch fails.
 */
export async function getSingleSafe<T extends PrismicDocument>(
  documentType: string,
  options?: Parameters<typeof prismicClient.getSingle>[1]
): Promise<T | null> {
  try {
    return (await prismicClient.getSingle(documentType, options)) as T
  } catch (error) {
    // Log in development, fail silently in production
    if (import.meta.env.DEV) {
      console.warn(`Prismic: Could not fetch single "${documentType}"`, error)
    }
    return null
  }
}

/**
 * Safely fetch a document by UID from Prismic.
 * Returns null if the document doesn't exist or fetch fails.
 */
export async function getByUIDSafe<T extends PrismicDocument>(
  documentType: string,
  uid: string,
  options?: Parameters<typeof prismicClient.getByUID>[2]
): Promise<T | null> {
  try {
    return (await prismicClient.getByUID(documentType, uid, options)) as T
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Prismic: Could not fetch "${documentType}" with UID "${uid}"`, error)
    }
    return null
  }
}

/**
 * Safely fetch all documents of a type from Prismic.
 * Returns empty array if fetch fails.
 */
export async function getAllByTypeSafe<T extends PrismicDocument>(
  documentType: string,
  options?: Parameters<typeof prismicClient.getAllByType>[1]
): Promise<T[]> {
  try {
    return (await prismicClient.getAllByType(documentType, options)) as T[]
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Prismic: Could not fetch all "${documentType}"`, error)
    }
    return []
  }
}

/**
 * Prismic UID mappings for the consolidated thanks page.
 * Maps route slugs to Prismic document UIDs.
 */
export const thanksPagesMap: Record<string, { uid: string; type: string }> = {
  thanks: { uid: 'thanks', type: 'thankspages' },
  contact: { uid: 'thanks_contact', type: 'thankspages' },
  embrace: { uid: 'thanks_embrace', type: 'thankspages' },
  'signup-later': { uid: 'thanskssignup', type: 'thankspages' },
  confirmed: { uid: 'confirmed', type: 'thankspages' },
  'donate-complete': { uid: 'donatecompleted', type: 'thankspages' },
  'donate-cancelled': { uid: 'donatecancelled', type: 'textonlypages' },
  'updates-yes': { uid: 'updates_yes', type: 'thankspages' },
  'updates-no': { uid: 'updates_no', type: 'thankspages' },
}

/**
 * Default fallback content for thanks pages when Prismic content is unavailable.
 */
export const thanksPagesFallback: Record<string, { title: string; description?: string }> = {
  thanks: {
    title: 'Thank you for joining Bank.Green!',
    description: 'We appreciate your support in defunding fossil banks.',
  },
  contact: {
    title: 'Thank you for your message',
    description: "We'll get back to you as soon as we can.",
  },
  embrace: {
    title: 'Thank you!',
    description: 'Your submission has been received.',
  },
  'signup-later': {
    title: "Thanks, we've emailed you a link to sign up later.",
  },
  confirmed: {
    title: 'Thanks for joining the Money Movement and our emailing list!',
    description: "You'll be hearing from us soon!",
  },
  'donate-complete': {
    title: 'Thank you for your donation!',
    description: 'We appreciate your support in defunding fossil banks.',
  },
  'donate-cancelled': {
    title: 'Your donation was cancelled.',
  },
  'updates-yes': {
    title: 'Thank you for your continuing support.',
    description: "We're happy you'd like to stay in touch!",
  },
  'updates-no': {
    title: 'Your response has been recorded.',
    description: "We're sorry to see you go, but you'll no longer receive updates from us!",
  },
}
