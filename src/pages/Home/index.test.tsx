import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import Home from './index';
import store from '@/store';
import { describe, it, expect } from 'vitest';

describe('Home page', () => {
    it('renders heading, add button and opens modal on click', async () => {
        render(<Home />);

        // heading
        expect(
            screen.getByRole('heading', { name: /Cadastro de Produtores Rurais/i })
        ).toBeInTheDocument();

        // add button exists
        const addBtn = screen.getByRole('button', { name: /Adicionar Produtor/i });
        expect(addBtn).toBeInTheDocument();

        // click opens modal (store should reflect it)
        await userEvent.click(addBtn);

        const state = store.getState();
        expect(state.modal.isOpen).toBe(true);
        expect(state.modal.content).not.toBeNull();
    });
});

export {};
