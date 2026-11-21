# AirAware — Urban Air Quality Assistant

AirAware is a responsive urban air-quality platform that helps people understand pollution, learn about its effects and make more informed daily decisions.

## What it includes

### Public website
- Animated, responsive landing page explaining the need for accessible air-quality guidance.
- Feature overview and registration/login screens.

### Live air-quality workspace
- Hourly air-quality data from the Open-Meteo Air Quality API.
- AQI-style category, PM2.5, PM10, ozone, nitrogen dioxide, sulphur dioxide and carbon monoxide.
- Indian city presets, browser geolocation, saved places, city comparison, local history and CSV export.
- Household profiles, indoor air checklist, travel exposure guidance, AQI explainer and PM2.5 educational calculator.

### Explainable rule-based AI
- Deterministic rules across AQI severity, PM2.5, indoor air, family protection, travel, data quality and routines.
- Recommendations ranked by priority with a rule ID and plain-language reason.
- Transparent rule-based decision support, not a trained ML model or paid LLM.

### Ask AirAware and knowledge base
- Exactly 100 curated question-and-answer entries across eight topic areas.
- Search and filter by topic or keyword.
- Everyday-language question matching ranks relevant answers using keyword relevance.
- Relevant rule-engine recommendations are shown alongside answers.

### Authentication
- Vercel serverless API functions under `/api`.
- PostgreSQL persistence for account records.
- bcrypt password hashing and JWT sessions stored in HttpOnly, Secure, SameSite=Strict cookies.
- Session validation and logout endpoints.
- Dashboard preferences and reading history remain in browser local storage.

## Deploy on Vercel (only)

1. Import `GoldRay19/Urban-air-Quality` into Vercel and select the Vite framework preset.
2. Set the build command to `npm run build` and the output directory to `dist` (Vercel usually detects both automatically).
3. Create a PostgreSQL database with a provider such as Neon or Supabase. Vercel hosts the frontend and API functions; the database is an external managed service.
4. In Vercel → Project → Settings → Environment Variables, add:
   - `DATABASE_URL`: the PostgreSQL connection string from your database provider.
   - `JWT_SECRET`: a cryptographically random secret of at least 32 characters.
5. Apply the variables to Production (and Preview if desired), redeploy, then test `/api/health`.
6. Open the deployed URL, register an account, sign out, and sign in again to verify persistence.

Generate a secret locally with:

```bash
openssl rand -base64 48
```

The API creates its `users` table automatically on first use. Keep database credentials and JWT secrets only in Vercel environment variables; never commit them to Git.

## Local development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

For local API testing, run Vercel's development server so that both the frontend and `/api` functions are available:

```bash
npx vercel dev
```

Set `DATABASE_URL` and `JWT_SECRET` in your local Vercel environment or a local `.env` file before testing authentication. A PostgreSQL database must be reachable.

## Data, limitations and safety

AirAware currently uses hourly forecast/model data from Open-Meteo; it is not guaranteed to be a nearby physical sensor or official CPCB station. Its displayed categories are US AQI-style educational bands and may differ from India's CPCB National AQI. The dashboard trend shape is illustrative, not a measured historical series. Travel suggestions are not turn-by-turn routing. AirAware does not measure indoor air, guarantee safe conditions, diagnose illness or replace official public-health guidance or professional medical advice.

Email verification, password reset and social sign-in are not included yet.
