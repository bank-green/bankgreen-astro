import { PageContent } from '@components/PageContent'
import { Box, Image, Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function CertificationPage({ page }: Props) {
  const certificationImg = page?.data?.certification_img
  const slices = (page?.data?.slices || []) as Slice[]

  return (
    <PageContent>
      <Box className="mx-auto rounded-2xl bg-white p-12">
        {/* Certification badge */}
        <Box className="mb-6 md:float-right md:ml-6">
          {certificationImg?.url ? (
            <Image
              src={certificationImg.url}
              alt="Fossil-free certified badge"
              className="h-48 w-48"
            />
          ) : (
            <Image
              src="/img/certification/fossil-free-certified.png"
              alt="Fossil-free certified badge"
              className="h-48 w-48"
            />
          )}
        </Box>
        {/* Main content from Prismic slices */}
        <Stack className="gap-6">{slices && <SliceZone slices={slices} />}</Stack>
      </Box>
    </PageContent>
  )
}
