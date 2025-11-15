export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    producers: import("./producersSlice").ProducersState;
    modal: {
        isOpen: boolean;
        content: React.ReactNode | null;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        producers: import("./producersSlice").ProducersState;
        modal: {
            isOpen: boolean;
            content: React.ReactNode | null;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
