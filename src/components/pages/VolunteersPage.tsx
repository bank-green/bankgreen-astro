import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function VolunteersPage({ page }: Props) {
  const slices = page?.data?.slices

  return (
    <PageContent>
      <article className="prose mx-auto max-w-4xl prose-h1:text-center prose-h1:font-semibold">
        {slices ? (
          <SliceZone slices={slices} />
        ) : (
          <>
            <h1>Volunteering with Bank.Green</h1>
            <p>
              Although we are beginning to fundraise, we are still currently led by volunteers! If
              you would like to extend your climate impact beyond talking to your bank or switching
              to a greener alternative, we would love for you to join our team!
            </p>
            <p>
              Please do reach out to{' '}
              <a href="mailto:volunteers@bank.green">volunteers@bank.green</a>, attaching a copy of
              your C.V. and letting us know about your availability! We are still a small team and
              receive a lot of enquiries, but we will do our best to get back to you, even if we
              feel it may not be the best fit.
            </p>
          </>
        )}
      </article>
    </PageContent>
  )
}
