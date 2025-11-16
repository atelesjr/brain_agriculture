import { render, screen } from '@/test-utils';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('Header', () => {
	it('renderiza título e links de navegação', () => {
		const nav = [
			{ to: '/', label: 'Home' },
			{ to: '/dashboard', label: 'Dashboard' },
		];

		render(
			<MemoryRouter>
				<Header title="Meu App" nav={nav} />
			</MemoryRouter>
		);

		expect(screen.getByRole('banner')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			/Meu App/i
		);
		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Dashboard')).toBeInTheDocument();
	});
});
