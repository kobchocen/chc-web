# AGENTS.md

This repository uses `pnpm` only and follows a strict `src/`-based Next.js App Router layout.

## Current stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI primitives
- `next-intl` for localized routing
- Active i18n locales: `cs`, `en`
- Prisma v7 prepared for backend integration
- Docker for container delivery
- Helm chart scaffold in `deploy/helm`

## Architecture rules

- Application routes live in `src/app`.
- Shared site configuration lives in `src/config`.
- Static mock content for the current backend-free version lives in `src/lib/content`.
- Database access stays server-only in `src/lib/db`.
- Atomic design is the default component model:
  - `src/components/atoms`
  - `src/components/molecules`
  - `src/components/organisms`
  - `src/components/templates`
  - `src/components/ui` for shadcn/ui primitives

## Working rules

- Use `pnpm` for every package-manager action. Do not use `npm`, `yarn`, or `bun`.
- Use TypeScript for all new runtime code.
- Prefer React Server Components unless interactivity requires `"use client"`.
- Reuse shadcn/ui components before introducing custom primitives.
- Keep all user-facing copy localized for both `cs` and `en`.
- Keep style decisions inside Tailwind utilities and shared design tokens in `src/app/globals.css`.
- Keep docs in `docs/`.
- Keep deployment assets in `deploy/`.
- Keep GitHub automation in `.github/`.
- YAML files must use the `.yaml` extension only.
- Respect `.editorconfig` and format with Prettier.

## Static-first rules

- The current web is intentionally static-first.
- New placeholder content should be added in `src/lib/content`, not hardcoded into route files.
- Prisma code must stay lazy and server-only so the app can build without a configured database.
- Maintenance mode is controlled by `NEXT_PUBLIC_SITE_MAINTENANCE` in `.env`.
- GitHub Pages is reserved for publishing repository documentation from `docs/`, not for serving the Next.js app itself.

## Delivery rules

- Conventional Commits are required for commit messages.
- Docker delivery targets the production `standalone` Next.js output.
- K3s deployment is expected to use the Helm chart in `deploy/helm/charts/chc-web`.
- GitHub Actions workflows must use `.yaml` files.
- Unit tests should be introduced as `*.test.ts` / `*.test.tsx` using a lightweight runner such as Vitest when the test stack is added.

## Validation commands

- `pnpm lint`
- `pnpm build`
- `pnpm format:check`

Run the relevant validation before proposing or merging substantial changes.
