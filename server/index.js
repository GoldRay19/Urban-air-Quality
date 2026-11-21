import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 10000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL?.includes("render.com") ? { rejectUnauthorized: false } : undefined });
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) throw new Error("JWT_SECRET must be configured with at least 32 characters.");
app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-7", legacyHeaders: false }));

await pool.query(`
 CREATE TABLE IF NOT EXISTS users (
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(80) NOT NULL,
   email VARCHAR(254) NOT NULL UNIQUE,
   password_hash TEXT NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 )
`);

const sign = user => jwt.sign({ sub: String(user.id), email: user.email }, JWT_SECRET, { expiresIn: "7d", issuer: "airaware", audience: "airaware-web" });
const safeUser = row => ({ id: String(row.id), name: row.name, email: row.email, createdAt: row.created_at });
const setSession = (res, user) => res.cookie("aa_session", sign(user), { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"strict", path:"/", maxAge:7*24*60*60*1000 });
function auth(req,res,next){
 const token = req.cookies?.aa_session || "";
 try { const payload = jwt.verify(token, JWT_SECRET, { issuer: "airaware", audience: "airaware-web" }); req.userId = payload.sub; next(); }
 catch { res.status(401).json({ error: "Your session has expired. Please sign in again." }); }
}
app.get("/api/health", async (_req,res) => { try { await pool.query("SELECT 1"); res.json({ ok:true, service:"AirAware API" }); } catch { res.status(503).json({ ok:false }); } });
app.post("/api/auth/register", async (req,res) => {
 const name = String(req.body?.name || "").trim();
 const email = String(req.body?.email || "").trim().toLowerCase();
 const password = String(req.body?.password || "");
 if (name.length < 2 || name.length > 80) return res.status(400).json({error:"Name must be between 2 and 80 characters."});
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({error:"Enter a valid email address."});
 if (password.length < 10 || password.length > 128 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return res.status(400).json({error:"Use 10–128 characters with at least one letter and one number."});
 try {
   const hash = await bcrypt.hash(password, 12);
   const result = await pool.query("INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id,name,email,created_at", [name,email,hash]);
   const user = safeUser(result.rows[0]); setSession(res,user); res.status(201).json({ user });
 } catch (error) { if (error.code === "23505") return res.status(409).json({error:"An account with this email already exists."}); console.error("register",error); res.status(500).json({error:"Could not create your account right now."}); }
});
app.post("/api/auth/login", async (req,res) => {
 const email = String(req.body?.email || "").trim().toLowerCase();
 const password = String(req.body?.password || "");
 try {
   const result = await pool.query("SELECT id,name,email,password_hash,created_at FROM users WHERE email=$1", [email]);
   const row = result.rows[0];
   const hash = row?.password_hash || await bcrypt.hash("constant-timing-dummy-password", 12);
   const valid = await bcrypt.compare(password,hash);
   if (!row || !valid) return res.status(401).json({error:"Email or password is incorrect."});
   const user = safeUser(row); setSession(res,user); res.json({user});
 } catch (error) { console.error("login",error); res.status(500).json({error:"Could not sign in right now."}); }
});
app.get("/api/auth/me", auth, async (req,res) => {
 const result = await pool.query("SELECT id,name,email,created_at FROM users WHERE id=$1", [req.userId]);
 if (!result.rows[0]) return res.status(401).json({error:"Account no longer exists."});
 res.json({user:safeUser(result.rows[0])});
});
app.post("/api/auth/logout", (_req,res) => { res.clearCookie("aa_session", { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"strict", path:"/" }); res.json({ok:true}); });
const dist = path.resolve(__dirname,"../dist");
app.use(express.static(dist,{index:false, maxAge:"1h"}));
app.use((req,res,next)=>{ if(req.path.startsWith("/api/")) return res.status(404).json({error:"API route not found."}); res.sendFile(path.join(dist,"index.html"),error=>error&&next(error)); });
app.listen(port,"0.0.0.0",()=>console.log("AirAware server listening on",port));
