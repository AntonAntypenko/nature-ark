# Architecture Decision Records (ADR)

This document serves as the Single Source of Truth for architectural decisions, rendering patterns, and technical constraints enforced in this project.

---

## ADR 001: Rendering Strategies & Build Indications

### Context
Next.js App Router differentiates rendering modes at build time. Misunderstanding these markers leads to unintended dynamic rendering overhead or broken static caching.

### Decision
We strictly define page paradigms based on data requirements:

| Output Marker | Strategy | Trigger / Mechanism | Use Case |
| :--- | :--- | :--- | :--- |
| **`○ (Static)`** | Pure Static | Default behavior for routes without dynamic segments (`[param]`). | Static landing pages, TOS. |
| **`● (SSG)`** | Static Site Generation | Dynamic routes (`[locale]`) backed by `generateStaticParams()`. | Localized static pages, marketing, blogs. |
| **`ƒ (Dynamic)`** | Server-Side Rendering | Invoked via `cookies()`, `headers()`, or awaiting `searchParams`. | Dashboards, search results, auth flows. |

---

## ADR 002: Asynchronous `params` and Static Context Locking

### Context
In Next.js 15/16, route `params` are asynchronous Promises. Additionally, `next-intl` requires explicitly locking the locale scope during build-time SSG.

### Decision
1. **Promise Unwrapping:** All pages reading `params` must type it as `Promise<{ locale: string }>` and unwrap via `const { locale } = await params`.
2. **Context Locking:** SSG pages **must** execute `setRequestLocale(locale)` before any async calls (`getTranslations`) to lock static context for `next-intl`.

---

## ADR 003: Mandatory Use of `@/i18n/navigation` over `next/link`

### Context
When navigating between pages, importing `Link` from standard `next/link` with relative paths like `href="/"` relies on `middleware.ts` catching the request to redirect to `/uk` or `/en`.

### Decision
We strictly enforce using `import { Link } from "@/i18n/navigation"` across all components.

### Rationale & Impact
1. **Zero Network Latency:** Bypasses `307 Temporary Redirect` middleware roundtrips by attaching the locale directly to `<a href="/uk">` during render.
2. **Prefetching Integrity:** Preserves Next.js automatic route prefetching for localized bundles.
3. **Type Safety:** Provides compile-time safety for typed route paths.

---

## ADR 004: Standardized Page Component Naming Convention

### Context
In Next.js App Router, page files are named `page.tsx`. Inconsistent component naming (e.g., `export default function Home()`, `export default function SsgPage()`) creates friction when copying templates or searching across the codebase.

### Decision
All page entrypoints (`page.tsx`) **must** export the component named `Page`:
`export default function Page()` or `export default async function Page()`.

### Rationale
- Matches Next.js file-system-based routing convention (`page.tsx` -> `Page`).
- Eliminates cognitive load during code generation, refactoring, and AI-assisted development.

---

## ADR 005: Hierarchical `generateStaticParams` & Parameter Centralization

### Context
`generateStaticParams` can be exported from both `layout.tsx` and `page.tsx`. Removing it from `layout.tsx` forces the root locale layout into Dynamic mode, breaking CDN-level static caching.

### Decision
1. **Mandatory in Layout:** `app/[locale]/layout.tsx` **must** export `generateStaticParams` to ensure static compilation of root layout wrappers.
2. **Mandatory in SSG Pages:** SSG pages **must** explicitly export `generateStaticParams` to guarantee standalone static compilation regardless of parent layout changes.
3. **Single Source of Truth:** We use a centralized `getStaticLocaleParams()` helper function from `@/i18n/routing` instead of duplicating `.map()` logic across files.

---

## ADR 006: Mobile-First Responsive Philosophy in Tailwind

### Context
Responsive layout development often becomes chaotic when developers mix paradigms—writing styles for desktop first and breaking them down for mobile screens using inverted media queries (`max-w-*`). This leads to redundant classes, style override conflicts, and breaks standard Tailwind CSS practices.

### Decision
1. **Progressive Enhancement (Mobile-First):** Unprefixed Tailwind base classes ALWAYS define styles for the smallest viewports (mobile devices).
2. **Responsive Prefixes as Extensions:** Prefixes like `sm:`, `md:`, `lg:`, and `xl:` are used strictly to modify or enhance styles for larger screens (progressing from smallest to largest).
3. **Prohibition of Desktop-First Prefixes:** The use of `max-sm:`, `max-md:`, or similar inverted prefixes is strictly prohibited, with rare exceptions for isolated legacy code.
4. **Layering Logic:** All interface modifications (paddings, grid layouts, font sizes) must follow the "small to large" progression. For example, if an element is single-column on mobile and three-column on desktop, the base class defines a single column, while the `lg:` prefix introduces the three-column layout.

---

## ADR 007: Conditional Rendering & Tailwind Code Cleanliness

### Context
Mixing complex state logic, nested ternary operators, and overly long Tailwind class strings directly inside the JSX structure degrades code readability, complicates code reviews, and obscures component architecture.

### Decision

#### 1. Conditional Rendering Strategy
* **Early Returns (Multiple `return` statements):** Use early returns when a component should not render its primary container structure at all (e.g., in `isLoading`, `isError`, `unauthorized`, or `isEmpty` states). This keeps the main render tree flat, linear, and clean.
* **Inline Conditionals (Within a single `return`):** Limit ternary operators (`? :`) and logical ANDs (`&&`) strictly to surgical changes within an existing UI structure (e.g., toggling a button icon, showing/hiding a badge, or altering text).

#### 2. Tailwind Cleanliness & Cohesion
* **Tailwind Cohesion:** Keep static Tailwind classes directly inline within JSX (`className="..."`). This preserves Tailwind's primary strength—visual clarity and locality of styles.
* **When to Extract:** Extract class strings into variables *before* the `return` block EXCLUSIVELY under two conditions:
    1. **Complex State Logic:** When dynamic classes depend on state, and the number of conditional variants exceeds two or involves complex ternary logic.
    2. **Class Bloat:** When a static class string exceeds reasonable length limits (more than 15–20 utilities including responsive prefixes like `sm:`, `md:`, `lg:`), preventing quick scanning of the semantic JSX structure.