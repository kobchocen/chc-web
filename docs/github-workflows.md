# GitHub Workflows

## Workflow files

- `.github/workflows/ci.yaml`
- `.github/workflows/docker.yaml`
- `.github/workflows/docs-pages.yaml`

## Intent

- `ci.yaml` validates install, lint, build, and Helm chart syntax
- `docker.yaml` builds the production image and can publish it to GHCR
- `docs-pages.yaml` publishes `docs/` to GitHub Pages

## Conventions

- Workflow files use the `.yaml` extension only.
- Workflows should call `pnpm`, never `npm`.
- Documentation publishing is separated from app deployment.
- Container delivery remains the production path for the Next.js application.
