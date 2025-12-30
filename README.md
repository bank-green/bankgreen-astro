# Bank.Green Astro Frontend

A content-focused frontend built with Astro, React, Mantine, and Tailwind CSS. Deployed to Cloudflare Workers with hybrid rendering.

## Tech Stack

- **[Astro 5.x](https://astro.build/)** - Hybrid SSR/static site generator with islands architecture
- **[React 19](https://react.dev/)** - For interactive components (islands)
- **[Mantine 8](https://mantine.dev/)** - UI component library for React islands
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS via Vite plugin
- **[Biome](https://biomejs.dev/)** - Linting and formatting
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Edge deployment with on-demand SSR

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

The site will be available at `http://localhost:4321`.

### Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start development server                 |
| `pnpm build`     | Build for production                     |
| `pnpm preview`   | Preview production build locally         |
| `pnpm check`     | Run Astro check and Biome linting        |
| `pnpm lint`      | Run Biome linter                         |
| `pnpm lint:fix`  | Fix linting issues                       |
| `pnpm format`    | Format code with Biome                   |

## Project Structure

```
src/
├── components/         # React components
│   ├── pages/          # Page components (HomePage, FaqPage, etc.)
│   ├── Layout.tsx      # Root layout with MantineProvider
│   ├── PageContent.tsx # Page content wrapper with MantineProvider
│   ├── Header.tsx      # Site header
│   ├── Footer.tsx      # Site footer
│   └── ContactForm.tsx # Example interactive form
├── layouts/            # Astro layout components
│   └── BaseLayout.astro
├── lib/                # Utilities and client setup
│   ├── graphql.ts      # Django GraphQL client
│   └── prismic.ts      # Prismic CMS client
├── pages/              # File-based routing
│   ├── index.astro
│   ├── faq.astro
│   └── contact.astro
└── styles/
    ├── global.css      # Global styles and Tailwind config
    └── theme.ts        # Mantine theme configuration
```

## Architecture Notes

### Astro Islands + Hybrid Rendering

The app uses Astro's **hybrid rendering** approach with React islands for interactivity:

**Rendering Modes**:
- **Static pages** (`export const prerender = true`): Pre-rendered at build time as static HTML
- **Dynamic pages**: Rendered on-demand by Cloudflare Workers

**Page Architecture**:
1. **Root Layout**: `BaseLayout.astro` renders `<Layout client:load>` with header/footer
2. **Static Content Pages**: Use no `client:*` directive - rendered as pure HTML (blog posts, methodology, glossary)
3. **Interactive Pages**: Use `client:load` when they need client-side state (forms, accordions)
4. **Standalone Islands**: `GdprBanner` and `ExitIntentDialog` have their own MantineProvider and manage state via nanostores

**Client Directives** (use sparingly):
- `client:load` - Hydrate immediately (for interactive pages, header/footer)
- `client:idle` - Hydrate when browser is idle (for non-critical components like exit intent dialogs)
- `client:visible` - Hydrate when component enters viewport
- No directive - Renders as static HTML with zero JavaScript

**Example static content page**:

```astro
---
// src/pages/my-page.astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { SlicePage } from "@components/pages";
import { getSingleSafe } from "@lib/prismic";

export const prerender = true  // Pre-render at build time

const page = await getSingleSafe("mypage");
---

<BaseLayout title="My Page">
  <SlicePage title="My Page" page={page} />  <!-- No client:* = pure HTML -->
</BaseLayout>
```

**Example interactive page**:

```astro
---
// src/pages/my-form.astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { MyFormPage } from "@components/pages/MyFormPage";
import { getSingleSafe } from "@lib/prismic";

const page = await getSingleSafe("myformpage");
---

<BaseLayout title="My Form">
  <MyFormPage page={page} client:load />  <!-- client:load for interactivity -->
</BaseLayout>
```

```tsx
// src/components/pages/MyFormPage.tsx
import { PageContent } from "@components/PageContent";
import { Stack, TextInput, Button } from "@mantine/core";
import { useState } from "react";

export function MyFormPage({ page }) {
  const [value, setValue] = useState("");

  return (
    <PageContent>
      <Stack className="gap-4">
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        <Button>Submit</Button>
      </Stack>
    </PageContent>
  );
}
```

### Tailwind CSS 4 + Mantine 8

**Tailwind 4** uses CSS-first configuration. Instead of a `tailwind.config.js` file, customization happens in your CSS with `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.72 0.12 260);
  --breakpoint-3xl: 120rem;
}
```

**Mantine 8** provides the UI component library with a two-tier MantineProvider architecture:

1. **Layout** component: Provides MantineProvider for AppShell, navigation, header, footer
2. **PageContent** component: Provides MantineProvider for page content

This dual-provider setup ensures Mantine context is available during SSR despite Astro slot limitations.

We use both styling systems:
- **Mantine**: UI components (Button, TextInput, AppShell, Paper, etc.)
- **Tailwind**: Layout, spacing, and utility classes

### Data Sources

**Prismic CMS** (content management):
- Client configured in `src/lib/prismic.ts` with safe wrapper functions
- Use `getSingleSafe()` for singleton documents (e.g., `getSingleSafe('homepage')`)
- Use `getByUIDSafe()` for documents with UIDs (e.g., `getByUIDSafe('textonlypages', 'privacy')`)
- Use `getAllByTypeSafe()` for collections (e.g., `getAllByTypeSafe('blogpost')`)
- All functions return `null` on error instead of throwing

**Django GraphQL** (dynamic data):
- Use `graphqlFetch()` from `src/lib/graphql.ts`
- Endpoint configured via `PUBLIC_GRAPHQL_ENDPOINT` env variable
- Fetch at build time in `.astro` files for static pages

## Deployment

**Cloudflare Workers** with hybrid rendering:
- `output: 'server'` in `astro.config.mjs` with `@astrojs/cloudflare` adapter
- Pages with `export const prerender = true` are built as static HTML at build time
- Server-rendered pages render on-demand via Workers
- Static assets served from Cloudflare's edge CDN

**Prerendered pages** (static HTML, fastest):
- Blog posts, press releases (`/blog/*`, `/press/*`)
- Sustainable eco-banks (`/sustainable-eco-banks/*`) - uses `getStaticPaths()` to prerender known banks
- Content pages: methodology, glossary, privacy, disclaimer, materials, one-pager, green-banking-guide
- Thank you pages (`/thanks/*`)
- 404 page

**Server-rendered pages** (on-demand via SSR):
- Bank profiles (`/banks/*`) - full SSR to support all banks in the GraphQL database
- Any page without `export const prerender = true`

**Why bank profiles use full SSR**:
Astro's prerendering with `getStaticPaths()` only serves routes returned at build time - other routes return 404. Since new banks can be added to the GraphQL database at any time, `/banks/*` uses full SSR so every bank route works without requiring a rebuild.

**Branch previews**: Automatically deployed via Cloudflare Pages

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm check` to ensure no issues
4. Submit a pull request

**For new volunteers**:
- Start by reading through `src/pages/` to understand the page structure
- Look at `src/components/pages/` for examples of page components
- See [CLAUDE.md](CLAUDE.md) for detailed architecture patterns and code examples
- Key patterns:
  - Static content pages: Add `export const prerender = true` and don't use `client:*` directives
  - Interactive pages: Use `client:load` for pages with forms, accordions, or client state
  - Prismic content: Use `getSingleSafe()`, `getByUIDSafe()`, or `getAllByTypeSafe()` in `.astro` files
