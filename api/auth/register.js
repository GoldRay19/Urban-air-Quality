import { getPool, ensureUsersTable, setSession, safeUser, emailPattern, bcrypt, methodNotAllowed } from "../_lib/auth.js";
export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, "POST");
  try {
    await ensureUsersTable();
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");
    if (name.length < 2 || name.length > 80) return res.status(400).json({ error: "Name must be between 2 and 80 characters." });
    if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ error: "Enter a valid email address." });
    if (password.length < 10 || password.length > 128 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return res.status(400).json({ error: "Use 10–128 characters with at least one letter and one number." });
    const hash = await bcrypt.hash(password, 12);
    const result = await getPool().query("INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id,name,email,created_at", [name, email, hash]);
    const user = safeUser(result.rows[0]);
    setSession(res, user);
    return res.status(201).json({ user });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ error: "An account with this email already exists." });
    console.error("register", error);
    return res.status(500).json({ error: "Could not create your account. Check Vercel database and environment settings." });
  }
}
