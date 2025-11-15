# React + TypeScript + Vite

[![CI](https://github.com/atelesjr/brain_agriculture/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/atelesjr/brain_agriculture/actions/workflows/ci.yml)

````

## Mock API / Producers

This project includes a small mock REST API used for development, served by `json-server` from the `server/db.json` file.

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
