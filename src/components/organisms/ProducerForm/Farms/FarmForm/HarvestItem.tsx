import Input from '@/components/atoms/Input';
import {
	BottomSection,
	FarmField,
	HarvestFormItem,
} from '../FarmsList/FarmsList.styles';
import { IconButton } from '@/components/atoms/Buttons';
import addIcon from '@/assets/add.svg';
import garbageIcon from '@/assets/garbage.svg';

export type Harvest = {
	year?: string;
	crop?: string;
	area?: string;
};

interface HarvestItemProps {
	index: number;
	harvest: Harvest;
	isLast?: boolean;
	onChange: (index: number, field: keyof Harvest, value: string) => void;
	addHarvest: () => void;
	removeHarvest: (index: number) => void;
}

const HarvestItem = ({
	index,
	harvest,
	isLast = false,
	onChange,
	addHarvest,
	removeHarvest,
}: HarvestItemProps) => {
	return (
		<HarvestFormItem>
			<FarmField width="80px">
				<Input
					placeholder="Ano"
					label="Ano:"
					value={harvest.year || ''}
					inputMode="numeric"
					maxLength={4}
					onChange={(e) => onChange(index, 'year', e.target.value)}
				/>
			</FarmField>
			<FarmField width="150px">
				<Input
					placeholder="Digite a cultura"
					label="Cultura:"
					value={harvest.crop || ''}
					onChange={(e) => onChange(index, 'crop', e.target.value)}
				/>
			</FarmField>
			<FarmField width="100px">
				<Input
					label="Área plantada:"
					value={harvest.area || ''}
					inputMode="numeric"
					onChange={(e) => onChange(index, 'area', e.target.value)}
				/>
			</FarmField>
			<BottomSection>
				{isLast && (
					<IconButton
						variant="primary"
						size="sm"
						icon={addIcon}
						aria-label="Adicionar"
						onClick={addHarvest}
					/>
				)}
				<IconButton
					variant="primary"
					size="sm"
					icon={garbageIcon}
					aria-label="Excluir"
					onClick={() => removeHarvest(index)}
				/>
			</BottomSection>
		</HarvestFormItem>
	);
};

export default HarvestItem;
