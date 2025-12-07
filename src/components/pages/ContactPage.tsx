import { PageContent } from "@components/PageContent";

export function ContactPage() {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Contact Us</h1>
        </header>

        <section>
          <p>Please include your country when reaching out.</p>
          <p>Want to contact your bank directly? <a href="/take-action">See our guide</a>.</p>
          <p>Interested in volunteering? <a href="/volunteers">Check our open roles</a>.</p>
        </section>

        <section>
          {/* Contact form will be implemented as a separate component */}
          <form>
            <div>
              <label htmlFor="firstName">First name (optional)</label>
              <input type="text" id="firstName" name="firstName" />
            </div>

            <div>
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>

            <div>
              <label>
                <input type="checkbox" name="emailOptIn" />
                I wish to receive updates from Bank.Green
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" name="privacyAccept" required />
                I have read and accept the <a href="/privacy">privacy policy</a>
              </label>
            </div>

            <button type="submit">Send</button>
          </form>
        </section>
      </article>
    </PageContent>
  );
}
