import { configureStore } from '@reduxjs/toolkit';
import producersReducer from './producersSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    producers: producersReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
