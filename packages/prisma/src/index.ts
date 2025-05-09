import { PrismaClient } from "../generated/prisma/index.js";  

const DATABASE_URL = process.env.DATABASE_URL || "default_database_url_here";
// Throw an error if DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not defined.");
}
export const client = new PrismaClient();