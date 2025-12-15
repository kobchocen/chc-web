## Prisma

This project uses a single Prisma schema located at `prisma/schema.prisma` that targets a MariaDB/MySQL compatible datasource. The connection string is provided through `prisma.config.ts`, which loads `DATABASE_URL` at runtime.

### Environment variables

Add your connection string to `.env` (used by `prisma.config.ts` and the driver adapter):

```
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
```

### Common commands

| Purpose                | Command                |
| ---------------------- | ---------------------- |
| Generate Prisma Client | `pnpm prisma:generate` |
| Apply migrations       | `pnpm prisma:migrate`  |
| Prisma Studio          | `pnpm prisma:studio`   |

When switching environments (e.g., dev/prod) update `DATABASE_URL` and regenerate the client so the types reflect the latest schema. If `DATABASE_URL` is missing when `prisma.config.ts` runs, Prisma CLI will throw an explicit error.
