import React from 'react';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FarmsList from './FarmsList';
import type { Farm } from '@/types/producer';

describe('FarmsList', () => {
	it('shows empty message when no farms', () => {
		render(<FarmsList farms={[]} />);
		expect(
			screen.getByText(/Nenhuma propriedade cadastrada/i)
		).toBeInTheDocument();
	});

	it('renders farms and toggles Harvest on header click', async () => {
		const farms: Farm[] = [
			{
				id: 'f1',
				name: 'Farm One',
				city: 'CityA',
				state: 'ST',
				areaTotal: 100,
				cultivableLand: 50,
				vegetatedArea: 10,
				safras: [],
			},
		];

		const user = userEvent.setup();
		render(<FarmsList farms={farms} />);

		// find the header element (role=button) by locating the element that contains the farm name
		const header = screen
			.getByText(/Farm One/i)
			.closest('[role="button"]') as HTMLElement;
		expect(header).toBeTruthy();

		// header starts closed
		expect(header.getAttribute('aria-expanded')).toBe('false');

		// the next sibling is the HarvestSection with aria-hidden attribute
		const harvestSection = header.nextElementSibling as HTMLElement | null;
		expect(harvestSection).toBeTruthy();
		expect(harvestSection?.getAttribute('aria-hidden')).toBe('true');

		// open
		await user.click(header);
		expect(header.getAttribute('aria-expanded')).toBe('true');
		expect(harvestSection?.getAttribute('aria-hidden')).toBe('false');

		// close again
		await user.click(header);
		expect(header.getAttribute('aria-expanded')).toBe('false');
		expect(harvestSection?.getAttribute('aria-hidden')).toBe('true');
	});

	it('shows edit/delete buttons when editing and calls callbacks without toggling', async () => {
		const farms: Farm[] = [
			{
				id: 'f2',
				name: 'Farm Two',
				city: 'CityB',
				state: 'SB',
				areaTotal: 200,
				cultivableLand: 150,
				vegetatedArea: 20,
				safras: [],
			},
		];

		const onEdit = vi.fn();
		const onRemove = vi.fn();
		const user = userEvent.setup();

		render(
			<FarmsList farms={farms} isEditing onEdit={onEdit} onRemove={onRemove} />
		);

		// find the farm container by its name and scope queries within it
		const header = screen
			.getByText(/Farm Two/i)
			.closest('[role="button"]') as HTMLElement;
		expect(header).toBeTruthy();

		// find actual <button> elements (IconButton renders a button tag) inside the header
		const buttons = Array.from(
			header.querySelectorAll('button')
		) as HTMLButtonElement[];
		expect(buttons.length).toBeGreaterThanOrEqual(2);

		// click edit (first icon)
		await user.click(buttons[0]);
		expect(onEdit).toHaveBeenCalledWith(0);

		// clicking icon should not open the harvest section (header stays closed)
		expect(header.getAttribute('aria-expanded')).toBe('false');

		// click delete (second icon)
		await user.click(buttons[1]);
		expect(onRemove).toHaveBeenCalledWith(0);
	});
});

export {};
