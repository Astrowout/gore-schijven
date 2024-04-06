import { cwd } from "node:process";

import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

loadEnvConfig(cwd());

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
}

export default {
    schema: "./db/schema/index.ts",
    out: "./db/drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;
