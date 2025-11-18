import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import type { Farmer } from '@/types/producer';
import { fetchProducers } from '@/store/producersSlice';

type ChartItem = { name: string; value: number };

export default function useDashboardData(providedItems?: Farmer[]) {
	const dispatch = useDispatch<AppDispatch>();
	const producersState = useSelector((s: RootState) => s.producers);
	const items: Farmer[] = providedItems ?? producersState.items ?? [];

	// If producers haven't been loaded yet, trigger fetch so dashboard shows data
	useEffect(() => {
		if (producersState.status === 'idle') {
			void dispatch(fetchProducers());
		}
	}, [dispatch, producersState.status]);

	const totalFarms = useMemo(
		() => items.reduce((acc, p) => acc + (p.farms ? p.farms.length : 0), 0),
		[items]
	);

	const totalHectares = useMemo(
		() =>
			items.reduce(
				(acc, p) =>
					acc +
					(p.farms || []).reduce((a, f) => a + Number(f.areaTotal || 0), 0),
				0
			),
		[items]
	);

	const byState = useMemo<ChartItem[]>(() => {
		const map: Record<string, number> = {};
		items.forEach((p) => {
			(p.farms || []).forEach((f) => {
				const s = f.state || '--';
				map[s] = (map[s] || 0) + 1;
			});
		});
		return Object.entries(map).map(([name, value]) => ({ name, value }));
	}, [items]);

	const byCulture = useMemo<ChartItem[]>(() => {
		const map: Record<string, number> = {};
		items.forEach((p) => {
			(p.farms || []).forEach((f) => {
				(f.safras || []).forEach((s) => {
					(s.cultures || []).forEach((c) => {
						const name = c.name || 'Outros';
						map[name] = (map[name] || 0) + Number(c.areaPlanted || 0);
					});
				});
			});
		});
		return Object.entries(map).map(([name, value]) => ({ name, value }));
	}, [items]);

	const landUse = useMemo<ChartItem[]>(() => {
		let cultivable = 0;
		let vegetated = 0;
		items.forEach((p) => {
			(p.farms || []).forEach((f) => {
				cultivable += Number(f.cultivableLand || 0);
				vegetated += Number(f.vegetatedArea || 0);
			});
		});
		return [
			{ name: 'Área agricultável', value: cultivable },
			{ name: 'Vegetação', value: vegetated },
		];
	}, [items]);

	return { items, totalFarms, totalHectares, byState, byCulture, landUse };
}
