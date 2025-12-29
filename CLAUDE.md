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

**Architecture**:
- The root `<Layout>` component in `BaseLayout.astro` uses `client:load` and provides the main React tree
- **Page components use `client:load`**: All page components (HomePage, FaqPage, SwitchSurveyPage, etc.) are React components that use `client:load` directive when rendered in `.astro` files
- Page components can import from barrel exports (`@components/pages`) or direct imports - both patterns work
- Only truly interactive sub-components (forms, modals, dialogs) that need their own islands require separate `client:*` directives

**Rule**: Page components passed through BaseLayout slots should use `client:load`. Standalone interactive islands (dialogs, banners) also use `client:load` with their own MantineProvider.

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

```astro
---
// src/pages/my-page.astro
import BaseLayout from "@layouts/BaseLayout.astro";
import { MyPage } from "@components/pages/MyPage";
import { getSingleSafe } from "@lib/prismic";

const page = await getSingleSafe("mypage");
---

<BaseLayout title="My Page Title">
  <MyPage page={page} client:load />
</BaseLayout>
```

```tsx
// src/components/pages/MyPage.tsx
import { PageContent } from "@components/PageContent";
import { Stack, Title, Text } from "@mantine/core";

export function MyPage({ page }) {
  return (
    <PageContent>
      <Stack className="gap-4">
        <Title order={1}>{page?.data?.title}</Title>
        <Text>Your content here...</Text>
      </Stack>
    </PageContent>
  );
}
```

**Important**: Page components like `<MyPage>` should use `client:load` directive. They can be imported from barrel exports (`@components/pages`) or direct imports (`@components/pages/MyPage`).

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

Static output mode - deploys to Vercel, Netlify, or Cloudflare Pages with zero configuration.
