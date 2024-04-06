import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "~/db/schema";

// Database connection
const connection = neon(process.env.DATABASE_URL!);

// Drizzle ORM instance
const db = drizzle(connection, { schema });

export default db;
