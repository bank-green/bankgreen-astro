import { Image, List, Text, Title } from '@mantine/core'
import * as prismic from '@prismicio/client'
import { serialize } from '@prismicio/richtext'
import type { ReactNode } from 'react'
import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes HTML content for safe rendering.
 * Allows iframes for embed content (YouTube, etc.)
 */
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  })
}

/**
 * Renders Prismic RichText field to semantic HTML.
 * Groups consecutive list items into proper <ul>/<ol> containers.
 */
export function renderRichText(
  field: prismic.RichTextField | null | undefined,
  className?: string | undefined
): ReactNode {
  if (!field || field.length === 0) return null

  const result: ReactNode[] = []
  let currentList: { type: 'ul' | 'ol'; items: ReactNode[] } | null = null
  let listKeyCounter = 0

  const flushList = () => {
    if (currentList) {
      const listKey = `list-${listKeyCounter++}`
      if (currentList.type === 'ul') {
        result.push(
          <List key={listKey} className={className}>
            {currentList.items}
          </List>
        )
      } else {
        result.push(
          <List key={listKey} type="ordered" className={className}>
            {currentList.items}
          </List>
        )
      }
      currentList = null
    }
  }

  field.forEach((block, index) => {
    const key = `block-${index}`

    switch (block.type) {
      case 'heading1':
        flushList()
        result.push(
          <Title order={1} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
        break
      case 'heading2':
        flushList()
        result.push(
          <Title order={2} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
        break
      case 'heading3':
        flushList()
        result.push(
          <Title order={3} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
        break
      case 'heading4':
        flushList()
        result.push(
          <Title order={4} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
        break
      case 'heading5':
        flushList()
        result.push(
          <Title order={5} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
        break
      case 'heading6':
        flushList()
        result.push(
          <Title order={6} key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Title>
        )
        break
      case 'paragraph':
        flushList()
        result.push(
          <Text key={key} className={className}>
            {renderSpans(block.text, block.spans)}
          </Text>
        )
        break
      case 'preformatted':
        flushList()
        result.push(
          <pre key={key} className={className}>
            {block.text}
          </pre>
        )
        break
      case 'list-item':
        // Start new unordered list or continue existing one
        if (!currentList || currentList.type !== 'ul') {
          flushList()
          currentList = { type: 'ul', items: [] }
        }
        currentList.items.push(
          <List.Item key={key}>{renderSpans(block.text, block.spans)}</List.Item>
        )
        break
      case 'o-list-item':
        // Start new ordered list or continue existing one
        if (!currentList || currentList.type !== 'ol') {
          flushList()
          currentList = { type: 'ol', items: [] }
        }
        currentList.items.push(
          <List.Item key={key}>{renderSpans(block.text, block.spans)}</List.Item>
        )
        break
      case 'image':
        flushList()
        result.push(<Image key={key} className={className} src={block.url} alt={block.alt || ''} />)
        break
      case 'embed':
        flushList()
        result.push(
          <div
            key={key}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized embed content from Prismic
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.oembed.html || '') }}
            className={className}
          />
        )
        break
      default:
        flushList()
        break
    }
  })

  // Flush any remaining list
  flushList()

  return result
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
