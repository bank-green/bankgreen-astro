/**
 * SocialSharerSlice - Displays social sharing buttons.
 *
 * Variations: default
 *
 * Note: This is a placeholder - the actual sharing functionality
 * will need to be implemented with real share buttons.
 */
import { Button, Group, Container } from '@mantine/core'
import type { RichTextField } from '@prismicio/client'
import { asText } from '@prismicio/client'

type SocialSharerSlice = {
  slice_type: 'social_sharer_slice'
  primary: {
    text?: RichTextField
  }
}

interface Props {
  slice: SocialSharerSlice
}

export function SocialSharerSlice({ slice }: Props) {
  const shareText = asText(slice.primary.text) || ''
  const shareUrl = 'https://bank.green'
  const hashtags = ['climatecrisis', 'fossilbanks']

  // Encode for URL sharing
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedHashtags = hashtags.join(',')

  return (
    <Container
      component="nav"
      data-slice-type={slice.slice_type}
      aria-label="Share on social media"
    >
      <Group>
        <Button
          component="a"
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
        >
          Share on X/Twitter
        </Button>
        <Button
          component="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
        >
          Share on Facebook
        </Button>
        <Button
          component="a"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
        >
          Share on LinkedIn
        </Button>
      </Group>
    </Container>
  )
}
