import React from 'react';
type ModalState = {
    isOpen: boolean;
    content: React.ReactNode | null;
};
export declare const openModal: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<React.ReactNode, "modal/openModal">, closeModal: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/closeModal">;
declare const _default: import("redux").Reducer<ModalState>;
export default _default;
