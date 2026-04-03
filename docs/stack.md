# Stack and Architecture

## Runtime stack

- Node.js `22.20.x`
- `pnpm` `10.20.x`
- Next.js `16`
- React `19`
- TypeScript `5`
- Tailwind CSS `v4`
- shadcn/ui
- Prisma `v7`
- `next-intl`

## Repository layout

- `src/app` - localized App Router routes and route-level composition
- `src/components/atoms` - smallest presentational building blocks
- `src/components/molecules` - small reusable compositions
- `src/components/organisms` - larger feature sections and page-level blocks
- `src/components/templates` - layout shells
- `src/components/ui` - shadcn/ui primitives
- `src/config` - site-level static configuration
- `src/lib/content` - mock content used while the site remains static-first
- `src/lib/db` - Prisma server-only access
- `docs` - repository documentation
- `deploy` - deployment packaging and Helm chart assets
- `.github` - GitHub workflows and workspace metadata

## Atomic design rules

- New reusable UI should be categorized before being added.
- If a component is a generic primitive, prefer `src/components/ui`.
- If it is a project-specific primitive, place it in `atoms`.
- If it combines two or more atoms into a small reusable block, place it in `molecules`.
- If it owns a larger section with multiple child blocks, place it in `organisms`.
- Route files should orchestrate data and composition, not hold large amounts of raw markup.

## Static-first backend preparation

- The current website is intentionally rendered as static or SSG content where possible.
- Mock content belongs in `src/lib/content`.
- Prisma is prepared for a future backend, but must not block frontend builds.
- Database access must remain server-only and lazy.
- Route components must not import Prisma in client code.

## Styling rules

- Design tokens live in `src/app/globals.css`.
- Tailwind utilities are the default styling mechanism.
- Pre-existing `surface-*` and layout helper classes should be reused before introducing new global classes.
- When adding UI, use shadcn/ui plus Tailwind utilities before writing bespoke CSS.
