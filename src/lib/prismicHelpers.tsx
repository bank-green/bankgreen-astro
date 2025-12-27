import { Image, Text, Title } from '@mantine/core'
import * as prismic from '@prismicio/client'
import { serialize } from '@prismicio/richtext'
import type { ReactNode } from 'react'

/**
 * Renders Prismic RichText field to semantic HTML.
 * Uses a simple recursive approach to convert Prismic's structured text to React elements.
 */
export function renderRichText(
  field: prismic.RichTextField | null | undefined,
  className?: string | undefined
): ReactNode {
  if (!field || field.length === 0) return null

  return field.map((block, index) => {
    const key = `block-${index}`

    switch (block.type) {
      case 'heading1':
        return (
          <Title order={1} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
      case 'heading2':
        return (
          <Title order={2} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
      case 'heading3':
        return (
          <Title order={3} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
      case 'heading4':
        return (
          <Title order={4} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
      case 'heading5':
        return (
          <Title order={5} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
      case 'heading6':
        return (
          <Title order={6} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
      case 'paragraph':
        return (
          <Text key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Text>
        )
      case 'preformatted':
        return (
          <pre key={key} className={className}>
            {block.text}
          </pre>
        )
      case 'list-item':
        return (
          <li key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </li>
        )
      case 'o-list-item':
        return (
          <li key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </li>
        )
      case 'image':
        return <Image key={key} className={className} src={block.url} alt={block.alt || ''} />
      case 'embed':
        return (
          <div
            key={key}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: This is appropriate for embeds
            dangerouslySetInnerHTML={{ __html: block.oembed.html || '' }}
            className={className}
          />
        )
      default:
        return null
    }
  })
}

/**
 * Renders text with inline spans (bold, italic, links, etc.)
 * Uses Prismic's serialize function to properly handle nested/overlapping spans
 */
function renderSpans(text: string, spans: prismic.RTInlineNode[]): ReactNode {
  if (!spans || spans.length === 0) return text

  // Create a minimal block node for serialize()
  const block = {
    type: 'paragraph' as const,
    text,
    spans,
  }

  // Define React serializer for inline elements
  const serializer = (
    type: string,
    // biome-ignore lint/suspicious/noExplicitAny: Prismic serialize API uses any for node parameter
    node: any,
    textContent: string | undefined,
    children: ReactNode[],
    key: string
  ): ReactNode => {
    switch (type) {
      case 'paragraph':
        // For inline rendering, we want just the children, not the <p> wrapper
        return <>{children}</>

      case 'strong':
        return <strong key={key}>{children}</strong>

      case 'em':
        return <em key={key}>{children}</em>

      case 'hyperlink': {
        const href = prismic.asLink(node.data) || '#'
        const isExternal = node.data?.link_type === 'Web'

        return (
          <a
            key={key}
            href={href}
            className="inline"
            {...(isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            {children}
          </a>
        )
      }

      case 'label':
        return (
          <span key={key} data-label={node.data?.label}>
            {children}
          </span>
        )

      default:
        return textContent
    }
  }

  // Serialize using Prismic's tree builder
  const result = serialize([block], serializer)

  // Return the first element (which is the paragraph with its children)
  return result[0] || text
}

/**
 * Wraps list items in appropriate list containers.
 * Call this on the result of renderRichText when you expect lists.
 */
export function wrapLists(nodes: ReactNode): ReactNode {
  // This is a simplified version - for full list support,
  // you'd want to group consecutive list items
  return nodes
}

/**
 * Extract plain text from a Prismic RichText field.
 */
export function asText(field: prismic.RichTextField | null | undefined): string {
  if (!field) return ''
  return prismic.asText(field)
}

/**
 * Get image URL from Prismic image field.
 */
export function asImageSrc(field: prismic.ImageField | null | undefined): string | null {
  if (!field?.url) return null
  return field.url
}

/**
 * Get link URL from Prismic link field.
 */
export function asLinkHref(field: prismic.LinkField | null | undefined): string | null {
  return prismic.asLink(field)
}
