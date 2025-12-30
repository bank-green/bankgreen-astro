/**
 * SocialSharer - Displays social sharing buttons for a page.
 *
 * This is a standalone component that can be used without Prismic data.
 * For Prismic slice integration, use SocialSharerSlice instead.
 */
import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { FacebookLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react'

interface Props {
  /** Text to share (will be URL encoded) */
  shareText?: string
  /** URL to share (defaults to current page) */
  shareUrl?: string
  /** Hashtags for Twitter/X (without # symbol) */
  hashtags?: string[]
  /** Size of the icon buttons */
  size?: 'sm' | 'md' | 'lg'
  /** Additional class names */
  className?: string
}

export function SocialSharer({
  shareText = 'Check out this sustainable bank on Bank.Green!',
  shareUrl,
  hashtags = ['climatecrisis', 'fossilbanks', 'sustainablebanking'],
  size = 'md',
  className,
}: Props) {
  // Use provided URL or fallback to current page (client-side)
  const url =
    shareUrl || (typeof window !== 'undefined' ? window.location.href : 'https://bank.green')

  // Encode for URL sharing
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(url)
  const encodedHashtags = hashtags.join(',')

  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 26 : 22

  return (
    <Group
      component="nav"
      aria-label="Share on social media"
      className={`gap-2 ${className || ''}`}
    >
      <Tooltip label="Share on X/Twitter" position="bottom">
        <ActionIcon
          component="a"
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          color="gray"
          size={size}
          aria-label="Share on X/Twitter"
        >
          <XLogoIcon size={iconSize} weight="fill" />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Share on Facebook" position="bottom">
        <ActionIcon
          component="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          color="gray"
          size={size}
          aria-label="Share on Facebook"
        >
          <FacebookLogoIcon size={iconSize} weight="fill" />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Share on LinkedIn" position="bottom">
        <ActionIcon
          component="a"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          color="gray"
          size={size}
          aria-label="Share on LinkedIn"
        >
          <LinkedinLogoIcon size={iconSize} weight="fill" />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
