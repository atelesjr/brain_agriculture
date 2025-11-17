import { configureStore } from '@reduxjs/toolkit';
import producersReducer from './producersSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    producers: producersReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // We intentionally allow React nodes in `modal.content` for convenience.
        // Redux Toolkit warns about non-serializable values; to avoid noisy
        // warnings we ignore the modal content path here. For production
        // apps it's better to store serializable descriptors instead.
        ignoredActions: ['modal/openModal', 'modal/closeModal'],
        ignoredPaths: ['modal.content'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
