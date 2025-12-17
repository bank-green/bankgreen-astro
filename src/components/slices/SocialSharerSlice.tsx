import { Group, Button } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    text?: any;
  };
  slice_type?: string;
}

export function SocialSharerSlice({ primary, slice_type }: Props) {
  const shareText = primary?.text ? PrismicDOM.RichText.asText(primary.text) : '';
  const shareUrl = 'https://bank.green';
  const hashtags = ['climatecrisis', 'fossilbanks'];

  // Encode for URL sharing
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedHashtags = hashtags.join(',');

  return (
    <nav data-slice-type={slice_type} aria-label="Share on social media">
      <Group>
        <Button
          component="a"
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
        >
          Share on X/Twitter
        </Button>
        <Button
          component="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
        >
          Share on Facebook
        </Button>
        <Button
          component="a"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
        >
          Share on LinkedIn
        </Button>
      </Group>
    </nav>
  );
}
