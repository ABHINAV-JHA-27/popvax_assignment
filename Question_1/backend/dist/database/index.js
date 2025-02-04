"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const DB = new client_1.PrismaClient();
DB.$connect()
    .then(() => console.log("🟢 Connected to PostgreSQL via Prisma"))
    .catch((err) => console.error("🔴 Error connecting to PostgreSQL:", err));
exports.default = DB;
