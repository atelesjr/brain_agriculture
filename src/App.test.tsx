import { render, screen } from '@/test-utils';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest';

describe('App', () => {
	test('renderiza o título principal', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(
			screen.getByRole('heading', { name: /Brain Agriculture/i })
		).toHaveTextContent(/Brain Agriculture/i);
	});

	test('renderiza links de navegação no header', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		// nav links declared in App: 'Início' -> '/', 'Painel' -> '/dashboard'
		const inicio = screen.getByRole('link', { name: /Início/i });
		const painel = screen.getByRole('link', { name: /Painel/i });

		expect(inicio).toBeInTheDocument();
		expect(inicio).toHaveAttribute('href', '/');

		expect(painel).toBeInTheDocument();
		expect(painel).toHaveAttribute('href', '/dashboard');
	});
});
