import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Dropdown from './Dropdown';

describe('Dropdown atom', () => {
	it('opens menu when toggle is clicked and calls onSelect when item clicked', async () => {
		const user = userEvent.setup();
		const fn1 = vi.fn();
		const fn2 = vi.fn();

		render(
			<Dropdown
				label="Opções"
				items={[
					{ id: 'a', label: 'Item A', onSelect: fn1 },
					{ id: 'b', label: 'Item B', onSelect: fn2 },
				]}
			/>
		);

		const toggle = screen.getByRole('button', { name: /opções/i });
		await user.click(toggle);

		// items should be visible
		expect(screen.getByText('Item A')).toBeInTheDocument();
		expect(screen.getByText('Item B')).toBeInTheDocument();

		// click item A
		await user.click(screen.getByText('Item A'));
		expect(fn1).toHaveBeenCalledWith('a');

		// menu should close after selection
		expect(screen.queryByText('Item A')).not.toBeInTheDocument();
	});

	it('closes when clicking outside', async () => {
		const user = userEvent.setup();
		render(
			<div>
				<Dropdown
					label="Menu"
					items={[{ id: 1, label: 'One', onSelect: () => {} }]}
				/>
				<button>outside</button>
			</div>
		);

		const toggle = screen.getByRole('button', { name: /menu/i });
		await user.click(toggle);
		expect(screen.getByText('One')).toBeInTheDocument();

		// click outside
		await user.click(screen.getByText('outside'));
		expect(screen.queryByText('One')).not.toBeInTheDocument();
	});
});
