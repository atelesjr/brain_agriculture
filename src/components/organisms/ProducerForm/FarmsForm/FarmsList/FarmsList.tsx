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
import Harvests from '../../Harvests/Harvests';

interface FarmListProps {
	farms: Farm[];
}

const FarmsList = ({ farms }: FarmListProps) => {
	const noFarm = <>Nenhuma propriedade cadastrada</>;

	if (farms.length === 0) {
		return <FarmListRoot>{noFarm}</FarmListRoot>;
	}

	return (
		<FarmListRoot>
			{farms.map((farm) => (
				<FarmItem key={farm.id}>
					<FarmListHeader>
						<ArrowIcon />
						<FarmField>
							<FarmFieldValue>{farm.name}</FarmFieldValue>
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
					<HarvestSection>
						<Harvests />
					</HarvestSection>
				</FarmItem>
			))}
		</FarmListRoot>
	);
};

export default FarmsList;
