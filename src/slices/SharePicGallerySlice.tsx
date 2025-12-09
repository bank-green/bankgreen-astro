/**
 * SharePicGallerySlice - Displays a gallery of shareable images.
 *
 * Variations: default
 *
 * Note: The original uses hardcoded image paths. These would need to be
 * copied to the public/img/social/ directory in the Astro project.
 */
import type { Content } from '@prismicio/client'

interface Props {
  slice: Content.SharePicGallerySliceSlice
}

const GALLERY_IMAGES = [
  { src: '/img/social/social-image-1.jpg', alt: 'Social share image 1' },
  { src: '/img/social/social-image-2.jpg', alt: 'Social share image 2' },
  { src: '/img/social/social-image-3.jpg', alt: 'Social share image 3' },
  { src: '/img/social/social-image-4.jpg', alt: 'Social share image 4' },
  { src: '/img/social/social-image-5.jpg', alt: 'Social share image 5' },
  { src: '/img/social/social-image-6.jpg', alt: 'Social share image 6' },
]

export function SharePicGallerySlice({ slice }: Props) {
  return (
    <section data-slice-type={slice.slice_type} aria-label="Shareable images gallery">
      <ul>
        {GALLERY_IMAGES.map((image, index) => (
          <li key={index}>
            <img src={image.src} alt={image.alt} />
          </li>
        ))}
      </ul>
    </section>
  )
}
