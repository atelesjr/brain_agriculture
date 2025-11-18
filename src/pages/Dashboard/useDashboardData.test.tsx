import { render, waitFor } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import useDashboardData from './useDashboardData';

function HookHost({ providedItems, capture }: { providedItems?: any[]; capture: React.MutableRefObject<any> }) {
    const hook = useDashboardData(providedItems);
    capture.current = hook;
    return null;
}

describe('useDashboardData', () => {
    it('computes totals and aggregations from provided items', async () => {
        const capture: React.MutableRefObject<any> = { current: null };

        const items = [
            {
                id: '1',
                name: 'Farmer 1',
                document: '',
                documentType: '',
                farms: [
                    {
                        id: 'f1',
                        state: 'SP',
                        areaTotal: 10,
                        cultivableLand: 5,
                        vegetatedArea: 2,
                        safras: [
                            { id: 's1', cultures: [{ name: 'Soja', areaPlanted: 50 }, { name: 'Trigo', areaPlanted: 20 }] },
                        ],
                    },
                    {
                        id: 'f2',
                        state: 'MG',
                        areaTotal: 5,
                        cultivableLand: 3,
                        vegetatedArea: 1,
                        safras: [{ id: 's2', cultures: [{ name: 'Soja', areaPlanted: 30 }] }],
                    },
                ],
            },
            {
                id: '2',
                name: 'Farmer 2',
                document: '',
                documentType: '',
                farms: [
                    {
                        id: 'f3',
                        state: 'SP',
                        areaTotal: 8,
                        cultivableLand: 4,
                        vegetatedArea: 0,
                        safras: [{ id: 's3', cultures: [{ name: 'Trigo', areaPlanted: 10 }] }],
                    },
                ],
            },
        ];

        render(<HookHost providedItems={items} capture={capture} />);

        await waitFor(() => expect(capture.current).not.toBeNull());

        const { totalFarms, totalHectares, byState, byCulture, landUse } = capture.current;

        expect(totalFarms).toBe(3);
        expect(totalHectares).toBe(23);

        // byState should contain counts for SP:2 and MG:1 (order not guaranteed)
        const stateMap = Object.fromEntries(byState.map((s: any) => [s.name, s.value]));
        expect(stateMap.SP).toBe(2);
        expect(stateMap.MG).toBe(1);

        // byCulture sums areaPlanted: Soja 80, Trigo 30
        const cultureMap = Object.fromEntries(byCulture.map((c: any) => [c.name, c.value]));
        expect(cultureMap.Soja).toBe(80);
        expect(cultureMap.Trigo).toBe(30);

        // landUse totals
        const landMap = Object.fromEntries(landUse.map((l: any) => [l.name, l.value]));
        expect(landMap['Área agricultável']).toBe(12);
        expect(landMap['Vegetação']).toBe(3);
    });
});

export {};
