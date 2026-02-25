# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5.x frontend using React 19 islands architecture with Mantine 8 UI components and Tailwind CSS 4. Built for bank.green, a volunteer-run organization.

**Package Manager**: pnpm 9+ (required)
**Node Version**: 20+ (required)
**Deployment**: Cloudflare Workers (server mode with selective prerendering)

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

Pages are Astro components (`.astro`) with React islands for interactivity. The site uses **hybrid rendering**:

- **Static pages** (`export const prerender = true`): Pre-rendered at build time as static HTML
- **Dynamic pages**: Rendered on-demand by Cloudflare Workers

**Client Directives**:
- `client:load` - Hydrate immediately (for interactive pages, header/footer)
- `client:idle` - Hydrate when browser is idle (for non-critical components like exit intent dialogs)
- `client:visible` - Hydrate when component enters viewport
- No directive - Renders as static HTML with zero JavaScript

**Architecture**:
- The root `<Layout>` component in `BaseLayout.astro` uses `client:load` and provides header/footer
- **Static content pages**: Use no `client:*` directive - rendered as pure HTML (e.g., blog posts, methodology, glossary)
- **Interactive pages**: Use `client:load` when they need client-side state (e.g., forms, accordions)
- **Standalone islands**: `GdprBanner` and `ExitIntentDialog` have their own MantineProvider and manage state via nanostores

**When to use `client:load`**:
- Pages with forms, accordions, or user interaction
- Components that manage client-side state

**When to skip `client:*` directive**:
- Pure content pages (blog posts, press releases, static info pages)
- Components that just display data without interaction

### Dual Styling System

**Tailwind CSS 4** (for static Astro content):
- CSS-first configuration via `@theme` in `src/styles/global.css`
- No `tailwind.config.js` file
- Use for layout, spacing, and static styling

**Mantine 8** (for React components):
- UI component library (buttons, inputs, modals, AppShell layout, etc.)
- Two-tier MantineProvider architecture:
  - `Layout` component has MantineProvider for AppShell, Burger, Header, Footer
  - `PageContent` component has MantineProvider for page content (Paper wrapper)
  - This ensures Mantine context is available during SSR despite Astro slot limitations
- Styles split into separate imports for tree-shaking

**CRITICAL: Mantine + Tailwind Styling Rules**:
1. **Always use Mantine components for semantic structure** - Never use raw HTML elements (`<div>`, `<p>`, `<ul>`, `<input>`, `<button>`) in React components
2. **Style Mantine components exclusively with Tailwind via className** - Do NOT use Mantine style props (`mb=`, `mt=`, `p=`, `ta=`, `size=`, etc.)
3. **Use Stack/Group for layouts** - Replace `<div className="flex">` with `<Stack>` or `<Group>` + Tailwind classes
4. **No inline styles** - Use Tailwind arbitrary values instead (e.g., `max-w-[40rem]` or canonical `max-w-160`)
5. **Avoid redundant Tailwind classes** - Don't add classes that duplicate Mantine's defaults:
   - `<Group>` is already `flex` (row) - don't add `flex` class
   - `<Stack>` is already `flex flex-col` - don't add `flex flex-col` classes
   - `<Title order={1-6}>` already has semantic h1-h6 sizing/weight - don't override with `text-*` or `font-*` classes unless intentionally deviating from semantic HTML
6. **Component mapping**:
   - `<h1>` through `<h6>` → `<Title order={1-6} className="...">` (preserves semantic HTML, only add color/spacing classes)
   - `<p>` → `<Text className="...">`
   - `<ul>/<li>` → `<List><List.Item>` with custom icons via `icon` prop
   - `<input>` → `<TextInput className="...">`
   - `<button>` → `<Button className="...">`
   - `<div>` (containers) → `<Paper>`, `<Stack>`, or `<Group className="...">`
   - `<div className="flex">` → `<Group className="...">`
   - `<div className="flex flex-col">` → `<Stack className="...">`

**Example - CORRECT**:
```tsx
import { Button, Group, List, Paper, Stack, Text, TextInput, ThemeIcon, Title } from '@mantine/core'
import { CheckCircleIcon } from '@phosphor-icons/react'

<Stack className="gap-4">
  <Title order={2} className="mb-4 text-center text-gray-100">Page Title</Title>
  <Text className="text-lg text-center">Sign up now</Text>
  <Paper className="p-6 rounded-lg bg-white shadow-sm">
    <Group className="gap-2">
      <TextInput className="flex-1" placeholder="Email" />
      <Button className="bg-sushi-500 hover:bg-sushi-600">Submit</Button>
    </Group>
  </Paper>
  <List icon={<ThemeIcon color="green" size={24} radius="xl"><CheckCircleIcon size={16} weight="fill" /></ThemeIcon>}>
    <List.Item>Feature one</List.Item>
    <List.Item>Feature two</List.Item>
  </List>
</Stack>
```

**Example - WRONG**:
```tsx
// ❌ Don't use Mantine props for styling
<Text size="lg" ta="center" mb="md">Sign up now</Text>
<Button type="submit" color="green">Submit</Button>
<Title order={2} mb="lg">Title</Title>

// ❌ Don't use raw HTML elements
<h2 className="text-2xl font-bold">Title</h2>
<p className="text-lg">Sign up now</p>
<button className="bg-green-500">Submit</button>
<div className="flex gap-2">...</div>

// ❌ Don't use inline styles
<form style={{ maxWidth: '40rem' }}>...</form>

// ❌ Don't use redundant classes that duplicate Mantine defaults
<Group className="flex gap-2">...</Group>  // "flex" is redundant
<Stack className="flex flex-col gap-4">...</Stack>  // "flex flex-col" is redundant
<Title order={2} className="text-2xl font-semibold">Title</Title>  // size/weight overrides semantic h2
<Title order={1} className="text-3xl font-bold">Big Title</Title>  // overrides semantic h1
```

### Data Fetching

**GraphQL (Django backend)**:
- Use `graphqlFetch()` from `src/lib/graphql.ts` in Astro pages
- Endpoint: `PUBLIC_GRAPHQL_ENDPOINT` env variable (defaults to `http://localhost:8000/graphql`)
- Fetch at build time in `.astro` files, not in React islands

**Prismic CMS**:
- Client configured in `src/lib/prismic.ts` with safe wrapper functions
- Use `getSingleSafe()`, `getByUIDSafe()`, `getAllByTypeSafe()` - return null on error
- Rich text rendering: `renderRichText()` in `src/lib/prismicHelpers.tsx`
- Slices system in `src/slices/` for modular content blocks

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

**Icons**:
- **ALWAYS use Phosphor Icons** (`@phosphor-icons/react`) - NOT Tabler or other icon libraries
- Import pattern: `import { IconNameIcon } from '@phosphor-icons/react'` (note the `Icon` suffix)
- Example: `<CheckCircleIcon size={16} weight="fill" />`
- Common icons: `CheckCircleIcon`, `BankIcon`, `MapPinSimpleIcon`, `WarningIcon`

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

### Creating a New Page

**Static content page** (no interactivity):
```astro
---
// src/pages/my-page.astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { SlicePage } from "@components/pages";
import { getSingleSafe } from "@lib/prismic";

export const prerender = true  // Pre-render at build time

const page = await getSingleSafe("mypage");
---

<BaseLayout title="My Page Title">
  <SlicePage title="My Page" page={page} />
</BaseLayout>
```

**Interactive page** (forms, state, etc.):
```astro
---
// src/pages/my-form.astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { MyFormPage } from "@components/pages/MyFormPage";
import { getSingleSafe } from "@lib/prismic";

const page = await getSingleSafe("myformpage");
---

<BaseLayout title="My Form">
  <MyFormPage page={page} client:load />
</BaseLayout>
```

```tsx
// src/components/pages/MyFormPage.tsx
import { PageContent } from "@components/PageContent";
import { Stack, Title, TextInput, Button } from "@mantine/core";
import { useState } from "react";

export function MyFormPage({ page }) {
  const [value, setValue] = useState("");

  return (
    <PageContent>
      <Stack className="gap-4">
        <Title order={1}>{page?.data?.title}</Title>
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        <Button>Submit</Button>
      </Stack>
    </PageContent>
  );
}
```

**Dynamic route with prerendering** (blog posts, etc.):
```astro
---
// src/pages/posts/[slug].astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { PostPage } from "@components/pages";
import { getAllByTypeSafe, getByUIDSafe } from "@lib/prismic";

export const prerender = true

export async function getStaticPaths() {
  const posts = await getAllByTypeSafe("post");
  return posts.map((post) => ({ params: { slug: post.uid } }));
}

const { slug } = Astro.params;
const post = await getByUIDSafe("post", slug);
---

<BaseLayout title={post?.data?.title || "Post"}>
  <PostPage post={post} />
</BaseLayout>
```

### Using Mantine Components in Pages

```tsx
import { Button, Stack, Title } from "@mantine/core";
import { PageContent } from "@components/PageContent";

export function MyPage() {
  return (
    <PageContent>
      <Stack className="gap-4">
        <Title order={1} className="mb-6 text-gray-900">My Page</Title>
        <Button className="bg-sushi-500 hover:bg-sushi-600">Click me</Button>
      </Stack>
    </PageContent>
  );
}
```

No need to import MantineProvider - `PageContent` provides it automatically.

**Note**:
- Always style Mantine components with Tailwind classes via `className`, not Mantine props
- Title components use their semantic `order` prop for h1-h6 sizing - only add color/spacing classes

### Adding Interactive Islands

Only use `client:*` directives for truly interactive components:

```tsx
// src/components/InteractiveForm.tsx
import { useState } from "react";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";

export function InteractiveForm() {
  const [value, setValue] = useState("");

  return (
    <MantineProvider theme={theme}>
      <Stack className="gap-4">
        <TextInput
          className="w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text"
        />
        <Button type="submit" className="bg-sushi-500 hover:bg-sushi-600">
          Submit
        </Button>
      </Stack>
    </MantineProvider>
  );
}
```

```astro
---
import { InteractiveForm } from "@components/InteractiveForm";
---

<InteractiveForm client:load />
```

**Note**: Interactive islands need their own MantineProvider wrapper. Style all components with Tailwind classes.

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

**Cloudflare Workers** with hybrid rendering:
- `output: 'server'` in `astro.config.mjs` with `@astrojs/cloudflare` adapter
- Pages with `export const prerender = true` are built as static HTML at build time
- Server-rendered pages render on-demand via Workers
- Static assets served from Cloudflare's edge CDN

**Prerendered pages** (static HTML, fastest):
- Blog posts, press releases (`/blog/*`, `/press/*`)
- Sustainable eco-banks (`/sustainable-eco-banks/*`) - uses `getStaticPaths()` to prerender known banks
- Content pages: methodology, glossary, privacy, disclaimer, materials, one-pager
- Thank you pages (`/thanks/*`)
- 404 page

**Server-rendered pages** (on-demand via SSR):
- Bank profiles (`/banks/*`) - full SSR to support all banks in the GraphQL database
- Any page without `export const prerender = true`

**Why bank profiles use full SSR**:
Astro's prerendering with `getStaticPaths()` only serves routes returned at build time - other routes return 404. Since new banks can be added to the GraphQL database at any time, `/banks/*` uses full SSR so every bank route works without requiring a rebuild. Hybrid prerender + SSR fallback is not supported by Astro.

## SEO

### BaseLayout SEO Props

`BaseLayout.astro` accepts these props for per-page SEO control:

```astro
<BaseLayout
  title="Page Title"
  description="Page description for meta and og:description"
  ogImage="https://bank.green/img/social/social-1664-971.jpg"
  ogImageWidth="1665"
  ogImageHeight="971"
  ogType="website"
  canonicalUrl="https://bank.green/blog/my-post"
  noindex={false}
>
```

- `title` — required; used for `<title>`, `og:title`, `twitter:title`, `apple-mobile-web-app-title`
- `description` — defaults to the standard Bank.Green tagline if omitted
- `ogImage` — defaults to `/img/social/social-1664-971.jpg`; pass a page-specific image URL to override
- `ogType` — defaults to `"website"`; use `"article"` for blog/press posts
- `canonicalUrl` — omit for pages without a stable URL; always set for blog posts
- `noindex` — set to `true` to emit `noindex, nofollow` robots meta

### Injecting Extra Head Tags

Use the named `head` slot to add page-specific `<head>` content that BaseLayout doesn't cover (e.g. article timestamps, JSON-LD, video meta):

```astro
<BaseLayout title={title} ogType="article" canonicalUrl={url}>
  <Fragment slot="head">
    <meta property="article:published_time" content={publishedDate} />
    <script type="application/ld+json" is:inline set:html={jsonLd} />
  </Fragment>
  <MyPage />
</BaseLayout>
```

### Prismic SEO Fields

Pages backed by Prismic should prefer `seo_title`, `seo_description`, and `seo_image` fields over display fields:

```astro
const title = page?.data?.seo_title || page?.data?.title || 'Fallback Title'
const description = page?.data?.seo_description || undefined
const ogImage = page?.data?.seo_image?.url || undefined
```

### Blog Posts

`src/pages/blog/[slug].astro` sets the full article SEO suite automatically:
- `og:type: article` with `article:published_time` / `article:modified_time`
- `og:image` from the post's `cardimage` Prismic field
- Canonical URL (`https://bank.green/blog/{slug}`)
- Twitter card labels (Written by / Published on)
- `robots` meta allowing rich snippets
- JSON-LD `NewsArticle` schema

### Bank Profile Pages

`src/pages/banks/[bankTag].astro` sets rating-specific media metadata:
- `og:image` → `/anim/gauge/{rating}.gif` (animated gauge)
- `og:video` / `twitter:player` → `/anim/gauge/{rating}.mp4`

## Sitemaps

Two sitemaps are declared in `public/robots.txt`:

| URL | Source | Content |
|-----|--------|---------|
| `/sitemap-index.xml` | `@astrojs/sitemap` (build-time) | All prerendered static pages |
| `/sitemap-banks.xml` | `src/pages/sitemap-banks.xml.ts` (SSR) | All `/banks/*` pages |

**Why two sitemaps?** `@astrojs/sitemap` only discovers URLs at build time by crawling pre-rendered output. `/banks/*` pages are fully SSR (no `getStaticPaths()`), so they are invisible to the build-time crawler and must be listed separately via a live endpoint.

`sitemap-banks.xml.ts` queries all brand tags from the GraphQL API on each request and returns a valid XML sitemap. It is cached for 1 hour via `Cache-Control`. If the GraphQL call fails it returns an empty (but valid) sitemap rather than a 500.
