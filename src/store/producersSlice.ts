import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import producersService from '@/services/producers';
import type { Farmer } from '@/types/producer';

export interface ProducersState {
    items: Farmer[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProducersState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchProducers = createAsyncThunk('producers/fetch', async () => {
    const data = await producersService.listProducers();
    return data;
});

export const createProducer = createAsyncThunk(
    'producers/create',
    async (payload: Omit<Farmer, 'id'>) => {
        const created = await producersService.createProducer(payload);
        return created;
    }
);

export const deleteProducer = createAsyncThunk(
    'producers/delete',
    async (id: number) => {
        await producersService.deleteProducer(id);
        return id;
    }
);

export const updateProducer = createAsyncThunk(
    'producers/update',
    async ({ id, payload }: { id: number; payload: Partial<Omit<Farmer, 'id'>> }) => {
        const updated = await producersService.updateProducer(id, payload as Partial<Farmer>);
        return updated;
    }
);

const producersSlice = createSlice({
    name: 'producers',
    initialState,
    reducers: {
        setProducers(state, action) {
            state.items = action.payload;
        },
        clearProducers(state) {
            state.items = [];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load producers';
            });

        builder
            .addCase(createProducer.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProducer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // append created producer
                state.items.push(action.payload);
            })
            .addCase(createProducer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create producer';
            });

        builder
            .addCase(deleteProducer.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProducer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // remove producer by id
                state.items = state.items.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProducer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete producer';
            });

        builder
            .addCase(updateProducer.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProducer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // replace updated producer
                state.items = state.items.map((p) => (p.id === action.payload.id ? action.payload : p));
            })
            .addCase(updateProducer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update producer';
            });
    },
});

export const { setProducers, clearProducers } = producersSlice.actions;

export default producersSlice.reducer;
