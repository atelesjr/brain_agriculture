import { useState, useEffect, useCallback } from 'react';
import type { Harvest } from './HarvestItem';

export function useHarvestsForm(initial: Harvest[] = [{ year: '', crop: '', area: '0' }], onChange?: (harvests: Harvest[]) => void) {
    const [harvests, setHarvests] = useState<Harvest[]>(initial.length ? initial : [{ year: '', crop: '', area: '0' }]);

    useEffect(() => {
        setHarvests(initial.length ? initial : [{ year: '', crop: '', area: '0' }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(initial)]);

    useEffect(() => {
        if (onChange) onChange(harvests);
    }, [harvests, onChange]);

    const addHarvest = useCallback(() => {
        setHarvests((prev) => [...prev, { year: '', crop: '', area: '0' }]);
    }, []);

    const removeHarvest = useCallback((index: number) => {
        setHarvests((prev) => {
            if (prev.length <= 1) return [{ year: '', crop: '', area: '0' }];
            return prev.filter((_, i) => i !== index);
        });
    }, []);

    const handleChange = useCallback((index: number, field: keyof Harvest, value: string) => {
        // sanitize year: digits only, max 4 chars
        if (field === 'year') {
            const nextValue = String(value ?? '').replace(/\D/g, '').slice(0, 4);
            setHarvests((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: nextValue } : h)));
            return;
        }

        // sanitize area: digits only (no length limit)
        if (field === 'area') {
            const nextValue = String(value ?? '').replace(/\D/g, '');
            setHarvests((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: nextValue } : h)));
            return;
        }

        setHarvests((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)));
    }, []);

    return {
        harvests,
        setHarvests,
        addHarvest,
        removeHarvest,
        handleChange,
    } as const;
}

export default useHarvestsForm;
