import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '@/store/modalSlice';
import Modal from './Modal';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

function renderWithStore(
	initialState = { modal: { isOpen: true, content: <div>Hi</div> } }
) {
	const store = configureStore({
		reducer: { modal: modalReducer },
		preloadedState: initialState as unknown as {
			modal: { isOpen: boolean; content: React.ReactNode };
		},
	});
	return render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Modal />
			</ThemeProvider>
		</Provider>
	);
}

describe('Modal', () => {
	it('renders content when open and closes on overlay click', async () => {
		const user = userEvent.setup();
		renderWithStore();

		expect(screen.getByText('Hi')).toBeInTheDocument();

		// click overlay (by clicking outside the dialog). Overlay wraps the dialog; pick its role by querying the background via document
		const overlay = screen.getByText('Hi').parentElement
			?.parentElement as HTMLElement;
		await user.click(overlay);

		expect(screen.queryByText('Hi')).not.toBeInTheDocument();
	});

	it('does not close when clicking inside dialog and closes with close button', async () => {
		const user = userEvent.setup();
		renderWithStore();

		const dialog = screen.getByText('Hi').parentElement as HTMLElement;
		await user.click(dialog);
		// still open
		expect(screen.getByText('Hi')).toBeInTheDocument();

		const closeBtn = screen.getByLabelText('Fechar');
		await user.click(closeBtn);
		expect(screen.queryByText('Hi')).not.toBeInTheDocument();
	});
});
