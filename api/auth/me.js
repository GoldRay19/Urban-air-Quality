import { getPool, ensureUsersTable, readSession, safeUser, methodNotAllowed } from "../_lib/auth.js";
export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, "GET");
  const session = readSession(req);
  if (!session) return res.status(401).json({ error: "Not signed in." });
  try {
    await ensureUsersTable();
    const result = await getPool().query("SELECT id,name,email,created_at FROM users WHERE id=$1", [session.sub]);
    if (!result.rows[0]) return res.status(401).json({ error: "Account no longer exists." });
    return res.status(200).json({ user: safeUser(result.rows[0]) });
  } catch (error) {
    console.error("session", error);
    return res.status(500).json({ error: "Could not verify your session." });
  }
}
