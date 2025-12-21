/**
 * Converts HTML to plain text, preserving block-level element spacing
 * @param html - HTML string to convert
 * @returns Plain text with appropriate line breaks
 */
export function htmlToText(html: string | null | undefined): string {
  if (!html) return ''

  // Replace block-level elements with newlines before stripping tags
  const blockElements = [
    'p',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'li',
    'br',
    'hr',
    'blockquote',
    'pre',
    'section',
    'article',
    'header',
    'footer',
    'aside',
    'nav',
  ]

  let text = html

  // Add newlines before and after block-level closing tags
  for (const tag of blockElements) {
    // Special case for br and hr (self-closing)
    if (tag === 'br' || tag === 'hr') {
      text = text.replace(new RegExp(`<${tag}\\s*/?>`, 'gi'), '\n')
    } else {
      // Add newline after closing tag
      text = text.replace(new RegExp(`</${tag}>`, 'gi'), `</${tag}>\n`)
      // Add newline before opening tag (except for first element)
      text = text.replace(new RegExp(`<${tag}[^>]*>`, 'gi'), (match, offset) => {
        return offset > 0 ? `\n${match}` : match
      })
    }
  }

  // Handle list items specially to preserve list formatting
  text = text.replace(/<li[^>]*>/gi, '\n• ')

  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '')

  // Decode common HTML entities
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '…',
  }

  for (const [entity, char] of Object.entries(entities)) {
    text = text.replace(new RegExp(entity, 'g'), char)
  }

  // Clean up excessive newlines (more than 2 consecutive)
  text = text.replace(/\n{3,}/g, '\n\n')

  // Trim leading/trailing whitespace
  text = text.trim()

  return text
}

/**
 * Converts HTML to React-friendly text with preserved line breaks
 * Returns text split by newlines for rendering with <br/> tags
 * @param html - HTML string to convert
 * @returns Array of text segments to render
 */
export function htmlToTextLines(html: string | null | undefined): string[] {
  const text = htmlToText(html)
  return text.split('\n').filter((line) => line.trim().length > 0)
}
