import { useCallback, useEffect, useState, useMemo } from 'react';
import type { Farm, Safra } from '@/types/producer';
import type { Harvest } from './HarvestItem';

interface UseFarmFormOptions {
	initial?: Farm;
	index?: number;
	onSave?: (farm: Farm, index: number) => void;
	onCancel?: () => void;
}

export default function useFarmForm(options: UseFarmFormOptions = {}) {
	const { initial, index = 0, onSave, onCancel } = options;

	const initialValues: Farm = useMemo(
		() =>
			initial ?? {
				id: `f-${Date.now()}`,
				name: '',
				city: '',
				state: '',
				areaTotal: 0,
				cultivableLand: 0,
				vegetatedArea: 0,
				safras: [],
			},
		[initial]
	);

	const [form, setForm] = useState(() => ({
		name: initialValues.name,
		city: initialValues.city,
		state: initialValues.state,
		areaTotal: String(initialValues.areaTotal || ''),
		cultivableLand: String(initialValues.cultivableLand || ''),
		vegetatedArea: String(initialValues.vegetatedArea || ''),
	}));

	const toInitialHarvests = (safras: Safra[] = []): Harvest[] =>
		safras.flatMap((s) =>
			(s.cultures || []).map((c) => ({
				year: String(s.year),
				crop: c.name,
				area: String(c.areaPlanted),
			}))
		);

	const [harvests, setHarvests] = useState<Harvest[]>(() =>
		toInitialHarvests(initialValues.safras)
	);

	// Reset form when initial changes (depend on initial id only).
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		setForm({
			name: initialValues.name,
			city: initialValues.city,
			state: initialValues.state,
			areaTotal: String(initialValues.areaTotal || ''),
			cultivableLand: String(initialValues.cultivableLand || ''),
			vegetatedArea: String(initialValues.vegetatedArea || ''),
		});
		setHarvests(toInitialHarvests(initialValues.safras));
		// depend on id to reset when initial changes
	}, [initial?.id]);

	const setField = useCallback((field: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	}, []);

	const handleSave = useCallback(() => {
		const map = new Map<number, Safra>();
		harvests.forEach((h) => {
			const yearNum = Number(h.year);
			if (Number.isNaN(yearNum)) return;
			const cultureName = h.crop ? String(h.crop).trim() : '';
			const areaPlanted = h.area ? Number(h.area) || 0 : 0;

			if (!map.has(yearNum)) {
				map.set(yearNum, {
					year: yearNum,
					name: `Safra ${yearNum}`,
					cultures: [],
				});
			}
			if (cultureName) {
				const safra = map.get(yearNum)!;
				safra.cultures.push({ name: cultureName, areaPlanted });
			}
		});

		const safrasArray = Array.from(map.values());

		const updated: Farm = {
			id: initialValues.id,
			name: form.name,
			city: form.city,
			state: form.state,
			areaTotal: Number(form.areaTotal) || 0,
			cultivableLand: Number(form.cultivableLand) || 0,
			vegetatedArea: Number(form.vegetatedArea) || 0,
			safras: safrasArray,
		};

		if (typeof onSave === 'function') onSave(updated, index);
		return updated;
	}, [form, harvests, index, initialValues.id, onSave]);

	const handleCancel = useCallback(() => {
		if (typeof onCancel === 'function') onCancel();
	}, [onCancel]);

	const isValid = Boolean(form.name && form.name.trim().length > 0);

	return {
		form,
		setField,
		harvests,
		setHarvests,
		handleSave,
		handleCancel,
		isValid,
	} as const;
}
