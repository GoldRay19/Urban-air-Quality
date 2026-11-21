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

### Authentication (temporary local mode)
- Registration and sign-in use browser `localStorage`; no database or server-side auth API is required.
- Passwords are stored as PBKDF2-SHA-256 verifiers with unique random salts, not as plaintext.
- Accounts and sessions exist only in the current browser profile and do not sync across devices.
- This is suitable for a temporary demo, not production-grade authentication. Clearing site storage removes local accounts.

## Deploy on Vercel

1. Import `GoldRay19/Urban-air-Quality` into Vercel and select the Vite framework preset.
2. Set the build command to `npm run build` and output directory to `dist` (Vercel usually detects both automatically).
3. No database or authentication environment variables are needed for the temporary local account mode.
4. Deploy, then register and sign in using the same browser and device.

## Local development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Authentication runs entirely in the browser during this temporary mode; no API server or database is required.

## Data, limitations and safety

AirAware currently uses hourly forecast/model data from Open-Meteo; it is not guaranteed to be a nearby physical sensor or official CPCB station. Its displayed categories are US AQI-style educational bands and may differ from India's CPCB National AQI. The dashboard trend shape is illustrative, not a measured historical series. Travel suggestions are not turn-by-turn routing. AirAware does not measure indoor air, guarantee safe conditions, diagnose illness or replace official public-health guidance or professional medical advice.

Email verification, password reset and social sign-in are not included yet.
\n\n## Authentication (temporary local mode)\n\nRegistration and sign-in currently use browser `localStorage`. Passwords are stored as PBKDF2-SHA-256 verifiers with per-user random salts; accounts and sessions are limited to the current browser/device. This is temporary demo authentication, not production-grade account security or cross-device authentication.\n