# Producers API (json-server)

This project uses `json-server` to provide a mock REST API. The producers collection in `server/db.json` is available at the `/producer` endpoint.

Run the mock server (project root):

```powershell
npm run server
```

Default base URL: `http://localhost:3001`.

Service usage (TypeScript)

```ts
import producersService from '@/services/producers';

// list all producers
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

// update
const updated = await producersService.updateProducer(1, { name: 'Nome atualizado' });

// delete
await producersService.deleteProducer(123);
```

Notes
- The service reads `VITE_API_URL` (or `REACT_APP_API_URL`) if provided; otherwise it defaults to `http://localhost:3001`.
- The collection name in the DB is `producer` (singular) — the service uses that resource path.
