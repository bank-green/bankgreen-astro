import { PageContent } from "@components/PageContent";
import { renderRichText } from "@lib/prismicHelpers";
import type { PrismicDocument, RichTextField } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function ContactPage({ page }: Props) {
  const description = page?.data?.description as RichTextField | undefined;

  return (
    <PageContent>
      <article>
        <header>
          {description && description.length > 0 ? (
            renderRichText(description)
          ) : (
            <>
              <h1>Contact us</h1>
              <p>
                Unfortunately we are not currently accepting requests to research new banks, but we encourage you to{" "}
                <a href="/take-action">reach out to your own bank</a> to establish whether or not they are financing
                fossil fuels. <a href="/volunteers">You can also volunteer</a> 😄
              </p>
            </>
          )}
        </header>

        <section>
          {/* Contact form - will be implemented as a separate component */}
          <form>
            <div>
              <label htmlFor="firstName">Your first name (optional)</label>
              <input type="text" id="firstName" name="firstName" placeholder="First name, so we can say hi" />
            </div>

            <div>
              <label htmlFor="email">Your email address</label>
              <input type="email" id="email" name="email" placeholder="Your email address" required />
            </div>

            <div>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" required />
            </div>

            <div>
              <label htmlFor="message">Your message</label>
              <textarea id="message" name="message" placeholder="Your message" rows={3} required />
            </div>

            <div>
              <label>
                <input type="checkbox" name="isAgreeMarketing" />I wish to receive more information via email from
                Bank.Green.
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" name="isAgreeTerms" required />I have read and understood Bank.Green's{" "}
                <a href="/privacy">privacy policy</a>.
              </label>
            </div>

            <button type="submit">Send message</button>
          </form>
        </section>
      </article>
    </PageContent>
  );
}
