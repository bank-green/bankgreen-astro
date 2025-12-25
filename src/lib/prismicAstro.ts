/**
 * Prismic helpers for Astro pages (static rendering)
 *
 * These helpers convert Prismic content to HTML strings for use in Astro templates.
 * For React components (interactive slices), use prismicHelpers.tsx instead.
 */
import * as prismic from '@prismicio/client'
import { asHTML } from '@prismicio/helpers'

/**
 * Renders Prismic RichText field to an HTML string.
 * Use this in Astro components with set:html directive.
 * Uses Prismic's official asHTML function to properly handle nested/overlapping spans.
 */
export function richTextToHtml(field: prismic.RichTextField | null | undefined): string {
  if (!field || field.length === 0) return ''

  return (
    asHTML(field, null, {
      hyperlink: ({ node, children }) => {
        const href = prismic.asLink(node.data) || '#'
        const isExternal = node.data?.link_type === 'Web'
        const target = isExternal ? ' target="_blank"' : ''
        const rel = isExternal ? ' rel="noopener noreferrer"' : ''

        return `<a href="${escapeHtml(href)}"${target}${rel}>${children}</a>`
      },
    }) || ''
  )
}

/**
 * Escapes HTML special characters.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Re-export common Prismic helpers
export { asImageSrc, asLink, asText } from '@prismicio/client'
