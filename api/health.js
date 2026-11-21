import { ensureUsersTable, getPool } from "../lib/auth.js";
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed." });
  try {
    await ensureUsersTable();
    await getPool().query("SELECT 1");
    return res.status(200).json({ ok: true, service: "AirAware Vercel API" });
  } catch (error) {
    console.error("health", error);
    return res.status(503).json({ ok: false, error: "Database is not configured or reachable." });
  }
}
