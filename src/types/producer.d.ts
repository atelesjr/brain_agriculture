import { z } from 'zod';
import producerSchema from '@/schemas/producerSchema';
type RawFarmer = z.infer<typeof producerSchema>;
type RawFarm = NonNullable<RawFarmer['farms']>[number];
type RawSafra = NonNullable<RawFarm['safras']>[number];
type RawCulture = NonNullable<RawSafra['cultures']>[number];
export type Culture = RawCulture;
export type Safra = RawSafra;
export type Farm = Omit<RawFarm, 'safras'> & {
    safras: NonNullable<RawFarm['safras']> extends Array<infer S> ? S[] : [];
};
export type Farmer = Omit<RawFarmer, 'farms'> & {
    farms: NonNullable<RawFarmer['farms']> extends Array<infer F> ? F[] : [];
};
export {};
