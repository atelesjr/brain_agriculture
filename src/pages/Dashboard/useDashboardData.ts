import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import type { Farmer } from '@/types/producer';
import { fetchProducers } from '@/store/producersSlice';

export default function useDashboardData(providedItems?: Farmer[]) {
	const dispatch = useDispatch<AppDispatch>();
	const producersState = useSelector((s: RootState) => s.producers);
	// Memoize items so its reference only changes when the inputs change.
	const items: Farmer[] = useMemo(
		() => (providedItems ?? producersState.items ?? []),
		[providedItems, producersState.items]
	);

	// If producers haven't been loaded yet, trigger fetch so dashboard shows data
	useEffect(() => {
		if (producersState.status === 'idle') {
			void dispatch(fetchProducers());
		}
	}, [dispatch, producersState.status]);

	const totalFarms = useMemo(() => items.reduce((acc, p) => acc + (p.farms?.length ?? 0), 0), [items]);

	const totalHectares = useMemo(
		() => items.flatMap((p) => p.farms ?? []).reduce((acc, f) => acc + Number(f.areaTotal ?? 0), 0),
		[items]
	);

	const byState = useMemo(() => {
		const map = items
			.flatMap((p) => p.farms ?? [])
			.reduce<Record<string, number>>((acc, f) => {
				const s = f.state ?? '--';
				acc[s] = (acc[s] ?? 0) + 1;
				return acc;
			}, {});

		return Object.entries(map).map(([name, value]) => ({ name, value }));
	}, [items]);

	const byCulture = useMemo(() => {
		const map = items
			.flatMap((p) => p.farms ?? [])
			.flatMap((f) => f.safras ?? [])
			.flatMap((s) => s.cultures ?? [])
			.reduce<Record<string, number>>((acc, c) => {
				const name = c.name ?? 'Outros';
				acc[name] = (acc[name] ?? 0) + Number(c.areaPlanted ?? 0);
				return acc;
			}, {});

		return Object.entries(map).map(([name, value]) => ({ name, value }));
	}, [items]);

	const landUse = useMemo(() => {
		const totals = items
			.flatMap((p) => p.farms ?? [])
			.reduce((acc, f) => {
				acc.cultivable += Number(f.cultivableLand ?? 0);
				acc.vegetated += Number(f.vegetatedArea ?? 0);
				return acc;
			}, { cultivable: 0, vegetated: 0 });

		return [
			{ name: 'Área agricultável', value: totals.cultivable },
			{ name: 'Vegetação', value: totals.vegetated },
		];
	}, [items]);

	return { items, totalFarms, totalHectares, byState, byCulture, landUse };
}
