import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Pool } = pg;
let pool;
export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured in Vercel.");
  if (!pool) pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000
  });
  return pool;
}
export async function ensureUsersTable() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      email VARCHAR(254) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}
export function setSession(res, user) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error("JWT_SECRET must contain at least 32 characters.");
  const token = jwt.sign({ sub: String(user.id), email: user.email }, secret, {
    expiresIn: "7d", issuer: "airaware", audience: "airaware-web"
  });
  res.setHeader("Set-Cookie", `aa_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`);
}
export function clearSession(res) {
  res.setHeader("Set-Cookie", "aa_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0");
}
export function readSession(req) {
  const cookie = req.headers.cookie || "";
  const token = cookie.split(";").map(x => x.trim()).find(x => x.startsWith("aa_session="))?.slice("aa_session=".length);
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET, { issuer: "airaware", audience: "airaware-web" });
  } catch {
    return null;
  }
}
export function safeUser(row) {
  return { id: String(row.id), name: row.name, email: row.email, createdAt: row.created_at };
}
export function methodNotAllowed(res, method) {
  res.setHeader("Allow", method);
  return res.status(405).json({ error: "Method not allowed." });
}
export const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
export { bcrypt };
