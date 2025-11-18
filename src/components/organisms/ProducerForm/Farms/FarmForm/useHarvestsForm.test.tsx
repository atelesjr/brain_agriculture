import React, { useEffect } from 'react';
import { render, waitFor } from '@/test-utils';
import { act } from '@testing-library/react';
import useHarvestsForm from './useHarvestsForm';

import type { Harvest } from './HarvestItem';

function HookHost({
	initial,
	capture,
	onChange,
}: {
	initial?: Harvest[];
	capture: React.MutableRefObject<ReturnType<typeof useHarvestsForm> | null>;
	onChange?: (h: Harvest[]) => void;
}) {
	const hook = useHarvestsForm(initial, onChange);
	useEffect(() => {
		capture.current = hook;
	}, [hook, capture]);
	return null;
}

describe('useHarvestsForm', () => {
	it('initializes with provided harvests', async () => {
		const initial: Harvest[] = [{ year: '2020', crop: 'Corn', area: '10' }];
		const capture: React.MutableRefObject<ReturnType<
			typeof useHarvestsForm
		> | null> = { current: null };
		render(<HookHost initial={initial} capture={capture} />);

		await waitFor(() => expect(capture.current).not.toBeNull());
		expect(capture.current!.harvests).toEqual(initial);
	});

	it('addHarvest appends a blank harvest', async () => {
		const initial: Harvest[] = [{ year: '2020', crop: 'Corn', area: '10' }];
		const capture: React.MutableRefObject<ReturnType<
			typeof useHarvestsForm
		> | null> = { current: null };
		render(<HookHost initial={initial} capture={capture} />);

		await waitFor(() => expect(capture.current).not.toBeNull());

		act(() => {
			capture.current!.addHarvest();
		});

		expect(capture.current!.harvests).toHaveLength(2);
		expect(capture.current!.harvests[1]).toEqual({
			year: '',
			crop: '',
			area: '0',
		});
	});

	it('removeHarvest removes by index and keeps one blank when last', async () => {
		const initial: Harvest[] = [{ year: '2020', crop: 'Corn', area: '10' }];
		const capture: React.MutableRefObject<ReturnType<
			typeof useHarvestsForm
		> | null> = { current: null };
		render(<HookHost initial={initial} capture={capture} />);

		await waitFor(() => expect(capture.current).not.toBeNull());

		act(() => {
			capture.current!.removeHarvest(0);
		});

		expect(capture.current!.harvests).toHaveLength(1);
		expect(capture.current!.harvests[0]).toEqual({
			year: '',
			crop: '',
			area: '0',
		});
	});

	it('handleChange updates a field and calls onChange', async () => {
		const initial: Harvest[] = [{ year: '', crop: '', area: '0' }];
		const capture: React.MutableRefObject<ReturnType<
			typeof useHarvestsForm
		> | null> = { current: null };
		const onChange = vi.fn();
		render(
			<HookHost initial={initial} capture={capture} onChange={onChange} />
		);

		await waitFor(() => expect(capture.current).not.toBeNull());

		act(() => {
			capture.current!.handleChange(0, 'crop', 'Wheat');
		});

		expect(capture.current!.harvests[0].crop).toBe('Wheat');
		// onChange is called because effect runs after state changes
		await waitFor(() => expect(onChange).toHaveBeenCalled());
		expect(onChange).toHaveBeenCalledWith(capture.current!.harvests);
	});
});

export {};
