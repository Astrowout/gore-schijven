import { cwd } from "node:process";

import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

loadEnvConfig(cwd());

if (!process.env.PLANETSCALE_DATABASE_URL) {
    throw new Error("PLANETSCALE_DATABASE_URL is missing");
}

export default {
    schema: "./db/schema/index.ts",
    out: "./db/drizzle",
    driver: "mysql2",
    dbCredentials: {
        uri: process.env.PLANETSCALE_DATABASE_URL!,
    },
} satisfies Config;