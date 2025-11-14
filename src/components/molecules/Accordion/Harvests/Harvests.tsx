import type { Safra } from '@/types/producer';
import type { Farm } from '@/types/producer';
import {
	Col,
	Col2,
	CultureValue,
	HarvestContent,
	Cultures,
	HarvestLabel,
	HarvestRoot,
	HarvestValue,
} from './Harvests.styles';
import Dropdown from '@/components/atoms/Dropdown';
import { useState } from 'react';

interface HarvestProps {
	farm: Farm & { safras: Safra[] };
}

const Harvest = ({ farm }: HarvestProps) => {
	const [selectedHarvest, setSelectedHarvest] = useState<Safra | null>(null);
	return (
		<HarvestRoot>
			<Col>
				<Dropdown
					label="Safras"
					items={(farm.safras || []).map((harvest) => ({
						id: harvest.year,
						label: String(harvest.year),
						onSelect: () => {
							setSelectedHarvest(harvest);
							console.log(
								'Safra selecionada',
								harvest.year,
								'na fazenda',
								farm.id
							);
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
							<div>Culturas:</div>
							{selectedHarvest.cultures.map((culture, i) => (
								<Cultures key={i}>
									<CultureValue>{culture.name}:</CultureValue>
									<HarvestLabel>Área plantada:</HarvestLabel>
									<CultureValue>{culture.areaPlanted} ha</CultureValue>
								</Cultures>
							))}
						</Col>
					</HarvestContent>
				)}
			</Col2>
		</HarvestRoot>
	);
};

export default Harvest;
