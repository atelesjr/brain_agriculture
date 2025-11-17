import { FarmContent, FarmHeader, FarmsFormRoot } from './Farms.styles';
import { IconButton } from '@/components/atoms/Buttons';
import { useState } from 'react';

import FarmForm from './FarmForm/FarmForm';

const FarmsForm = () => {
	const [openFarmForm, setOpenFarmForm] = useState<boolean>(true);

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
						setOpenFarmForm(true);
					}}
				/>
			</FarmHeader>

			<FarmContent>{openFarmForm ? <FarmForm /> : null}</FarmContent>
		</FarmsFormRoot>
	);
};

export default FarmsForm;
