# Testing Strategy

## Current status

- The repository currently validates changes with `pnpm lint` and `pnpm build`.
- A dedicated unit-test runner is not installed yet.

## Planned unit-test approach

The preferred unit-test stack for this project is:

- Vitest
- Testing Library for React components
- `jsdom` for client component rendering

## What to test first

When the test stack is added, prioritize:

- content mapping and static mock transformation logic in `src/lib/content`
- navigation and locale switching behavior
- reusable atoms and molecules with meaningful state or interaction
- rendering branches inside route-level client components

## Naming and placement

- Use `*.test.ts` and `*.test.tsx`.
- Keep unit tests close to the code they validate, or use a dedicated `tests/unit` tree for cross-cutting cases.

## CI expectations

- Once the test stack is installed, add `pnpm test` to the CI workflow.
- Keep unit tests deterministic and network-free.
- Do not require a live database for frontend or component tests.
