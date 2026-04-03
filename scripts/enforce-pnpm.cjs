const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.startsWith("pnpm/")) {
  console.error("This repository uses pnpm only. Run installs and scripts with pnpm.");
  process.exit(1);
}
