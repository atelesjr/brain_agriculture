import ArrowIcon from '@/components/atoms/icons/ArrowIcon';
import {
	FarmAreaContent,
	FarmInfoContent,
	FarmField,
	FarmFieldLabel,
	FarmFieldValue,
	FarmInfo,
	FarmItem,
	FarmListHeader,
	FarmListRoot,
	HarvestSection,
} from './FarmsList.styles';
import type { Farm } from '@/types/producer';
import Harvest from '@/components/molecules/Accordion/Harvests/Harvests';
import useFormList from './useFormList';
import { IconButton } from '@/components/atoms/Buttons';

interface FarmListProps {
	farms: Farm[];
	// whether the parent form is in edit mode (editing an existing producer)
	isEditing?: boolean;
	onEdit?: (index: number) => void;
	onRemove?: (index: number) => void;
}
const FarmsList = ({
	farms,
	isEditing = false,
	onEdit,
	onRemove,
}: FarmListProps) => {
	// encapsulate open/reset logic in custom hook
	const { openId, resetCounters, toggle } = useFormList();

	if (farms.length === 0) {
		return (
			<FarmListRoot>
				<h4>Nenhuma propriedade cadastrada</h4>
			</FarmListRoot>
		);
	}

	return (
		<FarmListRoot>
			{farms.map((farm) => {
				const isOpen = openId === farm.id;
				return (
					<FarmItem key={farm.id}>
						<FarmListHeader
							role="button"
							key={farm.id}
							aria-expanded={isOpen}
							onClick={() => toggle(farm.id)}
						>
							<ArrowIcon open={isOpen} />
							<FarmInfo>
								<FarmInfoContent>
									<FarmField>
										<FarmFieldValue $highlight>{farm.name}</FarmFieldValue>
									</FarmField>
									<FarmField>
										<FarmFieldLabel>Município:</FarmFieldLabel>
										<FarmFieldValue>{`${farm.city}-${farm.state}`}</FarmFieldValue>
									</FarmField>
								</FarmInfoContent>

								<FarmAreaContent isOpen={isOpen}>
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
								</FarmAreaContent>
							</FarmInfo>

							{/* action buttons aligned to the extreme right when in edit mode */}
							<div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
								{isEditing && (
									<>
										<IconButton
											action="edit"
											label=""
											variant="ghost"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												if (onEdit) onEdit(farms.indexOf(farm));
											}}
										/>
										<IconButton
											action="delete"
											label=""
											variant="ghost"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												if (onRemove) onRemove(farms.indexOf(farm));
											}}
										/>
									</>
								)}
							</div>
						</FarmListHeader>

						<HarvestSection hidden={!isOpen} aria-hidden={!isOpen}>
							{
								<Harvest
									farm={farm}
									resetCounter={resetCounters[farm.id] ?? 0}
								/>
							}
						</HarvestSection>
					</FarmItem>
				);
			})}
		</FarmListRoot>
	);
};

export default FarmsList;
