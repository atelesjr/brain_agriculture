import type { Farmer } from '@/types/producer';

const DEFAULT_BASE = 'http://localhost:3001';
// Use `import.meta.env` in Vite/browser and fall back to `process.env` for Node/test environments.
const apiFromImportMeta = typeof import.meta !== 'undefined' ? ( (import.meta as any).env?.VITE_API_URL as string | undefined) : undefined;
const apiFromProcess = typeof process !== 'undefined' ? (process.env.REACT_APP_API_URL as string | undefined) : undefined;
const API_BASE = apiFromImportMeta || apiFromProcess || DEFAULT_BASE;
const RESOURCE = 'producers';

function buildUrl(path = '', params?: Record<string, string | number>) {
	const url = new URL(`${API_BASE}/${RESOURCE}${path}`);
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

export async function getProducer(id: number): Promise<Farmer> {
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
	id: number,
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

export async function deleteProducer(id: number): Promise<void> {
	const url = buildUrl(`/${id}`);
	const res = await fetch(url, { method: 'DELETE' });
	if (!res.ok) throw new Error(`Failed to delete producer ${id}`);
}

const producersService = {
	listProducers,
	getProducer,
	createProducer,
	updateProducer,
	deleteProducer,
};

export default producersService;
