import React from 'react';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import HarvestItem from './HarvestItem';

describe('HarvestItem', () => {
	it('renders values from harvest prop', () => {
		const harvest = { year: '2020', crop: 'Corn', area: '10' };
		const onChange = vi.fn();
		const addHarvest = vi.fn();
		const removeHarvest = vi.fn();

		render(
			<HarvestItem
				index={0}
				harvest={harvest}
				isLast={false}
				onChange={onChange}
				addHarvest={addHarvest}
				removeHarvest={removeHarvest}
			/>
		);

		// Input labels are rendered separately from inputs (no htmlFor), use placeholders/display value
		expect(screen.getByPlaceholderText(/Ano/i)).toHaveValue('2020');
		expect(screen.getByPlaceholderText(/Digite a cultura/i)).toHaveValue(
			'Corn'
		);
		expect(screen.getByDisplayValue('10')).toBeInTheDocument();
	});

	it('calls onChange when inputs change', async () => {
		const initialHarvest = { year: '', crop: '', area: '0' };
		const onChangeMock = vi.fn();
		const addHarvest = vi.fn();
		const removeHarvest = vi.fn();
		const user = userEvent.setup();

		// Host component to simulate a parent that updates the harvest prop when onChange is called
		const Host: React.FC = () => {
			const [h, setH] = React.useState(initialHarvest);
			const handleChange = (index: number, field: string, value: string) => {
				onChangeMock(index, field, value);
				setH((prev) => ({ ...prev, [field]: value }));
			};

			return (
				<HarvestItem
					index={2}
					harvest={h}
					isLast={false}
					onChange={handleChange}
					addHarvest={addHarvest}
					removeHarvest={removeHarvest}
				/>
			);
		};

		render(<Host />);

		const inputs = screen.getAllByRole('textbox');

		// inputs: [year, crop, area]
		await user.type(inputs[0], '1999');
		// input may trigger multiple incremental calls; assert the displayed value updated
		expect(screen.getByDisplayValue('1999')).toBeInTheDocument();
		expect(
			onChangeMock.mock.calls.some(
				(c: unknown[]) => (c[0] as number) === 2 && (c[1] as string) === 'year'
			)
		).toBe(true);

		await user.type(inputs[1], 'Wheat');
		expect(screen.getByDisplayValue('Wheat')).toBeInTheDocument();
		expect(
			onChangeMock.mock.calls.some(
				(c: unknown[]) => (c[1] as string) === 'crop'
			)
		).toBe(true);

		await user.type(inputs[2], '25');
		// initial area defaults to '0' for new harvests, so typing '25' yields '025'
		expect(screen.getByDisplayValue('025')).toBeInTheDocument();
		expect(
			onChangeMock.mock.calls.some(
				(c: unknown[]) => (c[1] as string) === 'area'
			)
		).toBe(true);
	});

	it('shows add button when isLast and calls addHarvest', async () => {
		const harvest = { year: '', crop: '', area: '0' };
		const onChange = vi.fn();
		const addHarvest = vi.fn();
		const removeHarvest = vi.fn();
		const user = userEvent.setup();

		render(
			<HarvestItem
				index={1}
				harvest={harvest}
				isLast={true}
				onChange={onChange}
				addHarvest={addHarvest}
				removeHarvest={removeHarvest}
			/>
		);

		const addBtn = screen.getByLabelText(/Adicionar/i);
		await user.click(addBtn);
		expect(addHarvest).toHaveBeenCalledTimes(1);
	});

	it('calls removeHarvest with index when delete clicked', async () => {
		const harvest = { year: '', crop: '', area: '0' };
		const onChange = vi.fn();
		const addHarvest = vi.fn();
		const removeHarvest = vi.fn();
		const user = userEvent.setup();

		render(
			<HarvestItem
				index={5}
				harvest={harvest}
				isLast={false}
				onChange={onChange}
				addHarvest={addHarvest}
				removeHarvest={removeHarvest}
			/>
		);

		const deleteBtn = screen.getByLabelText(/Excluir/i);
		await user.click(deleteBtn);
		expect(removeHarvest).toHaveBeenCalledWith(5);
	});
});

export {};
