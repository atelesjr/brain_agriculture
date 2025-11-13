import { render, screen } from '@/test-utils';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
		test('renderiza o título principal', () => {
			render(
				<MemoryRouter>
					<App />
				</MemoryRouter>
			);
			expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
				/Brain Agriculture/i
			);
	});
});
