import * as prismic from "@prismicio/client";
import type { ReactNode } from "react";

/**
 * Renders Prismic RichText field to semantic HTML.
 * Uses a simple recursive approach to convert Prismic's structured text to React elements.
 */
export function renderRichText(
  field: prismic.RichTextField | null | undefined
): ReactNode {
  if (!field || field.length === 0) return null;

  return field.map((block, index) => {
    const key = `block-${index}`;

    switch (block.type) {
      case "heading1":
        return <h1 key={key}>{renderSpans(block.text, block.spans)}</h1>;
      case "heading2":
        return <h2 key={key}>{renderSpans(block.text, block.spans)}</h2>;
      case "heading3":
        return <h3 key={key}>{renderSpans(block.text, block.spans)}</h3>;
      case "heading4":
        return <h4 key={key}>{renderSpans(block.text, block.spans)}</h4>;
      case "heading5":
        return <h5 key={key}>{renderSpans(block.text, block.spans)}</h5>;
      case "heading6":
        return <h6 key={key}>{renderSpans(block.text, block.spans)}</h6>;
      case "paragraph":
        return <p key={key}>{renderSpans(block.text, block.spans)}</p>;
      case "preformatted":
        return <pre key={key}>{block.text}</pre>;
      case "list-item":
        return <li key={key}>{renderSpans(block.text, block.spans)}</li>;
      case "o-list-item":
        return <li key={key}>{renderSpans(block.text, block.spans)}</li>;
      case "image":
        return (
          <figure key={key}>
            <img src={block.url} alt={block.alt || ""} />
            {block.alt && <figcaption>{block.alt}</figcaption>}
          </figure>
        );
      case "embed":
        return (
          <div
            key={key}
            dangerouslySetInnerHTML={{ __html: block.oembed.html || "" }}
          />
        );
      default:
        return null;
    }
  });
}

/**
 * Renders text with inline spans (bold, italic, links, etc.)
 */
function renderSpans(
  text: string,
  spans: prismic.RTInlineNode[]
): ReactNode {
  if (!spans || spans.length === 0) return text;

  // Sort spans by start position
  const sortedSpans = [...spans].sort((a, b) => a.start - b.start);

  const result: ReactNode[] = [];
  let currentPosition = 0;

  for (const span of sortedSpans) {
    // Add text before this span
    if (span.start > currentPosition) {
      result.push(text.slice(currentPosition, span.start));
    }

    const spanText = text.slice(span.start, span.end);
    const spanKey = `span-${span.start}-${span.end}`;

    switch (span.type) {
      case "strong":
        result.push(<strong key={spanKey}>{spanText}</strong>);
        break;
      case "em":
        result.push(<em key={spanKey}>{spanText}</em>);
        break;
      case "hyperlink":
        result.push(
          <a key={spanKey} href={prismic.asLink(span.data) || "#"}>
            {spanText}
          </a>
        );
        break;
      default:
        result.push(spanText);
    }

    currentPosition = span.end;
  }

  // Add remaining text after last span
  if (currentPosition < text.length) {
    result.push(text.slice(currentPosition));
  }

  return result;
}

/**
 * Wraps list items in appropriate list containers.
 * Call this on the result of renderRichText when you expect lists.
 */
export function wrapLists(nodes: ReactNode): ReactNode {
  // This is a simplified version - for full list support,
  // you'd want to group consecutive list items
  return nodes;
}

/**
 * Extract plain text from a Prismic RichText field.
 */
export function asText(
  field: prismic.RichTextField | null | undefined
): string {
  if (!field) return "";
  return prismic.asText(field);
}

/**
 * Get image URL from Prismic image field.
 */
export function asImageSrc(
  field: prismic.ImageField | null | undefined
): string | null {
  if (!field?.url) return null;
  return field.url;
}

/**
 * Get link URL from Prismic link field.
 */
export function asLinkHref(
  field: prismic.LinkField | null | undefined
): string | null {
  return prismic.asLink(field);
}
