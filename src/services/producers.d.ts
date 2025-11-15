import type { Farmer } from '@/types/producer';
export type ProducersService = {
    listProducers: () => Promise<Farmer[]>;
    getProducer: (id: number) => Promise<Farmer>;
    createProducer: (payload: Omit<Farmer, 'id'>) => Promise<Farmer>;
    updateProducer: (id: number, payload: Partial<Omit<Farmer, 'id'>>) => Promise<Farmer>;
    deleteProducer: (id: number) => Promise<void>;
};
export declare function listProducers(params?: Record<string, string | number>): Promise<Farmer[]>;
export declare function getProducer(id: number): Promise<Farmer>;
export declare function createProducer(payload: Omit<Farmer, 'id'>): Promise<Farmer>;
export declare function updateProducer(id: number, payload: Partial<Farmer>): Promise<Farmer>;
export declare function deleteProducer(id: number): Promise<void>;
declare const producersService: ProducersService;
export default producersService;
