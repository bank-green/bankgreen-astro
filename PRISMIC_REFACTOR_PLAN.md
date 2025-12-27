# Prismic Integration Refactoring Plan

## Overview

This plan refactors the Bank.Green Astro/React codebase to follow the patterns demonstrated in the `miles-of-code` example project. The goal is to create a more idiomatic Astro/Prismic integration by converting React slice components to Astro components and centralizing rich text rendering into reusable Astro utilities.

### Key Pattern Changes

| Aspect | Current Pattern | Target Pattern |
|--------|-----------------|----------------|
| Slice components | React (`.tsx`) | Astro (`.astro`) |
| Rich text rendering | `renderRichText()` in React | `<PrismicHtml>` and `<PrismicText>` Astro components |
| Slice zone | React `<SliceZone>` component | `<PrismicContent>` Astro component with switch/case |
| Client data access | Props passed to React components | Direct `await` in Astro frontmatter |
| Prismic client | `@prismicio/client` v7+ | `prismic-dom` for HTML rendering |

---

## Phase 1: Create Core Prismic Astro Components

### 1.1 Create `src/components/prismic/PrismicText.astro`

**Purpose**: Extracts plain text from Prismic RichText fields.

**Reference**: `miles-of-code/src/components/PrismicText.astro`

```astro
---
import PrismicDOM from 'prismic-dom';
const { content } = Astro.props;

const text = PrismicDOM.RichText.asText(content);
---

{text}
```

**Notes**:
- Install `prismic-dom` package: `npm install prismic-dom`
- This replaces uses of `asText()` from `@prismicio/client`

---

### 1.2 Create `src/components/prismic/PrismicHtml.astro`

**Purpose**: Renders Prismic RichText fields as HTML.

**Reference**: `miles-of-code/src/components/PrismicHtml.astro`

```astro
---
import PrismicDOM from 'prismic-dom';
const { content } = Astro.props;

const html = PrismicDOM.RichText.asHtml(content);
---

<Fragment set:html={html} />
```

**Notes**:
- Replaces `renderRichText()` from `prismicHelpers.tsx`
- Uses Astro's `set:html` directive for raw HTML output

---

### 1.3 Create `src/components/prismic/PrismicContent.astro`

**Purpose**: Renders an array of Prismic slices (slice zone).

**Reference**: `miles-of-code/src/components/PrismicContent.astro`

```astro
---
import PrismicDOM from 'prismic-dom';
// Import all slice components
import TextSlice from '../slices/TextSlice.astro';
import ImageSlice from '../slices/ImageSlice.astro';
import AccordionSlice from '../slices/AccordionSlice.astro';
// ... etc

const { content } = Astro.props;
---

{content.map(slice => {
    switch (slice.slice_type) {
        case 'text_slice': return <TextSlice {...slice} />;
        case 'image_slice': return <ImageSlice {...slice} />;
        case 'accordion_slice': return <AccordionSlice {...slice} />;
        // ... all other slice types
        default: return <div data-unknown-slice={slice.slice_type}>Unknown slice: {slice.slice_type}</div>;
    }
})}
```

**Notes**:
- Replaces the React `<SliceZone>` component
- Each case maps `slice_type` to an Astro component
- Props are spread directly (`{...slice}`) rather than wrapped in `slice` prop

---

### 1.4 Create `src/components/prismic/index.ts`

**Purpose**: Barrel export for easy imports.

```ts
// Re-export Prismic Astro components for easy imports
// Usage: import { PrismicContent, PrismicHtml, PrismicText } from '@components/prismic';
```

---

## Phase 2: Convert Slice Components to Astro

Convert each React slice component (`.tsx`) in `src/slices/` to an Astro component (`.astro`). Move them to `src/components/slices/`.

### 2.1 `TextSlice.astro`

**Current file**: `src/slices/TextSlice.tsx`
**New file**: `src/components/slices/TextSlice.astro`

**Current React implementation**:
```tsx
import { renderRichText } from '@lib/prismicHelpers'
import type { Content } from '@prismicio/client'

interface Props {
  slice: Content.TextSliceSlice
}

export function TextSlice({ slice }: Props) {
  return <section data-slice-type={slice.slice_type}>{renderRichText(slice.primary.text)}</section>
}
```

**Target Astro implementation**:
```astro
---
import PrismicHtml from '../prismic/PrismicHtml.astro';
const { primary, slice_type } = Astro.props;
---

<section data-slice-type={slice_type}>
    <PrismicHtml content={primary.text} />
</section>
```

---

### 2.2 `ImageSlice.astro`

**Current file**: `src/slices/ImageSlice.tsx`
**New file**: `src/components/slices/ImageSlice.astro`

**Current React implementation**:
```tsx
export function ImageSlice({ slice }: Props) {
  const { image, caption } = slice.primary
  return (
    <figure data-slice-type={slice.slice_type}>
      {image?.url && <img src={image.url} alt={image.alt || ''} />}
      {caption && <figcaption>{renderRichText(caption)}</figcaption>}
    </figure>
  )
}
```

**Target Astro implementation**:
```astro
---
import PrismicHtml from '../prismic/PrismicHtml.astro';
const { primary, slice_type } = Astro.props;
const { image, caption } = primary;
---

<figure data-slice-type={slice_type}>
    {image?.url && <img src={image.url} alt={image.alt || ''} />}
    {caption && (
        <figcaption>
            <PrismicHtml content={caption} />
        </figcaption>
    )}
</figure>
```

---

### 2.3 `AccordionSlice.astro`

**Current file**: `src/slices/AccordionSlice.tsx`
**New file**: `src/components/slices/AccordionSlice.astro`

**Notes**:
- This is an **interactive component** with `useState`
- **Decision needed**: Either keep as React with `client:load` directive, or convert to pure HTML `<details>` element without React state
- Recommended: Convert to `<details>` element since native HTML provides the same functionality

**Target Astro implementation**:
```astro
---
import PrismicHtml from '../prismic/PrismicHtml.astro';
const { primary, variation, slice_type } = Astro.props;

// Determine title based on variation
let title = '';
if (variation === 'default') {
    const linkedData = primary.contentlink as { data?: { title?: string } } | undefined;
    title = linkedData?.data?.title || 'Untitled';
} else if (variation === 'richTextWithStep') {
    title = primary.step ? `${primary.step}: ${primary.title || ''}` : primary.title || '';
} else {
    title = primary.title || '';
}
---

<details data-slice-type={slice_type} data-slice-variation={variation}>
    <summary>
        <h2>{title}</h2>
    </summary>
    <div>
        <PrismicHtml content={primary.content} />
    </div>
</details>
```

---

### 2.4 `ButtonSlice.astro`

**Current file**: `src/slices/ButtonSlice.tsx`
**New file**: `src/components/slices/ButtonSlice.astro`

---

### 2.5 `EmbedSlice.astro`

**Current file**: `src/slices/EmbedSlice.tsx`
**New file**: `src/components/slices/EmbedSlice.astro`

**Target Astro implementation**:
```astro
---
const { primary, slice_type } = Astro.props;
const embed = primary.target;

let html = embed?.html || '';
if (embed?.provider_name === 'YouTube') {
    html = html.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
}
---

{embed?.html && (
    <figure data-slice-type={slice_type} data-provider={embed.provider_name}>
        <div set:html={html} />
    </figure>
)}
```

---

### 2.6 `FeaturedInSlice.astro`

**Current file**: `src/slices/FeaturedInSlice.tsx`
**New file**: `src/components/slices/FeaturedInSlice.astro`

---

### 2.7 `ImageSlice.astro` (already covered in 2.2)

---

### 2.8 `LeadGen.astro`

**Current file**: `src/slices/LeadGen.tsx`
**New file**: `src/components/slices/LeadGen.astro`

**Notes**:
- If this component has form interactivity, it may need to remain as React with `client:load`
- Or use Astro's form handling with progressive enhancement

---

### 2.9 `SharePicGallerySlice.astro`

**Current file**: `src/slices/SharePicGallerySlice.tsx`
**New file**: `src/components/slices/SharePicGallerySlice.astro`

---

### 2.10 `SocialSharerSlice.astro`

**Current file**: `src/slices/SocialSharerSlice.tsx`
**New file**: `src/components/slices/SocialSharerSlice.astro`

---

### 2.11 `TableSlice.astro`

**Current file**: `src/slices/TableSlice.tsx`
**New file**: `src/components/slices/TableSlice.astro`

---

### 2.12 `TeamMemberSlice.astro`

**Current file**: `src/slices/TeamMemberSlice.tsx`
**New file**: `src/components/slices/TeamMemberSlice.astro`

**Target Astro implementation**:
```astro
---
import PrismicDOM from 'prismic-dom';
const { primary, slice_type } = Astro.props;
const { name, description, img, link } = primary;

const nameText = name ? PrismicDOM.RichText.asText(name) : '';
const descriptionText = description ? PrismicDOM.RichText.asText(description) : '';
// For link, use prismic.asLink or handle manually
---

<article data-slice-type={slice_type}>
    {img?.url && <img src={img.url} alt={nameText || ''} />}
    <h3>{nameText}</h3>
    <p>{descriptionText}</p>
    {link?.url && <a href={link.url}>View profile</a>}
</article>
```

---

### 2.13 `ThanksSlice.astro`

**Current file**: `src/slices/ThanksSlice.tsx`
**New file**: `src/components/slices/ThanksSlice.astro`

---

### 2.14 `ErrorMessage.astro`

**Current file**: `src/slices/ErrorMessage.tsx`
**New file**: `src/components/slices/ErrorMessage.astro`

---

## Phase 3: Update Prismic Client Library

### 3.1 Update `src/lib/prismic.ts`

**Changes needed**:
- Keep the existing `@prismicio/client` setup for API calls
- The `getSingleSafe`, `getByUIDSafe`, and `getAllByTypeSafe` functions are good and should be kept
- No major changes needed here

---

### 3.2 Deprecate/Remove `src/lib/prismicHelpers.tsx`

**Reason**: This file contains React-specific rich text rendering that will be replaced by `PrismicHtml.astro` and `PrismicText.astro`.

**Action**: 
1. After all consumers are migrated, delete this file
2. If any React components still need rich text rendering (like interactive forms), keep a minimal version

---

### 3.3 Deprecate/Remove `src/lib/prismicAstro.ts`

**Reason**: This file contains custom HTML rendering that will be replaced by `prismic-dom`.

**Action**: Delete after migration is complete.

---

## Phase 4: Convert Page Components

The current architecture uses React page components wrapped in Astro pages. The target pattern moves Prismic data fetching and rendering into Astro files directly.

### 4.1 Pattern Change for Simple Pages

**Current pattern** (e.g., `faq.astro` + `FaqPage.tsx`):

```astro
// src/pages/faq.astro
---
import { FaqPage } from '@components/pages/FaqPage'
import BaseLayout from '@layouts/BaseLayout.astro'
import { getSingleSafe } from '@lib/prismic'

const page = await getSingleSafe('faqpage', { fetchLinks: [...] })
---

<BaseLayout title="FAQ">
  <FaqPage page={page} />
</BaseLayout>
```

```tsx
// src/components/pages/FaqPage.tsx
export function FaqPage({ page }: Props) {
  return (
    <PageContent>
      {renderRichText(page?.data?.introduction)}
      <SliceZone slices={page?.data?.slices} />
    </PageContent>
  )
}
```

**Target pattern**:

```astro
// src/pages/faq.astro
---
import BaseLayout from '@layouts/BaseLayout.astro'
import PrismicContent from '@components/prismic/PrismicContent.astro'
import PrismicHtml from '@components/prismic/PrismicHtml.astro'
import { getSingleSafe } from '@lib/prismic'

const page = await getSingleSafe('faqpage', { fetchLinks: [...] })
const introduction = page?.data?.introduction
const slices = page?.data?.slices
---

<BaseLayout title="FAQ">
  <article>
    <header class="prose">
      {introduction && <PrismicHtml content={introduction} />}
    </header>
    
    <section class="prose">
      {slices && <PrismicContent content={slices} />}
    </section>
  </article>
</BaseLayout>
```

---

### 4.2 Files to Convert

Each of these pairs (Astro page + React page component) should be merged into a single Astro file:

| Astro Page | React Component | Notes |
|------------|-----------------|-------|
| `src/pages/faq.astro` | `FaqPage.tsx` | Simple conversion |
| `src/pages/contact.astro` | `ContactPage.tsx` | Form needs `client:load` |
| `src/pages/donate.astro` | `DonatePage.tsx` | May have interactive elements |
| `src/pages/embrace.astro` | `EmbracePage.tsx` | Simple conversion |
| `src/pages/certification.astro` | `CertificationPage.tsx` | Simple conversion |
| `src/pages/impact.astro` | `SwitchSurveyPage.tsx` | Simple conversion |
| `src/pages/join.astro` | `JoinPage.tsx` | Form needs `client:load` |
| `src/pages/partners.astro` | `PartnersPage.tsx` | Simple conversion |
| `src/pages/not-listed.astro` | `NotListedPage.tsx` | Form needs `client:load` |
| `src/pages/take-action.astro` | `TakeActionPage.tsx` | May have interactive elements |
| `src/pages/volunteers.astro` | `VolunteersPage.tsx` | Simple conversion |
| `src/pages/team/index.astro` | `TeamPage.tsx` | Simple conversion |
| `src/pages/team/alumni.astro` | `TeamAlumniPage.tsx` | Simple conversion |
| `src/pages/blog/index.astro` | `BlogIndexPage.tsx` | Simple conversion |
| `src/pages/blog/[slug].astro` | `BlogPostPage.tsx` | Uses `getStaticPaths` |
| `src/pages/press/index.astro` | `PressIndexPage.tsx` | Simple conversion |
| `src/pages/press/[slug].astro` | `PressReleasePage.tsx` | Uses `getStaticPaths` |
| `src/pages/thanks/[type].astro` | `ThanksPage.tsx` | Uses `getStaticPaths` |
| `src/pages/index.astro` | `HomePage.tsx` | **Complex** - see below |
| `src/pages/banks/[bankTag].astro` | `BankProfilePage.tsx` | **Complex** - see below |
| `src/pages/sustainable-eco-banks/index.astro` | `EcoBanksPage.tsx` | **Complex** - see below |

---

### 4.3 Special Handling: Complex Interactive Pages

Some pages have significant client-side interactivity and may need to remain as React components:

#### `HomePage.tsx`
- **Complexity**: High
- **Interactive elements**: `BankLocationSearch` (autocomplete/search)
- **Recommendation**: Keep the hero section with search as a React island using `client:load`, convert the rest to Astro

**Hybrid approach**:
```astro
---
import BaseLayout from '@layouts/BaseLayout.astro'
import HeroSearch from '@components/HeroSearch' // React
import PrismicContent from '@components/prismic/PrismicContent.astro'
import { getSingleSafe } from '@lib/prismic'

const page = await getSingleSafe('homepage')
---

<BaseLayout title="...">
  <HeroSearch client:load title={page?.data?.title} />
  
  <section>
    <PrismicContent content={page?.data?.slices1} />
  </section>
  <!-- ... rest as Astro -->
</BaseLayout>
```

#### `BankProfilePage.tsx` / `EcoBanksPage.tsx`
- **Complexity**: High
- **Interactive elements**: Bank search, filtering, GraphQL queries
- **Recommendation**: Keep as React islands or consider moving data fetching to API routes

---

## Phase 5: Update Imports and Clean Up

### 5.1 Add `prismic-dom` Package

```bash
npm install prismic-dom
npm install --save-dev @types/prismic-dom  # if types exist
```

---

### 5.2 Update `tsconfig.json` Path Aliases

Add path alias for the new prismic components:

```json
{
  "compilerOptions": {
    "paths": {
      "@components/prismic/*": ["src/components/prismic/*"],
      "@components/slices/*": ["src/components/slices/*"]
    }
  }
}
```

---

### 5.3 Files to Delete After Migration

After all conversions are complete:

- [ ] `src/slices/*.tsx` (all React slice files)
- [ ] `src/slices/index.tsx` (React SliceZone)
- [ ] `src/lib/prismicHelpers.tsx` (React rich text helpers)
- [ ] `src/lib/prismicAstro.ts` (custom HTML renderer)
- [ ] `src/components/pages/*.tsx` (all page components that have been inlined into Astro)

---

### 5.4 Files to Keep

- `src/lib/prismic.ts` - Prismic client and safe fetch functions
- `src/components/PageContent.tsx` - May still be useful for Mantine context
- Interactive React components that need `client:load`

---

## Phase 6: Testing Checklist

For each converted page, verify:

- [ ] All Prismic content renders correctly
- [ ] Rich text formatting (bold, italic, links) works
- [ ] Images display with correct alt text
- [ ] Slices render in correct order
- [ ] Interactive elements (forms, accordions) still function
- [ ] No console errors about unknown slice types
- [ ] Page loads without hydration errors

---

## Summary: File Changes

### New Files to Create

| File | Purpose |
|------|---------|
| `src/components/prismic/PrismicText.astro` | Plain text extraction |
| `src/components/prismic/PrismicHtml.astro` | Rich text to HTML |
| `src/components/prismic/PrismicContent.astro` | Slice zone renderer |
| `src/components/prismic/index.ts` | Barrel exports |
| `src/components/slices/TextSlice.astro` | Text slice |
| `src/components/slices/ImageSlice.astro` | Image slice |
| `src/components/slices/AccordionSlice.astro` | Accordion slice |
| `src/components/slices/ButtonSlice.astro` | Button slice |
| `src/components/slices/EmbedSlice.astro` | Embed slice |
| `src/components/slices/FeaturedInSlice.astro` | Featured logo slice |
| `src/components/slices/LeadGen.astro` | Lead generation slice |
| `src/components/slices/SharePicGallerySlice.astro` | Share pic gallery |
| `src/components/slices/SocialSharerSlice.astro` | Social sharing |
| `src/components/slices/TableSlice.astro` | Table slice |
| `src/components/slices/TeamMemberSlice.astro` | Team member card |
| `src/components/slices/ThanksSlice.astro` | Thanks message |
| `src/components/slices/ErrorMessage.astro` | Error display |

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/*.astro` | Inline Prismic content rendering |
| `src/pages/**/*.astro` | Inline Prismic content rendering |
| `package.json` | Add `prismic-dom` dependency |
| `tsconfig.json` | Add path aliases |

### Files to Delete (after migration)

| File | Reason |
|------|--------|
| `src/slices/*.tsx` | Replaced by Astro components |
| `src/lib/prismicHelpers.tsx` | Replaced by PrismicHtml.astro |
| `src/lib/prismicAstro.ts` | Replaced by prismic-dom |
| `src/components/pages/*.tsx` | Inlined into Astro pages |

---

## Recommended Implementation Order

1. **Phase 1**: Create core Prismic Astro components (`PrismicText`, `PrismicHtml`, `PrismicContent`)
2. **Phase 2**: Convert slice components one at a time, testing each
3. **Phase 4**: Start with simple pages (FAQ, Contact, etc.) before complex ones
4. **Phase 3**: Update prismic lib after all consumers migrated
5. **Phase 5**: Clean up deleted files
6. **Phase 6**: Full testing pass

---

## Questions for Implementation

1. **Interactive components**: Should accordions use native `<details>` or keep React for animation control?
 - Use Mantine <Accordion> component
2. **Forms**: Keep as React islands with `client:load`, or use Astro form actions?
 - Use Astro form actions, with Mantine form elements such as <TextInput> for the front end
3. **HomePage complexity**: Full conversion or hybrid approach?
 - Keep all current layout and styling with Mantine and Tailwind, but use the new pattern for the Prismic elements
4. **Styling**: Current components use Tailwind + Mantine. Will this change?
 - Keep the current pattern with Tailwind + Mantine
5. **TypeScript**: Should Astro components have `.d.ts` files for prop types?
 - Yes
