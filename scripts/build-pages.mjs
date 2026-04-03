import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const disabledRootDir = path.join(rootDir, ".pages-build-disabled");
const disabledEntries = [
  "src/proxy.ts",
  "src/app/[locale]/about",
  "src/app/[locale]/calendar",
  "src/app/[locale]/links",
  "src/app/[locale]/posts",
].map((relativePath) => ({
  originalPath: path.join(rootDir, relativePath),
  disabledPath: path.join(disabledRootDir, relativePath),
}));

const renamedEntries = [];

try {
  for (const entry of disabledEntries) {
    const legacyDisabledPath = `${entry.originalPath}.pages-disabled`;

    if (!existsSync(entry.originalPath) && existsSync(legacyDisabledPath)) {
      renameSync(legacyDisabledPath, entry.originalPath);
    }
  }

  rmSync(path.join(rootDir, ".next"), { recursive: true, force: true });
  rmSync(path.join(rootDir, "out"), { recursive: true, force: true });
  rmSync(disabledRootDir, { recursive: true, force: true });

  for (const entry of disabledEntries) {
    if (existsSync(entry.originalPath)) {
      mkdirSync(path.dirname(entry.disabledPath), { recursive: true });
      renameSync(entry.originalPath, entry.disabledPath);
      renamedEntries.push(entry);
    }
  }

  const result = spawnSync("pnpm", ["exec", "next", "build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_GITHUB_PAGES_EXPORT: process.env.NEXT_PUBLIC_GITHUB_PAGES_EXPORT ?? "true",
      NEXT_PUBLIC_SITE_MAINTENANCE: process.env.NEXT_PUBLIC_SITE_MAINTENANCE ?? "true",
    },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
} finally {
  for (const entry of renamedEntries.reverse()) {
    if (existsSync(entry.disabledPath)) {
      renameSync(entry.disabledPath, entry.originalPath);
    }
  }

  rmSync(disabledRootDir, { recursive: true, force: true });
}
