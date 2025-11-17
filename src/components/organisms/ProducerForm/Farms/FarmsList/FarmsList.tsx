import ArrowIcon from '@/components/atoms/icons/ArrowIcon';
import {
	FarmField,
	FarmFieldLabel,
	FarmFieldValue,
	FarmItem,
	FarmListHeader,
	FarmListRoot,
	HarvestSection,
} from './FarmsList.styles';
import type { Farm } from '@/types/producer';
import Harvest from '@/components/molecules/Accordion/Harvests/Harvests';
import { useState } from 'react';

interface FarmListProps {
	farms: Farm[];
}

const FarmsList = ({ farms }: FarmListProps) => {
	const [resetCounter, setResetCounter] = useState(0);
	const [open, setOpen] = useState(false);

	const handleOnClick = () => {
		setOpen((s) => {
			const next = !s;
			if (!next) {
				// accordion is closing -> bump reset counter to instruct children to reset
				setResetCounter((c) => c + 1);
			}
			return next;
		});
	};

	if (farms.length === 0) {
		return (
			<FarmListRoot>
				<h4>Nenhuma propriedade cadastrada</h4>
			</FarmListRoot>
		);
	}

	return (
		<FarmListRoot>
			{farms.map((farm) => (
				<FarmItem key={farm.id}>
					<FarmListHeader
						role="button"
						key={farm.id}
						aria-expanded={open}
						onClick={() => handleOnClick()}
					>
						<ArrowIcon open={open} />
						<FarmField>
							<FarmFieldValue highlight>{farm.name}</FarmFieldValue>
						</FarmField>
						<FarmField>
							<FarmFieldLabel>Município:</FarmFieldLabel>
							<FarmFieldValue>{`${farm.city}-${farm.state}`}</FarmFieldValue>
						</FarmField>
						<FarmField>
							<FarmFieldLabel>Área total:</FarmFieldLabel>
							<FarmFieldValue>{`${farm.areaTotal}ha`}</FarmFieldValue>
						</FarmField>
						<FarmField>
							<FarmFieldLabel>Área cultivável:</FarmFieldLabel>
							<FarmFieldValue>{`${farm.cultivableLand}ha`}</FarmFieldValue>
						</FarmField>
						<FarmField>
							<FarmFieldLabel>Área vegetada:</FarmFieldLabel>
							<FarmFieldValue>{`${farm.vegetatedArea}ha`}</FarmFieldValue>
						</FarmField>
					</FarmListHeader>
					<HarvestSection hidden={!open} aria-hidden={!open}>
						{<Harvest farm={farm} resetCounter={resetCounter} />}
					</HarvestSection>
				</FarmItem>
			))}
		</FarmListRoot>
	);
};

export default FarmsList;
