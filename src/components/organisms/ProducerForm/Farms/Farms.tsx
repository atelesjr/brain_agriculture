import { FarmContent, FarmHeader, FarmsFormRoot } from './Farms.styles';
import { IconButton } from '@/components/atoms/Buttons';
import { useState } from 'react';

import FarmForm from './FarmForm/FarmForm';
import FarmsList from './FarmsList/FarmsList';
import type { Farm } from '@/types/producer';

interface FarmsProps {
	farms: Farm[];
	setFarms: React.Dispatch<React.SetStateAction<Farm[]>>;
	onOpenForm?: () => void;
	onCloseForm?: () => void;
}

const Farms = ({ farms, setFarms, onOpenForm, onCloseForm }: FarmsProps) => {
	const [openFarmForm, setOpenFarmForm] = useState<boolean>(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	return (
		<FarmsFormRoot>
			<FarmHeader>
				<h3>Propriedades:</h3>
				<IconButton
					action="add"
					label="Adicionar Propriedade"
					variant="primary"
					size="sm"
					onClick={() => {
						const newIndex = farms.length;
						const newFarm: Farm = {
							id: `f-${Date.now()}`,
							name: '',
							city: '',
							state: '',
							areaTotal: 0,
							cultivableLand: 0,
							vegetatedArea: 0,
							safras: [],
						};
						setFarms((prev) => [...prev, newFarm]);
						setEditingIndex(newIndex);
						setOpenFarmForm(true);
						if (onOpenForm) onOpenForm();
					}}
				/>
			</FarmHeader>

			<FarmContent>
				{openFarmForm && editingIndex !== null ? (
					<FarmForm
						closeForm={() => {
							setOpenFarmForm(false);
							setEditingIndex(null);
							if (onCloseForm) onCloseForm();
						}}
						index={editingIndex}
						farms={farms}
						setFarms={setFarms}
					/>
				) : (
					<FarmsList farms={farms} />
				)}
			</FarmContent>
		</FarmsFormRoot>
	);
};

export default Farms;
