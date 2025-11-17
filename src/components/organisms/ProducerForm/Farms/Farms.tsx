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
	canAddProperty?: boolean;
}

const Farms = ({
	farms,
	setFarms,
	onOpenForm,
	onCloseForm,
	canAddProperty = false,
}: FarmsProps) => {
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
					disabled={!canAddProperty}
					onClick={() => {
						if (!canAddProperty) return;
						// do NOT append a new farm until the user clicks Save in FarmForm
						const newIndex = farms.length;
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
