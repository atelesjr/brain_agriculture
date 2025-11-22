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
const rawBase = (
	apiFromImportMeta ||
	apiFromProcess ||
	DEFAULT_BASE ||
	''
).toString();
// Ensure no trailing slash so we don't produce '...//resource' when concatenating
const API_BASE = rawBase.replace(/\/+$/, '');
const RESOURCE = 'producers';

function buildUrl(path = '', params?: Record<string, string | number>) {
	// Ensure no double slashes when combining base, resource and path.
	// - strip leading slashes from `path`
	// - ensure base ends with a single slash for URL constructor
	const cleanPath = path ? path.replace(/^\/+/, '') : '';
	const baseWithSlash = API_BASE.replace(/\/+$/, '') + '/';
	const url = new URL(`${RESOURCE}/${cleanPath}`, baseWithSlash);
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
	const res = await fetch(url);
	return handleResponse<Farmer[]>(res);
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
