import type { Farmer } from '@/types/producer';

type ImportMetaWithEnv = ImportMeta & {
	readonly env?: {
		VITE_API_URL?: string;
	};
};

export type ProducersService = {
	listProducers: () => Promise<Farmer[]>;
	getProducer: (id: string) => Promise<Farmer>;
	createProducer: (payload: Omit<Farmer, 'id'>) => Promise<Farmer>;
	updateProducer: (
		id: string,
		payload: Partial<Omit<Farmer, 'id'>>
	) => Promise<Farmer>;
	deleteProducer: (id: string) => Promise<void>;
};

const DEFAULT_BASE = 'http://localhost:3001';
// Use `import.meta.env` in Vite/browser and fall back to `process.env` for Node/test environments.
const apiFromImportMeta =
	typeof import.meta !== 'undefined'
		? ((import.meta as ImportMetaWithEnv).env?.VITE_API_URL as
			| string
			| undefined)
		: undefined;
const apiFromProcess =
	typeof process !== 'undefined'
		? (process.env.REACT_APP_API_URL as string | undefined)
		: undefined;
// Determine API base priority:
// 1. `VITE_API_URL` (import.meta.env)
// 2. `REACT_APP_API_URL` (process.env)
// 3. In local dev (Vite `DEV`), use `DEFAULT_BASE` so the app talks to
//    a local json-server running on localhost:3001.
// 4. In production (no env set and not DEV), leave undefined so we can use
//    `window.location.origin` in the browser and avoid hardcoded localhost.
const isViteDev =
	typeof import.meta !== 'undefined' && !!(import.meta as any).env?.DEV;
const API_BASE = apiFromImportMeta || apiFromProcess || (isViteDev ? DEFAULT_BASE : undefined);
const RESOURCE = 'producers';

function buildUrl(path = '', params?: Record<string, string | number>) {
	const resourcePath = `${RESOURCE}${path}`.replace(/\/\//g, '/').replace(/^(?!\/)/, '/');
	// Determine base:
	// - if API_BASE is explicitly set (VITE_API_URL), use it
	// - else if running in browser, use window.location.origin
	// - else fall back to DEFAULT_BASE (node/test)
	const base = API_BASE
		? API_BASE.replace(/\/$/, '')
		: typeof window !== 'undefined' && window.location
		? window.location.origin
		: DEFAULT_BASE;

	const url = new URL(`${base}${resourcePath}`);
	if (params) {
		Object.entries(params).forEach(([k, v]) =>
			url.searchParams.append(k, String(v))
		);
	}
	return url.toString();
}

async function handleResponse<T>(res: Response) {
	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw new Error(text || `Request failed with status ${res.status}`);
	}
	return (await res.json()) as T;
}

export async function listProducers(
	params?: Record<string, string | number>
): Promise<Farmer[]> {
	const url = buildUrl('', params);
	try {
		const res = await fetch(url);
		const data = await handleResponse<Farmer[]>(res);
		return data;
	} catch (err) {
		// Network errors can happen in production when no API is configured
		// (e.g., static deploy on Vercel). Log and return an empty list so
		// the Home page can render gracefully instead of crashing.
		// Encourage setting `VITE_API_URL` in production to point to a
		// real API.
		// eslint-disable-next-line no-console
		console.error('Failed to fetch producers from', url, err);
		return [] as Farmer[];
	}
}

export async function getProducer(id: string): Promise<Farmer> {
	const url = buildUrl(`/${id}`);
	const res = await fetch(url);
	return handleResponse<Farmer>(res);
}

export async function createProducer(
	payload: Omit<Farmer, 'id'>
): Promise<Farmer> {
	const url = buildUrl();
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	return handleResponse<Farmer>(res);
}

export async function updateProducer(
	id: string,
	payload: Partial<Farmer>
): Promise<Farmer> {
	const url = buildUrl(`/${id}`);
	const res = await fetch(url, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	return handleResponse<Farmer>(res);
}

export async function deleteProducer(id: string): Promise<void> {
	const url = buildUrl(`/${id}`);
	const res = await fetch(url, { method: 'DELETE' });
	if (!res.ok) throw new Error(`Failed to delete producer ${id}`);
}

const producersService: ProducersService = {
	listProducers,
	getProducer,
	createProducer,
	updateProducer,
	deleteProducer,
};

export default producersService;
