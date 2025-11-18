# React + TypeScript + Vite

[![CI](https://github.com/atelesjr/brain_agriculture/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/atelesjr/brain_agriculture/actions/workflows/ci.yml)

````

## Mock API / Producers

This project includes a small mock REST API used for development, served by `json-server` from the `server/db.json` file.
<!-- ci: trigger -->

- Start the mock API server:

```powershell
npm run server
````

- Default API base URL: `http://localhost:3001`.
- Producers resource path: `/producer` (see `server/db.json`).

Client-side service helpers are available at `src/services/producers.ts` and use the types in `src/types/producer.ts`.

Example usage:

```ts
import producersService from '@/services/producers';

// list producers
const all = await producersService.listProducers();

 
## Project structure and rationale

This section documents how the project is organized and the reasoning behind the structure so reviewers can quickly find the code they need.

Top-level folders

- `src/` — application source code (React + TypeScript). Key subfolders:
	- `components/` — UI components organized by atomic/molecular/organism pattern:
		- `atoms/` — small, reusable building blocks (buttons, inputs, layout primitives).
		- `molecules/` — composed components built from atoms (Accordion, DocumentInput, IconButton wrappers).
		- `organisms/` — larger units that compose pages (Header, Modal, ProducerForm, Producers list).
	- `pages/` — page-level components that map to routes (Home, Dashboard, NotFound). Pages assemble organisms and provide page-specific layout and hooks.
	- `routes/` — application route definitions used by the router.
	- `store/` — Redux Toolkit slices and store configuration:
		- `producersSlice.ts` — producers CRUD + thunks (`fetchProducers`, `createProducer`, `updateProducer`, `deleteProducer`).
		- `modalSlice.ts` — simple open/close modal state that holds `ReactNode` content for convenience.
	- `services/` — thin wrappers for network calls (e.g. `producers.ts`) that interact with the mock `json-server` API.
	- `schemas/` — (if present) validation schemas for forms.
	- `styles/` — global styles, theme and media-queries used across the app.
	- `types/` — application domain TypeScript types (e.g. `producer.ts` describing `Farmer`, `Farm`, `Safra`, `Culture`).

Design decisions and patterns

- Atomic design: components are grouped by `atoms`, `molecules`, and `organisms` to make reuse and testing easier.
- Redux Toolkit: slices colocate reducer logic and async thunks. `producersSlice` encapsulates all business logic interacting with `producers`.
- Hooks for logic: heavier logic such as the Dashboard aggregation is extracted into hooks (e.g. `useDashboardData`) to make components pure and easier to test.
- Tests: Vitest + Testing Library with `happy-dom` provide a fast DOM environment. Tests use a project-specific serial runner (`scripts/run-tests-serial.cjs`) for deterministic order during CI and local QA.
- Charts: Recharts is used for visualizations. Because Recharts may behave differently in test DOMs, chart components render accessible HTML legends (in `ChartsPanel`) so tests can assert on visible, stable elements rather than SVG internals.

Where to find things quickly

- Dashboard aggregation logic: `src/pages/Dashboard/useDashboardData.ts`
- Charts component (reusable): `src/pages/Dashboard/ChartsPanel.tsx`
- Producer CRUD service: `src/services/producers.ts`
- Forms and validation: `src/components/organisms/ProducerForm/*`
- Store: `src/store/index.ts`, `src/store/producersSlice.ts`
- Tests: colocated alongside implementation files under `src/` and runnable with `npm run test:local`.

If you want more details in any specific area (e.g. tests, chart implementation, form validation), tell me which area and I will expand this README with code links and examples.
// get one
const one = await producersService.getProducer(1);

// create
const created = await producersService.createProducer({
	document: '000.000.000-00',
	documentType: 'CPF',
	name: 'Novo Produtor',
	farms: [],
});
```

If you want Vite to point to a different API during development, set `VITE_API_URL` in an `.env` file at the project root.

```

```

> Development note: use Node 18 or 20 (LTS). If you experience test worker timeouts on Windows, switch your local Node using `nvm` to a supported version (e.g. `nvm install 20 && nvm use 20`).

