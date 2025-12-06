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
├── components/       # React components (islands)
│   ├── ContactForm.tsx
│   └── MantineWrapper.tsx
├── layouts/          # Astro layout components
│   └── BaseLayout.astro
├── lib/              # Utilities and client setup
│   ├── graphql.ts    # Django GraphQL client
│   └── prismic.ts    # Prismic CMS client
├── pages/            # File-based routing
│   ├── index.astro
│   ├── about.astro
│   └── contact.astro
└── styles/
    └── global.css    # Global styles and Tailwind
```

## Architecture Notes

### Astro + React Islands

Most pages are static Astro components that render to HTML at build time. For interactive elements (forms, filtering, etc.), we use React components with Astro's `client:*` directives:

```astro
---
import { MyInteractiveComponent } from "../components/MyInteractiveComponent";
---

<!-- Static content here -->

<!-- Interactive React island -->
<MyInteractiveComponent client:load />
```

Client directives:
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

**Mantine 8** splits its styles into separate imports for better tree-shaking. The `MantineWrapper` component handles this.

We use both styling systems for different purposes:
- **Mantine**: UI components in React islands (buttons, inputs, modals, etc.)
- **Tailwind**: Layout, spacing, and styling for static Astro content

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

New volunteers: Start by reading through the `src/pages/` directory to understand the page structure, then look at `src/components/` for examples of React islands.
