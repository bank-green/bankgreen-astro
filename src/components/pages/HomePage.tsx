import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import { renderRichText } from "@lib/prismicHelpers";
import type { PrismicDocument, RichTextField } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function HomePage({ page }: Props) {
  const title = (page?.data?.title as string) || "Is your money being used to fund climate chaos?";
  const slices1 = page?.data?.slices1; // "As featured in" logos
  const description1 = page?.data?.description1 as RichTextField | undefined;
  const description2 = page?.data?.description2 as RichTextField | undefined;
  const description3 = page?.data?.description3 as RichTextField | undefined;
  const description4 = page?.data?.description4 as RichTextField | undefined;

  return (
    <PageContent>
      <article>
        {/* Hero section */}
        <section>
          <h1>{title}</h1>
          {/* Bank lookup form - will be a separate component */}
          <p>Check if your bank is funding fossil fuels</p>
        </section>

        {/* As Featured In */}
        <section>
          <h3>As featured in</h3>
          {slices1 && <SliceZone slices={slices1} />}

          <p>In association with</p>
          <a href="https://www.banktrack.org/" rel="noopener noreferrer" target="_blank">
            <img src="/img/logos/banktrack.svg" alt="BankTrack" />
          </a>
          <a href="/partners">See our partners</a>
        </section>

        {/* Why Bank.Green section */}
        <section>
          <h2>Why Bank.Green?</h2>
          {description1 && description1.length > 0 ? (
            renderRichText(description1)
          ) : (
            <p>
              The fight for a habitable planet is the fight for our lives. But while we look at ways to make our lives
              more sustainable, most of us are also funding environmental catastrophe.
            </p>
          )}
          {description2 && description2.length > 0 ? (
            renderRichText(description2)
          ) : (
            <p>
              During the 7 years following the Paris Agreement, the world's top 60 private-sector banks pumped $5.5
              trillion into fossil fuels.
            </p>
          )}
        </section>

        {/* Call to action section */}
        <section>
          {description3 && description3.length > 0 ? (
            renderRichText(description3)
          ) : (
            <p>
              We have the power to change our banking system because it will not change itself. Mass pressure from
              customers will force our banks to defund fossil fuels.
            </p>
          )}
          {description4 && description4.length > 0 ? (
            renderRichText(description4)
          ) : (
            <p>
              Bank.Green and our partners are leading a global reckoning with the world's most powerful driver of
              environmental destruction. But we need your help.
            </p>
          )}
        </section>

        {/* Lead gen form section */}
        <section>
          <h2>Start to Bank Green Today</h2>
          {/* LeadGen form - will be a separate component */}
        </section>
      </article>
    </PageContent>
  );
}
