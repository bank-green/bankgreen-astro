import { PageContent } from "@components/PageContent";

export function NotFoundPage() {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Page Not Found</h1>
        </header>

        <section>
          <p>Sorry, we couldn't find the page you're looking for.</p>
          <a href="/">Return to homepage</a>
        </section>
      </article>
    </PageContent>
  );
}
