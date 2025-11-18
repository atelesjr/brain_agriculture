import { render, screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import ProducerForm from './ProducerForm';
import { store } from '@/store';
import { closeModal } from '@/store/modalSlice';
import { vi, afterEach, describe, it, expect } from 'vitest';

describe('ProducerForm', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders form and Cancel dispatches closeModal', async () => {
		const user = userEvent.setup();
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(<ProducerForm />);

		// heading
		expect(
			screen.getByRole('heading', { name: /formulário de produtor/i })
		).toBeInTheDocument();

		// Save button exists and is initially disabled (form empty)
		const save = screen.getByRole('button', { name: /salvar produtor/i });
		expect(save).toBeDisabled();

		// Cancel button dispatches closeModal
		const cancel = screen.getByRole('button', { name: /cancelar/i });
		await user.click(cancel);

		expect(dispatchSpy).toHaveBeenCalled();
		// assert called with closeModal action
		expect(dispatchSpy).toHaveBeenCalledWith(closeModal());
	});

	it('submits form when fields are filled and calls createProducer + closeModal', async () => {
		const user = userEvent.setup();

		// mock producers service to return created producer
		const created = {
			id: 999,
			name: 'Fulano',
			document: '52998224725',
			documentType: 'CPF',
			farms: [],
		};
		// suppress React 'act' warnings that surface from react-hook-form Controller updates
		const originalConsoleError = console.error.bind(console) as (...args: unknown[]) => void;
		vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
			const msg = args[0] as string | undefined;
			if (typeof msg === 'string' && msg.includes('not wrapped in act')) return;
			originalConsoleError(...args);
		});

		const producers = await import('@/services/producers');
		// spy on the default service object's createProducer used by the thunk
		vi.spyOn(producers.default, 'createProducer').mockResolvedValue(created);

		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(<ProducerForm />);

		const nameInput = screen.getByPlaceholderText(/digite o nome completo/i);
		const docInput = screen.getByPlaceholderText(/cpf ou cnpj/i);
		const save = screen.getByRole('button', { name: /salvar produtor/i });

		await user.type(nameInput, 'Fulano');
		await user.type(docInput, '52998224725');

		expect(save).toBeEnabled();

		await user.click(save);

		// wait for closeModal dispatch after successful create
		await waitFor(() => {
			expect(dispatchSpy).toHaveBeenCalled();
		});
		expect(dispatchSpy).toHaveBeenCalledWith(closeModal());
	});
});
