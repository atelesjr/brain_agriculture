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
});
