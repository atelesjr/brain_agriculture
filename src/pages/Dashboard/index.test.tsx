import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from '@/store';
import { setProducers } from '@/store/producersSlice';
import { theme } from '@/styles/theme';
import Dashboard from './index';

import { describe, it, expect } from 'vitest';

describe('Dashboard page', () => {
	it('renders totals and charts when producers state is populated', () => {
		const items = [
			{
				id: '1',
				name: 'Farmer 1',
				document: '',
				documentType: '',
				farms: [
					{
						id: 'f1',
						// added required fields
						name: 'Farm 1',
						city: 'Campinas',
						state: 'SP',
						areaTotal: 10,
						cultivableLand: 5,
						vegetatedArea: 2,
						safras: [
							{
								year: 2024,
								name: 'Safra 1',
								cultures: [{ name: 'Soja', areaPlanted: 50 }],
							},
						],
					},
				],
			},
			{
				id: '2',
				name: 'Farmer 2',
				document: '',
				documentType: '',
				farms: [
					{
						id: 'f2',
						// added required fields
						name: 'Farm 2',
						city: 'Belo Horizonte',
						state: 'MG',
						areaTotal: 8,
						cultivableLand: 3,
						vegetatedArea: 1,
						safras: [
							{
								year: 2024,
								name: 'Safra 2',
								cultures: [{ name: 'Trigo', areaPlanted: 10 }],
							},
						],
					},
				],
			},
		];

		// use the real app store and inject producers for testing
		store.dispatch(setProducers(items));

		render(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Dashboard />
				</ThemeProvider>
			</Provider>
		);

		// check that labels are present
		expect(
			screen.getByText(/Total de propriedades cadastradas:/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Total de hectares registrados:/i)
		).toBeInTheDocument();

		// totals should reflect provided items: 2 producers with 2 farms total
		expect(screen.getByText('2')).toBeInTheDocument();

		// a legend label from ChartsPanel should be rendered
		expect(screen.getByText('Soja')).toBeInTheDocument();
	});
});

export {};
