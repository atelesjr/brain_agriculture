import type { Safra } from '@/types/producer';
import type { Farm } from '@/types/producer';
import {
	Col,
	Col2,
	HarvestContent,
	Cultures,
	HarvestLabel,
	HarvestRoot,
	HarvestValue,
	HarvestArea,
} from './Harvests.styles';
import Dropdown from '@/components/atoms/Dropdown';
import { useState, useEffect } from 'react';

interface HarvestProps {
	farm: Farm & { safras: Safra[] };
	resetCounter?: number;
}

const Harvest = ({ farm, resetCounter }: HarvestProps) => {
	const [selectedHarvest, setSelectedHarvest] = useState<Safra | null>(null);

	useEffect(() => {
		if (typeof resetCounter !== 'undefined') {
			setSelectedHarvest(null);
		}
	}, [resetCounter]);

	// group safras by year so dropdown shows unique years and combined cultures
	const groupedMap = new Map<number, Safra>();
	(farm.safras || []).forEach((s) => {
		if (!groupedMap.has(s.year)) {
			groupedMap.set(s.year, {
				year: s.year,
				name: s.name,
				cultures: [...(s.cultures || [])],
			});
		} else {
			const existing = groupedMap.get(s.year)!;
			existing.cultures = existing.cultures.concat(s.cultures || []);
		}
	});
	const groupedSafras = Array.from(groupedMap.values());

	return (
		<HarvestRoot>
			<Col>
				<Dropdown
					label="Safras"
					items={groupedSafras.map((harvest) => ({
						id: harvest.year,
						label: String(harvest.year),
						onSelect: () => {
							setSelectedHarvest(harvest);
						},
					}))}
				/>
			</Col>
			<Col2>
				{!selectedHarvest ? (
					<HarvestContent>Selecione uma safra</HarvestContent>
				) : (
					<HarvestContent>
						<Col>
							<HarvestLabel>Safra:</HarvestLabel>
							<HarvestValue>{selectedHarvest.year}</HarvestValue>
						</Col>
						<Col>
							<HarvestLabel>Culturas:</HarvestLabel>
							<div>
								{selectedHarvest.cultures.map((culture, i) => (
									<Cultures key={i}>
										<HarvestValue>{culture.name} - </HarvestValue>
										<HarvestArea>{culture.areaPlanted} ha</HarvestArea>
									</Cultures>
								))}
							</div>
						</Col>
					</HarvestContent>
				)}
			</Col2>
		</HarvestRoot>
	);
};

export default Harvest;
