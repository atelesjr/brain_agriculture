import React from 'react';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
 	ResponsiveContainer,
 	Legend,
} from 'recharts';
import { ChartCard, StatLabel, LegendWrapper, LegendItem, LegendSwatch } from './styles';
import { COLORS } from './constants';

type Datum = { name: string; value: number };

interface Props {
    byCulture: Datum[];
    landUse: Datum[];
    byState: Datum[];
    // accept readonly arrays so callers can pass `COLORS as const` safely
    colors?: ReadonlyArray<string>;
}

const ChartsPanel: React.FC<Props> = ({ byCulture, landUse, byState, colors = COLORS }) => {
    interface LegendEntry { value: string; color?: string }

    const LegendContent: React.FC<{ payload?: LegendEntry[] }> = ({ payload }) => {
        if (!payload || payload.length === 0) return null;
        return (
            <LegendWrapper>
                {payload.map((entry, i) => (
                    <LegendItem key={`legend-${i}`}>
                        <LegendSwatch color={entry.color} />
                        {entry.value}
                    </LegendItem>
                ))}
            </LegendWrapper>
        );
    };

    return (
        <>
            <ChartCard>
                <StatLabel>Por Cultura Plantada (ha):</StatLabel>
                <ResponsiveContainer width="100%" height={380}>
                    <PieChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
                        <Pie data={byCulture} dataKey="value" nameKey="name" outerRadius={150} innerRadius={70} label>
                            {byCulture.map((_, i) => (
                                <Cell key={`cell-c-${i}`} fill={colors[i % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend content={<LegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
                {/* explicit, testable legend rendered independent of Recharts internals */}
                <LegendWrapper>
                    {byCulture.map((d, i) => (
                        <LegendItem key={`legend-c-${i}`}>
                            <LegendSwatch color={colors[i % colors.length]} />
                            {d.name}
                        </LegendItem>
                    ))}
                </LegendWrapper>
            </ChartCard>

            <ChartCard>
                <StatLabel>Uso do Solo:</StatLabel>
                <ResponsiveContainer width="100%" height={380}>
                    <PieChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
                        <Pie data={landUse} dataKey="value" nameKey="name" outerRadius={150} innerRadius={70} label>
                            {landUse.map((_, i) => (
                                <Cell key={`cell-l-${i}`} fill={colors[i % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend content={<LegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
                <LegendWrapper>
                    {landUse.map((d, i) => (
                        <LegendItem key={`legend-l-${i}`}>
                            <LegendSwatch color={colors[i % colors.length]} />
                            {d.name}
                        </LegendItem>
                    ))}
                </LegendWrapper>
            </ChartCard>

            <ChartCard style={{ gridColumn: '1 / -1', minHeight: 560 }}>
                <StatLabel>Por Estado (nº de propriedades):</StatLabel>
                <ResponsiveContainer width="100%" height={520}>
                    <PieChart margin={{ top: 36, right: 36, bottom: 36, left: 36 }}>
                        <Pie data={byState} dataKey="value" nameKey="name" outerRadius={200} innerRadius={100} label>
                            {byState.map((_, i) => (
                                <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend content={<LegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
                <LegendWrapper>
                    {byState.map((d, i) => (
                        <LegendItem key={`legend-s-${i}`}>
                            <LegendSwatch color={colors[i % colors.length]} />
                            {d.name}
                        </LegendItem>
                    ))}
                </LegendWrapper>
            </ChartCard>
        </>
    );
};

export default ChartsPanel;
