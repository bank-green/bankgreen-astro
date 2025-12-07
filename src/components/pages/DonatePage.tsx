import { PageContent } from "@components/PageContent";

export function DonatePage() {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Donate Now!</h1>
        </header>

        <section>
          <p>Your donation helps us continue our mission to defund fossil fuels.</p>
          <p>Bank.Green is a project of Empowerment Works Inc., a 501(c)(3) nonprofit. Your donation may be tax-deductible.</p>
        </section>

        <section>
          {/* Donation form/widget will be embedded here */}
        </section>
      </article>
    </PageContent>
  );
}
