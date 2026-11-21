# Urban Air Quality Assistant — AirAware

AirAware is a polished, responsive React dashboard for understanding urban air quality and planning lower-exposure daily routines. It combines live air-quality data with a transparent, deterministic rule engine that explains why each recommendation appears.

## Highlights

- **66 explainable decision rules** across AQI severity, PM2.5, indoor air, household profiles, travel, data quality and daily routines.
- **60 practical capabilities** grouped into six toolkits: live intelligence, explainable recommendations, family protection, cleaner indoor spaces, mobility/routines and personal tools.
- Prioritized recommendations show a rule ID, action, priority and plain-language reason.
- Household profiles for the whole family, children, older adults, respiratory sensitivity, outdoor workers and pregnancy-aware guidance.
- Live hourly AQI and pollutant readings from Open-Meteo: PM2.5, PM10, ozone, nitrogen dioxide, sulphur dioxide and carbon monoxide.
- Indian city presets, geolocation, saved places, city comparison, reading history and CSV export.
- Indoor air checklist, purifier and ventilation guidance, commute tips, AQI guide and PM2.5-to-AQI educational calculator.
- Responsive dashboard, local preferences and clearly labelled demo mode.

## Rule-based AI, not a trained model

The decision engine in `src/engine.js` evaluates explicit conditions against the latest available AQI, PM2.5 value, household profile, alert threshold and data mode. It ranks matching actions and displays the reason for each match. It does not call a paid AI service, train a machine-learning model, diagnose illness or replace official public-health advice.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Data and safety

Live readings are requested from the Open-Meteo Air Quality API. Coverage, timestamps and availability can vary by location. Demo values are illustrative and must not be treated as measurements. The dashboard uses US AQI-style categories and PM2.5 breakpoint interpolation for educational screening; local regulatory AQI methods may differ. The trend visualization is illustrative rather than a measured historical time series. Travel suggestions are exposure-aware tips, not turn-by-turn routing. AirAware is informational, not a medical device or official monitoring authority. Follow local public-health advisories and seek professional care for health concerns.

## Deploy

Import this repository into Render using the included `render.yaml`, or use Vercel/Netlify as a static site. Build command: `npm install && npm run build`; output directory: `dist`.
