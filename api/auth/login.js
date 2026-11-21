import { getPool, ensureUsersTable, setSession, safeUser, bcrypt, methodNotAllowed } from "../_lib/auth.js";
let dummyHash;
export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, "POST");
  try {
    await ensureUsersTable();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");
    const result = await getPool().query("SELECT id,name,email,password_hash,created_at FROM users WHERE email=$1", [email]);
    const row = result.rows[0];
    dummyHash ||= await bcrypt.hash("constant-timing-dummy-password", 12);
    const valid = await bcrypt.compare(password, row?.password_hash || dummyHash);
    if (!row || !valid) return res.status(401).json({ error: "Email or password is incorrect." });
    const user = safeUser(row);
    setSession(res, user);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("login", error);
    return res.status(500).json({ error: "Could not sign in. Check Vercel database and environment settings." });
  }
}
