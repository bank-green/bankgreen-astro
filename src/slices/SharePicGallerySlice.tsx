/**
 * SharePicGallerySlice - Displays a gallery of shareable images.
 *
 * Variations: default
 *
 * Note: The original uses hardcoded image paths. These would need to be
 * copied to the public/img/social/ directory in the Astro project.
 */
import { SimpleGrid, Image, Container } from '@mantine/core'

type SharePicGallerySlice = {
  slice_type: 'share_pic_gallery_slice'
  primary: Record<string, unknown>
}

interface Props {
  slice: SharePicGallerySlice
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
    <Container
      component="section"
      data-slice-type={slice.slice_type}
      aria-label="Shareable images gallery"
    >
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {GALLERY_IMAGES.map((image, index) => (
          <Image key={index} src={image.src} alt={image.alt} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
