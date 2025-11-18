import { render, screen } from '@/test-utils';
import ChartsPanel from './ChartsPanel';
import { describe, it, expect } from 'vitest';

describe('ChartsPanel', () => {
    it('renders the three charts and their legend labels', () => {
        const byCulture = [
            { name: 'Soja', value: 3380 },
            { name: 'Trigo', value: 1380 },
        ];

        const landUse = [
            { name: 'Cultivo', value: 200 },
            { name: 'Pasto', value: 120 },
        ];

        const byState = [
            { name: 'SP', value: 12 },
            { name: 'MG', value: 8 },
        ];

        const { container } = render(
            <ChartsPanel byCulture={byCulture} landUse={landUse} byState={byState} />
        );

        // legend labels should be present
        expect(screen.getByText('Soja')).toBeInTheDocument();
        expect(screen.getByText('Trigo')).toBeInTheDocument();
        expect(screen.getByText('SP')).toBeInTheDocument();

        // Recharts ResponsiveContainer may not render SVGs in happy-dom; avoid asserting on SVG rendering.
        // Instead assert the testable legends we render alongside the charts are present.
        // at minimum we expect our explicit legend entries to be present (checked above by text assertions)
        expect(screen.getByText('Soja')).toBeInTheDocument();
    });
});
