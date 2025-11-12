import { render, screen } from '@/test-utils';
import App from './App';

describe('App', () => {
	test('renderiza o título principal', () => {
		render(<App />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			/Vite \+ React/i
		);
	});
});
