import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import type { ImageField, PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'

interface Props {
  page: PrismicDocument | null
}

export function DonatePage({ page }: Props) {
  const photo = page?.data?.photo as ImageField | undefined
  const title = page?.data?.title as RichTextField | undefined
  const description = page?.data?.description as RichTextField | undefined
  const donationTitle = page?.data?.donation_title as RichTextField | undefined
  const donationDescription = page?.data?.donation_description as RichTextField | undefined

  const titleText = title ? prismic.asText(title) : 'Help us build a greener future!'
  const donationTitleText = donationTitle ? prismic.asText(donationTitle) : 'Donate to Bank.Green'

  return (
    <PageContent>
      <article>
        <section>
          {photo?.url && <img src={photo.url} alt="donation" />}

          <h2>{titleText}</h2>

          {description && description.length > 0 ? (
            renderRichText(description)
          ) : (
            <>
              <p>
                By supporting Bank.Green's mission, you'll empower individuals and businesses to
                make responsible financial decisions, channeling their deposits towards green
                financial institutions. Bank.Green is a project of a registered charity and all U.S.
                donations are tax-deductible.
              </p>
              <p>
                Your donation will help us raise awareness, provide resources, and foster a global
                community dedicated to protecting our planet.
              </p>
              <p>
                <em>
                  Bank.Green is a project of a registered charity and all U.S. donations are
                  tax-deductible.
                </em>
              </p>
            </>
          )}
        </section>

        <section>
          <h1>{donationTitleText}</h1>

          {donationDescription && donationDescription.length > 0 ? (
            renderRichText(donationDescription)
          ) : (
            <p>
              ...and make a big difference in the world. Your donation will give us greater capacity
              to green the banking sector and protect our collective future.
            </p>
          )}

          {/* Raisely donation widget will be embedded here */}
          <div
            className="raisely-donate"
            data-campaign-path="bankgreen-donate"
            data-profile=""
            data-width="100%"
            data-height="800"
          />
        </section>
      </article>
    </PageContent>
  )
}
