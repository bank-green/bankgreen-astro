import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import { renderRichText } from "@lib/prismicHelpers";
import type { PrismicDocument } from "@prismicio/client";
import { useState } from "react";

interface Props {
  page: PrismicDocument | null;
}

export function SustainableBanksPage({ page }: Props) {
  const slices = page?.data?.slices;
  const slices1 = page?.data?.slices1;
  const slices2 = page?.data?.slices2;
  const introductory = page?.data?.introductory;
  const footerBanner = page?.data?.footerBanner;

  const [readMoreP1, setReadMoreP1] = useState(false);
  const [readMoreP2, setReadMoreP2] = useState(false);

  return (
    <PageContent>
      <article>
        {/* Main intro content from Prismic slices */}
        {slices && (
          <section>
            <SliceZone slices={slices} />
          </section>
        )}

        <section>
          <h2>Bank Directory</h2>
          {/* Bank directory with filtering - will be a separate component */}
          {/* This will include:
              - LocationSearch for country selection
              - EcoBankFilters for filtering
              - EcoBankCards to display results
              - slices2 shown when no results/error
          */}
        </section>

        {/* Introductory section (Why Find a Green Bank? + What is the Fossil Free Alliance?) */}
        {introductory && introductory.length > 0 && (
          <section>
            {/* Why Find a Green Bank? - First item in introductory */}
            {introductory[0]?.primary?.text && (
              <div>
                <div className={readMoreP1 ? "" : "line-clamp-6"}>
                  {renderRichText(introductory[0].primary.text)}
                </div>
                <button onClick={() => setReadMoreP1(!readMoreP1)}>
                  {readMoreP1 ? "Read less" : "Read more"}
                </button>
              </div>
            )}

            {/* What is the Fossil Free Alliance? - Rest of introductory items */}
            {introductory.length > 1 && (
              <div>
                <div className={readMoreP2 ? "" : "line-clamp-6"}>
                  <SliceZone slices={introductory.slice(1)} />
                </div>
                <button onClick={() => setReadMoreP2(!readMoreP2)}>
                  {readMoreP2 ? "Read less" : "Read more"}
                </button>
              </div>
            )}
          </section>
        )}

        {/* FAQ section */}
        {slices1 && slices1.length > 0 && (
          <section>
            <SliceZone slices={slices1} />
          </section>
        )}

        {/* Footer banner - Happy banking stories */}
        {footerBanner && footerBanner.length > 0 && (
          <section>
            <SliceZone slices={footerBanner} />
          </section>
        )}
      </article>
    </PageContent>
  );
}
