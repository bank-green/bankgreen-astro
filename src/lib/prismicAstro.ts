/**
 * Prismic helpers for Astro pages (static rendering)
 *
 * These helpers convert Prismic content to HTML strings for use in Astro templates.
 * For React components (interactive slices), use prismicHelpers.tsx instead.
 */
import * as prismic from '@prismicio/client'

/**
 * Renders Prismic RichText field to an HTML string.
 * Use this in Astro components with set:html directive.
 */
export function richTextToHtml(field: prismic.RichTextField | null | undefined): string {
  if (!field || field.length === 0) return ''

  return field
    .map((block) => {
      switch (block.type) {
        case 'heading1':
          return `<h1>${renderSpansToHtml(block.text, block.spans)}</h1>`
        case 'heading2':
          return `<h2>${renderSpansToHtml(block.text, block.spans)}</h2>`
        case 'heading3':
          return `<h3>${renderSpansToHtml(block.text, block.spans)}</h3>`
        case 'heading4':
          return `<h4>${renderSpansToHtml(block.text, block.spans)}</h4>`
        case 'heading5':
          return `<h5>${renderSpansToHtml(block.text, block.spans)}</h5>`
        case 'heading6':
          return `<h6>${renderSpansToHtml(block.text, block.spans)}</h6>`
        case 'paragraph':
          return `<p>${renderSpansToHtml(block.text, block.spans)}</p>`
        case 'preformatted':
          return `<pre>${escapeHtml(block.text)}</pre>`
        case 'list-item':
          return `<li>${renderSpansToHtml(block.text, block.spans)}</li>`
        case 'o-list-item':
          return `<li>${renderSpansToHtml(block.text, block.spans)}</li>`
        case 'image': {
          const alt = block.alt ? escapeHtml(block.alt) : ''
          const caption = block.alt ? `<figcaption>${alt}</figcaption>` : ''
          return `<figure><img src="${block.url}" alt="${alt}" />${caption}</figure>`
        }
        case 'embed':
          return block.oembed.html || ''
        default:
          return ''
      }
    })
    .join('\n')
}

/**
 * Renders text with inline spans to HTML string.
 */
function renderSpansToHtml(text: string, spans: prismic.RTTextNodeSpan[]): string {
  if (!spans || spans.length === 0) return escapeHtml(text)

  // Sort spans by start position
  const sortedSpans = [...spans].sort((a, b) => a.start - b.start)

  const parts: string[] = []
  let currentPosition = 0

  for (const span of sortedSpans) {
    // Add text before this span
    if (span.start > currentPosition) {
      parts.push(escapeHtml(text.slice(currentPosition, span.start)))
    }

    const spanText = escapeHtml(text.slice(span.start, span.end))

    switch (span.type) {
      case 'strong':
        parts.push(`<strong>${spanText}</strong>`)
        break
      case 'em':
        parts.push(`<em>${spanText}</em>`)
        break
      case 'hyperlink': {
        const href = prismic.asLink(span.data) || '#'
        parts.push(`<a href="${escapeHtml(href)}">${spanText}</a>`)
        break
      }
      default:
        parts.push(spanText)
    }

    currentPosition = span.end
  }

  // Add remaining text after last span
  if (currentPosition < text.length) {
    parts.push(escapeHtml(text.slice(currentPosition)))
  }

  return parts.join('')
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
