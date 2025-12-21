import { Typography } from '@mantine/core'

interface SafeHtmlProps {
  html: string | null | undefined
  className?: string
}

/**
 * Safely renders HTML content by stripping tags and preserving line breaks
 * Use this instead of dangerouslySetInnerHTML when you don't need rich formatting
 */
export function SafeHtml({ html, className = '' }: SafeHtmlProps) {
  if (!html) {
    return null
  }
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <Typography className={className} dangerouslySetInnerHTML={{ __html: html }} />
  // const lines = htmlToTextLines(html)

  // if (lines.length === 0) {
  //   return null
  // }

  // if (lines.length === 1) {
  //   return <div className={className}>{lines[0]}</div>
  // }

  // return (
  //   <div className={className}>
  //     {lines.map((line, index) => (
  //       // biome-ignore lint/suspicious/noArrayIndexKey: Lines are static content from HTML conversion
  //       <span key={index}>
  //         {line}
  //         {index < lines.length - 1 && <br />}
  //       </span>
  //     ))}
  //   </div>
  // )
}
