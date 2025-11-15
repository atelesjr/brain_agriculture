import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Harvest from './Harvests';
import type { Farm, Safra } from '@/types/producer';

const makeFarm = (): Farm & { safras: Safra[] } => ({
	id: 'farm-1',
	name: 'Fazenda Teste',
	city: 'Cidade',
	state: 'ST',
	areaTotal: 100,
	cultivableLand: 80,
	vegetatedArea: 20,
	safras: [
		{
			year: 2022,
			name: 'Safra 2022',
			cultures: [{ name: 'Soja', areaPlanted: 10 }],
		},
		{
			year: 2023,
			name: 'Safra 2023',
			cultures: [{ name: 'Milho', areaPlanted: 5 }],
		},
	],
});

describe('Harvests component', () => {
	test('shows placeholder when no safra selected', () => {
		const farm = makeFarm();
		render(
			<ThemeProvider theme={theme}>
				<Harvest farm={farm} />
			</ThemeProvider>
		);

		expect(screen.getByText(/Selecione uma safra/i)).toBeInTheDocument();
	});

	test('opens dropdown and selects a safra showing details', () => {
		const farm = makeFarm();
		render(
			<ThemeProvider theme={theme}>
				<Harvest farm={farm} />
			</ThemeProvider>
		);

		// open dropdown
		const toggle = screen.getByRole('button', { name: /Safras/i });
		fireEvent.click(toggle);

		// menu items should appear
		const items = screen.getAllByRole('menuitem');
		expect(items.length).toBeGreaterThanOrEqual(2);

		// click the second item (2023)
		fireEvent.click(items[1]);

		// After selection, the placeholder should be replaced with details
		expect(screen.queryByText(/Selecione uma safra/i)).not.toBeInTheDocument();
		expect(screen.getByText('Safra:')).toBeInTheDocument();
		expect(screen.getByText('2023')).toBeInTheDocument();
		// culture name and area
		expect(screen.getByText(/Milho/i)).toBeInTheDocument();
		expect(screen.getByText(/5 ha/)).toBeInTheDocument();
	});

	test('resets selection when resetCounter changes', () => {
		const farm = makeFarm();
		const { rerender } = render(
			<ThemeProvider theme={theme}>
				<Harvest farm={farm} />
			</ThemeProvider>
		);

		// select a safra first
		const toggle = screen.getByRole('button', { name: /Safras/i });
		fireEvent.click(toggle);
		const items = screen.getAllByRole('menuitem');
		fireEvent.click(items[0]); // select first

		expect(screen.queryByText(/Selecione uma safra/i)).not.toBeInTheDocument();

		// now rerender with resetCounter changed
		rerender(
			<ThemeProvider theme={theme}>
				<Harvest farm={farm} resetCounter={1} />
			</ThemeProvider>
		);

		// selection should be reset
		expect(screen.getByText(/Selecione uma safra/i)).toBeInTheDocument();
	});
});
