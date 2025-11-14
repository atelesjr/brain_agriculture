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
    },
});

export const { setProducers, clearProducers } = producersSlice.actions;

export default producersSlice.reducer;
