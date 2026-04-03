## CHC Web

Next.js application using localized routing, Tailwind CSS v4, shadcn/ui, and Prisma v7 preparation. The repository is `pnpm`-only and currently ships a static-first frontend with mock content while backend integration is being prepared.

### Requirements

- macOS/Linux with `git`, `curl`, and `bash`
- [nvm](https://github.com/nvm-sh/nvm) to load the Node version defined in `.nvmrc`
- `pnpm` 10.20.0 (managed via [Corepack](https://nodejs.org/api/corepack.html))

### Install Node and pnpm

```bash
nvm install        # installs Node 22.20.0 from .nvmrc
nvm use            # activates the version
corepack enable    # enables package manager shims
corepack prepare pnpm@10.20.0 --activate
```

### Environment setup

```bash
cp .env.example .env    # adjust the values for your env
pnpm install            # install dependencies
pnpm prisma:generate    # generate the Prisma client
```

`NEXT_PUBLIC_SITE_MAINTENANCE=true` enables maintenance mode and restricts the public site to the homepage only.
`NEXT_PUBLIC_GITHUB_PAGES_EXPORT=true` switches the app to a static export build intended for GitHub Pages.

### Development

```bash
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000). Other scripts:

- `pnpm lint` – run ESLint
- `pnpm format` – run Prettier
- `pnpm build:pages` – build the static maintenance export for GitHub Pages
- `pnpm prisma:studio` – open Prisma Studio
- `pnpm prisma:generate` – generate Prisma client for backend work

## Documentation

- Repo rules for coding agents: `AGENTS.md`
- Project docs: `docs/README.md`
- Deployment packaging: `deploy/helm/charts/chc-web`
- GitHub automation: `.github/workflows/*.yaml`

### Deploy

Preferred deployment targets:

- Docker image from `Dockerfile`
- K3s via Helm chart in `deploy/helm/charts/chc-web`
- GitHub Pages for publishing the static maintenance export

Before deploying run:

```bash
pnpm lint
pnpm build
```
