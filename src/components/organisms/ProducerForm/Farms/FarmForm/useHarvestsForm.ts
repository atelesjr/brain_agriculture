import { useState, useEffect, useCallback } from 'react';
import type { Harvest } from './HarvestItem';

export function useHarvestsForm(initial: Harvest[] = [{ year: '', crop: '', area: '' }], onChange?: (harvests: Harvest[]) => void) {
    const [harvests, setHarvests] = useState<Harvest[]>(initial.length ? initial : [{ year: '', crop: '', area: '' }]);

    useEffect(() => {
        setHarvests(initial.length ? initial : [{ year: '', crop: '', area: '' }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(initial)]);

    useEffect(() => {
        if (onChange) onChange(harvests);
    }, [harvests, onChange]);

    const addHarvest = useCallback(() => {
        setHarvests((prev) => [...prev, { year: '', crop: '', area: '' }]);
    }, []);

    const removeHarvest = useCallback((index: number) => {
        setHarvests((prev) => {
            if (prev.length <= 1) return [{ year: '', crop: '', area: '' }];
            return prev.filter((_, i) => i !== index);
        });
    }, []);

    const handleChange = useCallback((index: number, field: keyof Harvest, value: string) => {
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
