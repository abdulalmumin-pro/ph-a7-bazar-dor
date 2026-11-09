<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BazarDor agent notes

## Stack and layout

- Next.js 16 App Router (Turbopack) + React 19 + strict TypeScript. `src/app` is the app; `@/*` maps to `src/*`.
- Tailwind CSS 4 + daisyUI are configured through CSS only (`@import "tailwindcss"; @plugin "daisyui";` in `src/app/globals.css`). There is no `tailwind.config.*`.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Uncached server reads must sit under `<Suspense>` or be cached (`next: { revalidate: 300 }` is used for product APIs); read `node_modules/next/dist/docs/01-app/02-guides/` before changing data fetching.
- `src/proxy.ts` is Next 16's replacement for `middleware.ts`. It guards only `/profile` and `/details/:path` and is an optimistic redirect, not full authorization.

## Commands

- Install/dev/build: `npm install`, `npm run dev`, `npm run build`, `npm start`.
- Lint: `npm run lint` (whole repo). Single file: `npx eslint path/to/file.tsx`.
- Typecheck: `npx tsc --noEmit` (there is no typecheck npm script).
- No test runner or test files are configured.
- Known baseline: `npm run lint` currently fails on pre-existing `react-hooks/set-state-in-effect` errors in `src/app/components/Banner.tsx` and `src/app/profile/page.tsx` (plus two `window.location.href` warnings). Do not treat these as regressions.
- `npm run build` logs non-fatal `HANGING_PROMISE_REJECTION` errors from `Marquee` (`cache: "no-store"` during prerender) but still generates pages.

## Auth

- Better Auth + MongoDB lives in `src/lib/auth.ts`; the only auth API route is `src/app/api/auth/[...all]/route.ts`.
- `src/lib/auth-client.ts` currently hard-codes `baseURL: "https://ph-a7-bazar-dor.vercel.app"`, so local development auth talks to production. Use `NEXT_PUBLIC_BETTER_AUTH_URL` (already in `.env`) or `window.location.origin` when testing locally.
- Required environment variables: `BETTER_AUTH_DB`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALL_PRODUCTS_URL`, `RISERS_PRODUCT_URL`, `FALLERS_PRODUCT_URL`, `MARQUEE_URL`, `DETAILS_PAGE_URL`, `CATEGORY_CATEGORYID_URL`. `.env` is gitignored.
- `auth.ts` creates a `MongoClient` at module import using `BETTER_AUTH_DB`; missing env fails during build/runtime instead of producing a clear error.

## Data and UI

- Product data comes from external HTTP APIs configured by the env vars above; `NavLinks` hard-codes its categories API. Responses may be a bare array or `{ data: [...] }`; existing loaders handle both. Keep that behavior.
- `AllProducts` throws when `ALL_PRODUCTS_URL` is unset; most other loaders log the error and render an empty state.
- UI copy is Bengali. Reuse the `Intl.NumberFormat("bn-BD")` patterns and the Noto Sans Bengali font set in `src/app/layout.tsx`.
- `next/image` remote images are limited to `lh3.googleusercontent.com`; add new hosts to `images.remotePatterns` in `next.config.ts`.
- `src/app/loading/page.tsx` is a real `/loading` route, not the root loading boundary; the route-level skeleton is `src/app/category/[categoryId]/loading.tsx`.
- `src/app/not-found.tsx` exports `NotFound` as a named export, not `default`; add a default export if that custom 404 should actually be used.
