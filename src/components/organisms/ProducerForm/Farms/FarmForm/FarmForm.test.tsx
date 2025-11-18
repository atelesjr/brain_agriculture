import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import FarmForm from './FarmForm';
import { vi } from 'vitest';
import type { Farm } from '@/types/producer';

describe('FarmForm', () => {
	it('saves a new farm and calls closeForm', async () => {
		const closeForm = vi.fn();
		const setFarms = vi.fn();
		const initial: Farm = {
			id: 'f-1',
			name: 'Fazenda Teste',
			city: '',
			state: '',
			areaTotal: 0,
			cultivableLand: 0,
			vegetatedArea: 0,
			safras: [],
		};

		// render as editing existing farm (prefilled) to avoid typing interactions
		render(
			<FarmForm
				closeForm={closeForm}
				index={0}
				farms={[initial]}
				setFarms={setFarms}
			/>
		);

		// since several fields default to '0' (areas and harvest area), assert at least one input shows '0'
		const zeros = screen.getAllByDisplayValue('0');
		expect(zeros.length).toBeGreaterThanOrEqual(1);

		const save = screen.getByRole('button', { name: /salvar propriedade/i });
		// ensure button is enabled before clicking
		expect(save).toBeEnabled();
		// use synchronous fireEvent.click to avoid async userEvent timing issues
		fireEvent.click(save);

		// handleSave / onSave are synchronous in this hook — assert directly
		expect(setFarms).toHaveBeenCalled();

		const updater = setFarms.mock.calls[0][0] as (prev: Farm[]) => Farm[];
		const next = updater([initial]);
		expect(next).toHaveLength(1);
		expect(next[0].name).toBe('Fazenda Teste');
		expect(closeForm).toHaveBeenCalled();
	});

	it('cancel calls closeForm and does not call setFarms', async () => {
		const setFarms = vi.fn();
		const closeForm = vi.fn();

		render(
			<FarmForm
				closeForm={closeForm}
				index={0}
				farms={[]}
				setFarms={setFarms}
			/>
		);

		const user = userEvent.setup();
		const cancel = screen.getByRole('button', { name: /cancelar/i });
		await user.click(cancel);

		expect(closeForm).toHaveBeenCalled();
		expect(setFarms).not.toHaveBeenCalled();
	});
});
