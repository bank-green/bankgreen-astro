# Astro Frontend

A content-focused frontend built with Astro, React, Mantine, and Tailwind CSS.

## Tech Stack

- **[Astro 5.2+](https://astro.build/)** - Static site generator with islands architecture
- **[React 19](https://react.dev/)** - For interactive components (islands)
- **[Mantine 8](https://mantine.dev/)** - UI component library for React islands
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS via Vite plugin
- **[Biome](https://biomejs.dev/)** - Linting and formatting

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

### Astro + React Islands

The app uses a single-island architecture:

1. **Root Layout Island**: `BaseLayout.astro` renders `<Layout client:load>`, creating the main React tree with MantineProvider
2. **Page Components**: Passed as children through Astro slots (no `client:*` directives needed)
3. **Interactive Sub-Components**: Only truly interactive pieces (forms, modals) get `client:*` directives

**Example page structure**:

```astro
---
// src/pages/my-page.astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { MyPage } from "@components/pages/MyPage";

const page = await getSingleSafe("mypage");
---

<BaseLayout title="My Page">
  <MyPage page={page} />  <!-- No client:* needed! -->
</BaseLayout>
```

```tsx
// src/components/pages/MyPage.tsx
import { PageContent } from "@components/PageContent";

export function MyPage({ page }) {
  return (
    <PageContent>
      <h1>{page?.data?.title}</h1>
      <p>Content here...</p>
    </PageContent>
  );
}
```

**Available client directives** (use sparingly):
- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when browser is idle
- `client:visible` - Hydrate when component enters viewport

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

- **Prismic CMS**: Content management (see `src/lib/prismic.ts`)
- **Django GraphQL**: Dynamic data from backend (see `src/lib/graphql.ts`)

## Deployment

This site builds to static files and can be deployed anywhere:

- **Vercel**: Auto-detects Astro, zero config
- **Netlify**: Auto-detects Astro, zero config
- **Cloudflare Pages**: Use the Astro preset

All platforms support branch preview deployments out of the box.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm check` to ensure no issues
4. Submit a pull request

**For new volunteers**:
- Start by reading through `src/pages/` to understand the page structure
- Look at `src/components/pages/` for examples of page components
- See `CLAUDE.md` for detailed architecture patterns and code examples
- Remember: page components don't need `client:*` directives - they're rendered within the Layout island
