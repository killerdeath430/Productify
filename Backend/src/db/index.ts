import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = neon(ENV.DATABASE_URL);
export const db = drizzle(sql, { schema });

// 👀 What is a Connection Pool?
// A connection pool is a cache of database connections that are kept open and reused.

// 🤷‍♂️ Why use it?
// 🔴 Opening/closing connections is slow. Instead of creating a new connection for each request, we reuse existing ones.
// 🔴 Databases limit concurrent connections. A pool manages a fixed number of connections and shares them across requests.