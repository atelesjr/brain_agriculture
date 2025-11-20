# Brain Agriculture — Delivery Guide

[![CI](https://github.com/atelesjr/brain_agriculture/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/atelesjr/brain_agriculture/actions/workflows/ci.yml)

This file contains installation, test and delivery instructions intended for the final handoff.

## Quick summary

- Project: React + TypeScript + Vite
- State: Redux Toolkit
- Charts: Recharts
- Styling: styled-components
- Forms & validation: react-hook-form + zod
- Tests: Vitest + Testing Library (happy-dom)
- Mock API: json-server (dev)

## Prerequisites

- Node.js >= 18
- npm

## Install

```powershell
npm install
```

## Development

Start mock API (separate terminal):

```powershell
npm run server
```

Start dev server:

```powershell
npm run dev
```

Open: http://localhost:5173

Alternatively, start both the dev server and the mock API together (single terminal):

```powershell
npm run dev:all
```

This runs `vite` and `json-server` concurrently so you can develop without opening multiple terminals.

## Tests

Run the full deterministic suite (project serial runner):

```powershell
npm run test:local
```

Run vitest once (parallel):

```powershell
npm run test:run
```

Run a single test file:

```powershell
npx vitest run src/pages/Home/index.test.tsx --reporter=verbose
```

## Build

To verify TypeScript + Vite build:

```powershell
npm run build
```

## Notes about Dashboard and tests

- `useDashboardData` contains aggregation logic for totals and chart data.
- `ChartsPanel` renders three pie charts and also exposes accessible HTML legends so tests do not rely on Recharts internals.
- Tests were stabilized by adding explicit legends and fixing fixtures to match `src/types/producer.ts` types.

## Forms and validation

- The application uses `react-hook-form` for form state management and integration with UI inputs.
- `zod` is used to declare validation schemas that are integrated with `react-hook-form` via `@hookform/resolvers`.

This combination provides performant form state, decoupled validation schemas and strong TypeScript inference for form values.

## Create a PR

1. Push branch:

```powershell
git push -u origin feat/Dashboard
```

2. Open compare page in browser:

https://github.com/atelesjr/brain_agriculture/compare/feat/Dashboard?expand=1

3. Suggested PR title: `feat(dashboard): add ChartsPanel, useDashboardData and tests`

If you have `gh` available:

```powershell
gh pr create --base main --head feat/Dashboard --title "feat(dashboard): add ChartsPanel, useDashboardData and tests" --body "See commits for details."
```

## Delivery checklist

- [ ] Run `npm run test:local` and confirm all tests pass
- [ ] Run `npm run build` successfully
- [ ] Open PR and request review

---

If you want, I can:

- Run `npm run build` and upload artifacts
- Create a draft PR body and open a PR (requires `gh` or manual confirmation to open in browser)
- Prepare deployment instructions (Vercel/Netlify/Docker)

## Project structure

Top-level tree (important files and folders):

```
.
├─ .github/
│  └─ workflows/ci.yml
├─ public/
├─ server/
│  └─ db.json
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ atoms/
│  │  ├─ molecules/
│  │  └─ organisms/
│  ├─ hooks/
│  ├─ pages/
│  │  ├─ Dashboard/
│  │  └─ Home/
│  ├─ routes/
│  ├─ services/
│  ├─ store/
│  ├─ styles/
	│  └─ GlobalStyles.tsx
│  └─ types/
├─ dist/ (build output)
├─ scripts/
├─ test-results/
├─ README_DELIVERY.md
├─ README.md
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

If you want a more detailed tree (including tests and internal files), I can generate it and append here.

````

## Mock API / Producers

This project includes a small mock REST API used for development, served by `json-server` from the `server/db.json` file.

<!-- ci: trigger -->

- Start the mock API server (separate terminal):

```powershell
npm run server
```

- Default API base URL: `http://localhost:3001`.
- Producers resource path: `/producers` (see `server/db.json`).

Client-side service helpers are available at `src/services/producers.ts` and use the types in `src/types/producer.ts`.

Example usage:

```ts
import producersService from '@/services/producers';

// list producers
const all = await producersService.listProducers();
```

## Production / Deploy notes

- The frontend reads the API base from `import.meta.env.VITE_API_URL` at build time. When deploying to Vercel (or similar), set the environment variable `VITE_API_URL` to the production API URL.
	- Example (Render fake API): `https://brain-agriculture-api-4qkm.onrender.com`
	- The client code now strips trailing slashes, but it's good practice to set the env value without a trailing slash.

- Important: Vite inlines `import.meta.env` values during the build, so the runtime host must be the one configured in the environment used for the production build (Vercel build settings).

- If you deploy the mock API (json-server) to a service like Render, ensure the start command points to `server/db.json` (we include `render.yaml` and `Dockerfile` in the repo for convenience).

- To verify production after deploy:
	1. Open the deployed site.
 2. In the browser devtools Network tab, confirm requests go to the API URL defined in `VITE_API_URL` and that the resource path `/producers` returns JSON (HTTP 200).

## Useful commands

- Start both dev server + mock API in one terminal:

```powershell
npm run dev:all
```

````
