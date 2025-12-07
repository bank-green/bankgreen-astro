# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5.2+ frontend using React 19 islands architecture with Mantine 8 UI components and Tailwind CSS 4. Built for bank.green, a volunteer-run organization.

**Package Manager**: pnpm 9+ (required)
**Node Version**: 20+ (required)

## Essential Commands

```bash
# Development
pnpm dev                 # Start dev server at http://localhost:4321
pnpm build              # Production build
pnpm preview            # Preview production build

# Code Quality
pnpm check              # Run Astro check + Biome linting (pre-commit)
pnpm lint               # Biome linting only
pnpm lint:fix           # Auto-fix linting issues
pnpm format             # Format with Biome

# Setup
pnpm install            # Install dependencies
cp .env.example .env    # Configure environment
```

## Architecture

### Astro Islands Pattern

Pages are static Astro components (`.astro`) that render to HTML at build time. Interactive elements use React islands with `client:*` directives:

- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when browser idle
- `client:visible` - Hydrate when component enters viewport

**Rule**: Prefer static Astro components. Only use React islands for truly interactive UI (forms, filtering, modals).

### Dual Styling System

**Tailwind CSS 4** (for static Astro content):
- CSS-first configuration via `@theme` in `src/styles/global.css`
- No `tailwind.config.js` file
- Use for layout, spacing, and static styling

**Mantine 8** (for React islands):
- UI component library (buttons, inputs, modals, etc.)
- Must wrap components with `<MantineWrapper>` from `src/components/MantineWrapper.tsx`
- Styles split into separate imports for tree-shaking

### Data Fetching

**GraphQL (Django backend)**:
- Use `graphqlFetch()` from `src/lib/graphql.ts` in Astro pages
- Endpoint: `PUBLIC_GRAPHQL_ENDPOINT` env variable (defaults to `http://localhost:8000/graphql`)
- Fetch at build time in `.astro` files, not in React islands

**Prismic CMS** (not yet configured):
- Placeholder client in `src/lib/prismic.ts`
- Requires packages: `@prismicio/client @prismicio/richtext`

## Code Style

**Biome Configuration** (`biome.json`):
- Double quotes, semicolons required
- 2-space indentation, 100-character line width
- Unused imports/variables are warnings
- `noNonNullAssertion` disabled, `noExplicitAny` is warning

**TypeScript**:
- Path aliases: `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@lib/*`
- Strict mode enabled (extends `astro/tsconfigs/strict`)
- JSX mode: `react-jsx`

## File Organization

```
src/
├── components/     # React islands (*.tsx)
├── layouts/        # Astro layouts (*.astro)
├── lib/            # Utilities and API clients
├── pages/          # File-based routing (*.astro)
└── styles/         # Global CSS and Tailwind config
```

**Adding a new page**: Create `src/pages/your-page.astro` (becomes `/your-page`)
**Adding a React island**: Create in `src/components/`, import with `client:*` directive
**Adding utilities**: Place in `src/lib/`

## Key Patterns

### Using React Islands

```astro
---
import { MyComponent } from "@components/MyComponent";
---

<!-- Static content here -->

<!-- Interactive React island -->
<MyComponent client:idle />
```

### Using Mantine Components

```tsx
import { Button } from "@mantine/core";
import { MantineWrapper } from "@components/MantineWrapper";

export function MyInteractiveForm() {
  return (
    <MantineWrapper client:load>
      <Button>Click me</Button>
    </MantineWrapper>
  );
}
```

### GraphQL Queries

```astro
---
import { graphqlFetch } from "@lib/graphql";

interface Data {
  items: Array<{ id: string; name: string }>;
}

const data = await graphqlFetch<Data>(`
  query GetItems {
    items { id name }
  }
`);
---

{data.items.map(item => <div>{item.name}</div>)}
```

## Environment Variables

Copy `.env.example` to `.env`. Variables prefixed with `PUBLIC_` are available client-side.

## Deployment

Static output mode - deploys to Vercel, Netlify, or Cloudflare Pages with zero configuration.
