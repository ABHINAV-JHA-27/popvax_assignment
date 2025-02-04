import { PrismaClient } from "@prisma/client";

const DB = new PrismaClient();

DB.$connect()
  .then(() => console.log("🟢 Connected to PostgreSQL via Prisma"))
  .catch((err) => console.error("🔴 Error connecting to PostgreSQL:", err));

export default DB;
