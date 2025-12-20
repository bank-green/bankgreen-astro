import { PageContent } from '@components/PageContent'
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
      <article className="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl">
        {/* Certification badge */}
        {certificationImg?.url ? (
          <img src={certificationImg.url} alt="Fossil-free certified badge" className="h-48 w-48" />
        ) : (
          <img
            src="/img/certification/fossil-free-certified.png"
            alt="Fossil-free certified badge"
            className="h-48 w-48"
          />
        )}

        {/* Main content from Prismic slices */}
        {slices ? (
          <SliceZone slices={slices} />
        ) : (
          <>
            <h1>Fossil Free Certification</h1>
            <p>
              Financial institutions that are Fossil Free Certified have pledged not to finance new
              fossil fuel companies or projects, and the majority already do not do so. Fossil Free
              Certification is the simplest, most straightforward way to signal to customers,
              professionals in the banking sector, and the general public that a
              sustainability-conscious financial institution is truly putting its money where its
              mouth is.
            </p>
          </>
        )}
      </article>
    </PageContent>
  )
}
