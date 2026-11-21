# Urban Air Quality Assistant

A responsive, rule-based React dashboard that helps households understand outdoor air quality and choose practical lower-exposure routines. Built with React + Vite + JavaScript; no backend or paid API key required.

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

Live readings are requested from the Open-Meteo Air Quality API when location access is available. The app labels demo/manual data clearly and never presents estimates as live measurements. AQI categories use the US EPA AQI breakpoints for PM2.5 and PM10 as a practical screening guide; other pollutants are shown as concentrations when available. This is an informational tool, not medical advice or an official regulatory monitor.

## Deploy

Import this repository into Vercel, Netlify, or any static host. Build command: `npm run build`; output directory: `dist`.

## Features

- Live geolocation-based air-quality lookup and city search
- PM2.5, PM10, ozone, nitrogen dioxide, sulphur dioxide and carbon monoxide panels
- Rule-based AQI bands, health guidance and pollutant-specific explanations
- Household profiles, sensitive-group guidance and activity planner
- Indoor air checklist, ventilation and purifier tips
- Exposure-aware commute timing suggestions (rule-based, not turn-by-turn routing)
- Saved places, thresholds, alerts, history, comparison, CSV export and responsive layout
- Offline-friendly demo mode and local browser persistence
