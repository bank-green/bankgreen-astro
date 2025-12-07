/**
 * SocialSharerSlice - Displays social sharing buttons.
 *
 * Variations: default
 *
 * Note: This is a placeholder - the actual sharing functionality
 * will need to be implemented with real share buttons.
 */
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";

interface Props {
  slice: Content.SocialSharerSliceSlice;
}

export function SocialSharerSlice({ slice }: Props) {
  const shareText = asText(slice.primary.text);
  const shareUrl = "https://bank.green";
  const hashtags = ["climatecrisis", "fossilbanks"];

  // Encode for URL sharing
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedHashtags = hashtags.join(",");

  return (
    <nav data-slice-type={slice.slice_type} aria-label="Share on social media">
      <ul>
        <li>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on X/Twitter
          </a>
        </li>
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Facebook
          </a>
        </li>
        <li>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on LinkedIn
          </a>
        </li>
      </ul>
    </nav>
  );
}
