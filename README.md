# AirAware — Urban Air Quality Assistant

AirAware is a full-stack, responsive urban air-quality platform that helps people understand pollution, learn about its effects and make more informed daily decisions.

## What it includes

### Public website
- Animated, responsive landing page explaining the need for accessible air-quality guidance.
- Clear feature overview and calls to action.
- Email/password registration and login screens.

### Live air-quality workspace
- Hourly air-quality data from the Open-Meteo Air Quality API.
- AQI-style category, PM2.5, PM10, ozone, nitrogen dioxide, sulphur dioxide and carbon monoxide.
- Indian city presets, browser geolocation, saved places, city comparison, local history and CSV export.
- Family profiles for the whole household, children, older adults, respiratory sensitivity, outdoor workers and pregnancy-aware guidance.
- Indoor air checklist, travel exposure guidance, AQI explainer and PM2.5 educational calculator.

### Explainable rule-based AI
- 66 deterministic rules across AQI severity, PM2.5, indoor air, family protection, travel, data quality and routines.
- Recommendations ranked by priority with a rule ID and plain-language reason.
- Profile-aware recommendations based on available readings.
- Transparent rule-based decision support, not a trained ML model or paid LLM.

### Ask AirAware and knowledge base
- Exactly 100 curated question-and-answer entries across eight topic areas.
- Search and filter the library by topic or keyword.
- Everyday-language question matching ranks relevant answers using keyword relevance.
- Ask AirAware also shows current rule-engine recommendations relevant to the latest reading.

### Authentication and backend
- Express 5 API with PostgreSQL persistence.
- Registration and login with bcrypt password hashing (12 rounds).
- JWT sessions stored in HttpOnly, Secure (production), SameSite=Strict cookies.
- Session validation endpoint, logout, auth rate limiting, Helmet security headers and parameterized SQL queries.
- Database stores user identity and password hashes; dashboard preferences and reading history remain in browser local storage at present.

## Deploy on Render

1. Import this repository into Render as a Blueprint.
2. Render reads `render.yaml` and provisions the Node web service plus PostgreSQL database.
3. The Blueprint generates `JWT_SECRET` and injects the database connection string.
4. Wait for the first build and deploy to complete, then open the service URL.

The web service builds the React frontend and serves it from Express. The health check is `/api/health`.

## Run the frontend locally

```bash
npm install
npm run dev
```

For the full backend locally, configure `DATABASE_URL` and a random `JWT_SECRET` of at least 32 characters, ensure PostgreSQL is running, then run:

```bash
npm run build
npm start
```

## Data, limitations and safety

AirAware currently uses hourly forecast/model data from Open-Meteo; it is not guaranteed to be a nearby physical sensor or official CPCB station. Its displayed categories are US AQI-style educational bands and may differ from India's CPCB National AQI. The dashboard trend shape is illustrative, not a measured historical series. Travel suggestions are not turn-by-turn routing. AirAware does not measure indoor air, guarantee safe conditions, diagnose illness or replace official public-health guidance or professional medical advice.

Account registration requires a working PostgreSQL database. Email verification, password reset and social sign-in are not included yet.
