import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import producersService from '@/services/producers';
import type { Farmer } from '@/types/producer';

const sample: Farmer[] = [
  {
    id: '1',
    document: '111.222.333-44',
    documentType: 'CPF',
    name: 'João da Silva',
    farms: [],
  },
];

describe('producers service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // ensure no stale env vars
    delete process.env.VITE_API_URL;
    delete process.env.REACT_APP_API_URL;
  });

  it('listProducers returns array', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => sample,
    }));

    const res = await producersService.listProducers();
    expect(res).toEqual(sample);
    expect(globalThis.fetch as Mock).toHaveBeenCalled();
  });

  it('getProducer returns item', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => sample[0],
    }));

    const res = await producersService.getProducer('1');
    expect(res).toEqual(sample[0]);
  });

  it('createProducer posts payload and returns created', async () => {
    const payload = { document: '000.000.000-00', documentType: 'CPF', name: 'Novo Produtor', farms: [] } as Omit<Farmer, 'id'>;
    const created = { ...payload, id: '2' } as Farmer;

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => created,
    }));

    const res = await producersService.createProducer(payload);
    expect(res).toEqual(created);
    expect(globalThis.fetch as Mock).toHaveBeenCalledWith(expect.stringContaining('/producers'), expect.objectContaining({ method: 'POST' }));
  });

  it('updateProducer puts and returns updated', async () => {
    const updated = { ...sample[0], name: 'Updated' } as Farmer;
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => updated,
    }));

    const res = await producersService.updateProducer('1', { name: 'Updated' });
    expect(res).toEqual(updated);
  });

  it('deleteProducer deletes without error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    await expect(producersService.deleteProducer('1')).resolves.toBeUndefined();
  });

  it('throws when response not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, text: async () => 'err' }));
    await expect(producersService.listProducers()).rejects.toThrow();
  });
});
