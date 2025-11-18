import { render, waitFor } from '@/test-utils';
import { act } from '@testing-library/react';
import { vi } from 'vitest';
import useFarmForm from './useFarmForm';
import type { Farm } from '@/types/producer';

function HookHost({
	initial,
	capture,
	onSave,
	onCancel,
}: {
	initial?: Farm;
	capture: React.MutableRefObject<ReturnType<typeof useFarmForm> | null>;
	onSave?: (f: Farm, i: number) => void;
	onCancel?: () => void;
}) {
	const hook = useFarmForm({ initial, index: 0, onSave, onCancel });
	// assign synchronously during render so tests can read updated value immediately
	capture.current = hook;
	return null;
}

describe('useFarmForm', () => {
	it('initializes from initial farm and maps safras -> harvests', async () => {
		const initial: Farm = {
			id: 'f-1',
			name: 'Old Farm',
			city: 'City',
			state: 'ST',
			areaTotal: 100,
			cultivableLand: 50,
			vegetatedArea: 10,
			safras: [
				{
					year: 2020,
					name: 'Safra 2020',
					cultures: [{ name: 'Corn', areaPlanted: 5 }],
				},
			],
		};

		const capture: React.MutableRefObject<ReturnType<
			typeof useFarmForm
		> | null> = { current: null };
		render(<HookHost initial={initial} capture={capture} />);

		await waitFor(() => expect(capture.current).not.toBeNull());

		const hook = capture.current!;
		expect(hook.form.name).toBe('Old Farm');
		expect(hook.harvests).toEqual([{ year: '2020', crop: 'Corn', area: '5' }]);
	});

	it('setField updates form and isValid reflects name presence', async () => {
		const capture: React.MutableRefObject<ReturnType<
			typeof useFarmForm
		> | null> = { current: null };
		render(<HookHost capture={capture} />);

		await waitFor(() => expect(capture.current).not.toBeNull());
		const hook = capture.current!;

		expect(hook.isValid).toBe(false);
		act(() => hook.setField('name', 'My Farm'));
		await waitFor(() => expect(capture.current?.form.name).toBe('My Farm'));
		expect(capture.current?.isValid).toBe(true);
	});

	it('handleSave builds safras and calls onSave with updated farm', async () => {
		const onSave = vi.fn();
		const capture: React.MutableRefObject<ReturnType<
			typeof useFarmForm
		> | null> = { current: null };
		render(<HookHost capture={capture} onSave={onSave} />);

		await waitFor(() => expect(capture.current).not.toBeNull());

		act(() => capture.current!.setField('name', 'Saved Farm'));
		act(() =>
			capture.current!.setHarvests([{ year: '2021', crop: 'Soy', area: '12' }])
		);

		act(() => {
			(capture.current as ReturnType<typeof useFarmForm>).handleSave();
		});

		await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
		const calledArg = onSave.mock.calls[0][0] as Farm;
		expect(calledArg.name).toBe('Saved Farm');
		expect(calledArg.safras).toHaveLength(1);
		expect(calledArg.safras[0].year).toBe(2021);
		expect(calledArg.safras[0].cultures).toHaveLength(1);
		expect(calledArg.safras[0].cultures[0].name).toBe('Soy');
		expect(calledArg.safras[0].cultures[0].areaPlanted).toBe(12);
	});

	it('detects area error when initial values have cultivable+vegetated > total', async () => {
		const initial: Farm = {
			id: 'f-err',
			name: 'Err Farm',
			city: 'City',
			state: 'ST',
			areaTotal: 10,
			cultivableLand: 8,
			vegetatedArea: 5,
			safras: [],
		};

		const capture: React.MutableRefObject<ReturnType<
			typeof useFarmForm
		> | null> = { current: null };
		render(<HookHost initial={initial} capture={capture} />);

		await waitFor(() => expect(capture.current).not.toBeNull());
		const hook = capture.current!;

		// initial form keeps provided areaTotal and cult/veg values
		expect(hook.form.areaTotal).toBe('10');
		expect(hook.form.cultivableLand).toBe('8');
		expect(hook.form.vegetatedArea).toBe('5');

		// because 8 + 5 > 10, there must be an area error and the form is not valid
		expect(hook.areaError).toBeTruthy();
		expect(hook.isValid).toBe(false);
	});

	it('handleCancel calls onCancel when provided', async () => {
		const onCancel = vi.fn();
		const capture: React.MutableRefObject<ReturnType<
			typeof useFarmForm
		> | null> = { current: null };
		render(<HookHost capture={capture} onCancel={onCancel} />);

		await waitFor(() => expect(capture.current).not.toBeNull());
		const hook = capture.current!;

		act(() => hook.handleCancel());
		expect(onCancel).toHaveBeenCalledTimes(1);
	});
});

export {};
