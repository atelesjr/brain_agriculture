import { render, screen, fireEvent } from '@/test-utils';
import { describe, test, expect } from 'vitest';
import Accordion from './Accordion';
import type { Farmer } from '@/types/producer';

const makeFarmer = (): Farmer => ({
	id: 1,
	document: '123456789',
	documentType: 'CPF',
	name: 'João da Silva',
	farms: [
		{
			id: 'farm-1',
			name: 'Fazenda Teste',
			city: 'Cidade',
			state: 'ST',
			areaTotal: 100,
			cultivableLand: 80,
			vegetatedArea: 20,
			safras: [
				{
					year: 2023,
					name: 'Safra 2023',
					cultures: [{ name: 'Soja', areaPlanted: 10 }],
				},
			],
		},
	],
});

describe('Accordion component', () => {
	test('toggles open/closed and shows farms content', () => {
		const farmer = makeFarmer();
		render(<Accordion item={farmer} />);

		// locate the header by its visible text and find role=button ancestor
		const titleNode = screen.getByText(
			new RegExp(`id: "${farmer.id}" - ${farmer.name}`)
		);
		const header = titleNode.closest('[role="button"]');
		expect(header).toBeTruthy();

		// initially closed
		expect(header).toHaveAttribute('aria-expanded', 'false');
		// content exists in the DOM but should be hidden when accordion is closed
		expect(screen.getByText(/Selecione uma safra/i)).not.toBeVisible();

		// open
		fireEvent.click(header!);
		expect(header).toHaveAttribute('aria-expanded', 'true');
		// harvest placeholder should appear
		expect(screen.getByText(/Selecione uma safra/i)).toBeInTheDocument();
	});

	test('child harvest selection resets when accordion closes', () => {
		const farmer = makeFarmer();
		render(<Accordion item={farmer} />);

		const titleNode = screen.getByText(
			new RegExp(`id: "${farmer.id}" - ${farmer.name}`)
		);
		const header = titleNode.closest('[role="button"]');

		// open
		fireEvent.click(header!);

		// open harvest dropdown and select the safra
		const toggle = screen.getByRole('button', { name: /Safras/i });
		fireEvent.click(toggle);
		const items = screen.getAllByRole('menuitem');
		fireEvent.click(items[0]);

		// details should be visible now
		expect(screen.getByText(/Safra:/i)).toBeInTheDocument();
		expect(screen.getByText('2023')).toBeInTheDocument();

		// close accordion (this should bump resetCounter)
		fireEvent.click(header!);
		expect(header).toHaveAttribute('aria-expanded', 'false');

		// reopen
		fireEvent.click(header!);

		// selection should have been reset to placeholder
		expect(screen.getByText(/Selecione uma safra/i)).toBeInTheDocument();
	});
});
