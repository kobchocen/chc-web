## CHC Web

Internal Next.js application using localization, Prisma ORM, and Tailwind. Follow the steps below to set up the project locally with `.nvmrc` and `pnpm`.

### Requirements

- macOS/Linux with `git`, `curl`, and `bash`
- [nvm](https://github.com/nvm-sh/nvm) to load the Node version defined in `.nvmrc`
- `pnpm` 10.20.0 (managed via [Corepack](https://nodejs.org/api/corepack.html) or a global install)

### Install Node and pnpm

```bash
nvm install        # installs Node 22.20.0 from .nvmrc
nvm use            # activates the version
corepack enable    # enables package manager shims
corepack prepare pnpm@10.20.0 --activate
```

> Alternatively run `npm install -g pnpm@10.20.0`.

### Environment setup

```bash
cp .env.example .env    # adjust the values for your env
pnpm install            # install dependencies
pnpm prisma:generate    # generate the Prisma client
```

### Development

```bash
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000). Other scripts:

- `pnpm lint` – run ESLint
- `pnpm format` – run Prettier
- `pnpm prisma:studio` – open Prisma Studio

### Deploy

The project targets Vercel (Next.js 16). Before deploying run `pnpm build` and verify database migrations via `pnpm prisma:migrate`.\*\*\*
