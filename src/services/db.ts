import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "~/db/schema";

// Database connection
const connection = connect({
    url: process.env.PLANETSCALE_DATABASE_URL,
});

// Drizzle ORM instance
const db = drizzle(connection, { schema });

export default db;