import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { closeModal } from '@/store/modalSlice';
import { Overlay, Dialog, CloseBtn } from './Modal.styles';

const Modal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, content } = useSelector((s: RootState) => s.modal);

  if (!isOpen) return null;

  return (
    <Overlay onClick={() => dispatch(closeModal())}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <CloseBtn aria-label="Fechar" onClick={() => dispatch(closeModal())}>×</CloseBtn>
        {content}
      </Dialog>
    </Overlay>
  );
};

export default Modal;