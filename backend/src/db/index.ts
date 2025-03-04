import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: "postgresql://user:password@db:5432/mydb",
});

export const db = drizzle(pool);
