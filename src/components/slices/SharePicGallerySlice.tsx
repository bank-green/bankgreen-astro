import { SimpleGrid } from '@mantine/core';

interface Props {
  slice_type?: string;
}

const GALLERY_IMAGES = [
  { src: '/img/social/social-image-1.jpg', alt: 'Social share image 1' },
  { src: '/img/social/social-image-2.jpg', alt: 'Social share image 2' },
  { src: '/img/social/social-image-3.jpg', alt: 'Social share image 3' },
  { src: '/img/social/social-image-4.jpg', alt: 'Social share image 4' },
  { src: '/img/social/social-image-5.jpg', alt: 'Social share image 5' },
  { src: '/img/social/social-image-6.jpg', alt: 'Social share image 6' },
];

export function SharePicGallerySlice({ slice_type }: Props) {
  return (
    <section data-slice-type={slice_type} aria-label="Shareable images gallery">
      <SimpleGrid cols={3}>
        {GALLERY_IMAGES.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} style={{ maxWidth: '100%' }} />
        ))}
      </SimpleGrid>
    </section>
  );
}
