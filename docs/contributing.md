# Contributing and Repository Practices

## Package manager

- Use `pnpm` only.
- The repository blocks installs from other package managers via `preinstall`.
- Keep `packageManager` in `package.json` aligned with the actual toolchain version.

## Formatting and editor behavior

- `.editorconfig` is the baseline editor contract for whitespace, newlines, and indentation.
- Prettier is the source of truth for code formatting.
- Run:

```bash
pnpm format
pnpm format:check
```

## Lint and build

Before opening a pull request, run:

```bash
pnpm lint
pnpm build
```

## Git and commit messages

Use Conventional Commits:

- `feat: add posts feed pagination shell`
- `fix: keep Prisma client lazy for static builds`
- `docs: add deployment and workflow documentation`
- `chore: align editorconfig and pnpm enforcement`

Recommended branch naming:

- `feat/<short-topic>`
- `fix/<short-topic>`
- `docs/<short-topic>`
- `chore/<short-topic>`

## YAML files

- YAML files must use the `.yaml` extension only.
- Do not add `.yml` files to the repository.

## Documentation placement

- Keep durable project documentation in `docs/`.
- Keep agent-specific operating rules in `AGENTS.md`.
- Keep GitHub-specific metadata and automation in `.github/`.
