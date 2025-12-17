import { execSync } from "child_process";
import { randomBytes } from "crypto";

const migrationName = process.argv[2] || `migration_${randomBytes(4).toString("hex")}`;

console.log(`Generating migration with name: ${migrationName}`);

execSync(
  `npx tsx ./node_modules/typeorm/cli.js migration:generate -d src/connections/database.ts src/migrations/${migrationName}Migration`,
  { stdio: "inherit" }
);