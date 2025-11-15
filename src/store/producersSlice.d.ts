import type { Farmer } from '@/types/producer';
export interface ProducersState {
    items: Farmer[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export declare const fetchProducers: import("@reduxjs/toolkit").AsyncThunk<Farmer[], void, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const setProducers: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "producers/setProducers">, clearProducers: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"producers/clearProducers">;
declare const _default: import("redux").Reducer<ProducersState>;
export default _default;
