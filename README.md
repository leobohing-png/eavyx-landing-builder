# Eavyx Landing Builder

Prototype Next.js app that generates deterministic landing pages from a short business brief.

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run start
```

## How the generator works

1. Use `/builder` to submit business data (business name, city, services, brand style, optional description).
2. The form posts to `POST /api/sites`.
3. The API validates input, generates an ID, and appends a record to `data/sites.json`.
4. `/site/[id]` fetches the saved record and creates deterministic page copy using local templates in `lib/generator.ts`.
5. `brandStyle` controls tone and visual theme classes (spacing, typography, card style).

No external AI or API services are used.
