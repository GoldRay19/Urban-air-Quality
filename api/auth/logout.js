import { clearSession, methodNotAllowed } from "../../lib/auth.js";
export default function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, "POST");
  clearSession(res);
  return res.status(200).json({ ok: true });
}
