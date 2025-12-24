import { Text, Title } from '@mantine/core'
import parse, {
  type DOMNode,
  domToReact,
  type Element,
  type HTMLReactParserOptions,
} from 'html-react-parser'

interface SafeHtmlProps {
  html: string | null | undefined
  className?: string
}

/**
 * Parses HTML content from CMS and converts it to Mantine components.
 * - <h1>-<h6> → <Title order={1-6}>
 * - <p> → <Text>
 * - <span> → <Text span>
 * - Preserves class names but strips kerning/leading overrides
 */
export function SafeHtml({ html, className = '' }: SafeHtmlProps) {
  if (!html) {
    return null
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // Only process element nodes
      if (domNode.type !== 'tag') {
        return
      }

      const element = domNode as Element
      const tagName = element.name

      // Get and sanitize class names
      const elementClasses = element.attribs?.class || ''
      const isTitle = tagName.match(/^h[1-6]$/) !== null
      const classes = sanitizeClassNames(elementClasses, className, isTitle)

      // Convert children recursively
      const children = domToReact(element.children as DOMNode[], options)

      // Convert to appropriate Mantine component
      switch (tagName) {
        case 'h1':
          return (
            <Title order={1} className={classes}>
              {children}
            </Title>
          )
        case 'h2':
          return (
            <Title order={2} className={classes}>
              {children}
            </Title>
          )
        case 'h3':
          return (
            <Title order={3} className={classes}>
              {children}
            </Title>
          )
        case 'h4':
          return (
            <Title order={4} className={classes}>
              {children}
            </Title>
          )
        case 'h5':
          return (
            <Title order={5} className={classes}>
              {children}
            </Title>
          )
        case 'h6':
          return (
            <Title order={6} className={classes}>
              {children}
            </Title>
          )
        case 'p':
          return <Text className={classes}>{children}</Text>
        case 'span':
          return (
            <Text span className={classes}>
              {children}
            </Text>
          )
        case 'strong':
        case 'b':
          return (
            <Text span className={`font-bold ${classes}`}>
              {children}
            </Text>
          )
        case 'em':
        case 'i':
          return (
            <Text span className={`italic ${classes}`}>
              {children}
            </Text>
          )
        case 'a':
          return (
            <a href={element.attribs?.href || '#'} className={classes}>
              {children}
            </a>
          )
        case 'div':
          // For divs, just return the children without wrapping
          return <>{children}</>
        default:
          // For all other tags, let html-react-parser handle them naturally
          return
      }
    },
  }

  return <>{parse(html, options)}</>
}

/**
 * Sanitize class names by:
 * 1. Filtering out kerning/leading overrides (tracking-*, leading-*)
 * 2. Filtering out font-weight and text-size for Title elements (font-*, text-*)
 * 3. Merging with root className if provided
 */
function sanitizeClassNames(
  elementClasses: string,
  rootClassName: string,
  isTitle = false
): string {
  const classes = elementClasses.split(' ').filter((cls) => {
    if (!cls) return false

    // Strip kerning (letter-spacing) and leading (line-height) overrides
    if (cls.startsWith('tracking-') || cls.startsWith('leading-')) {
      return false
    }

    // Strip font-weight and text-size classes for Title elements (they use semantic weights/sizes)
    if (isTitle) {
      // Remove font-weight classes (font-bold, font-semibold, etc.)
      if (cls.startsWith('font-')) {
        return false
      }
      // Remove text-size classes (text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, etc.)
      if (cls.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/)) {
        return false
      }
    }

    return true
  })

  // Add root className if provided
  if (rootClassName) {
    classes.push(rootClassName)
  }

  return classes.filter(Boolean).join(' ')
}
