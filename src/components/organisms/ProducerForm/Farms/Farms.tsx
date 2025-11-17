import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ProducerFormValues } from '../ProducerForm';
import { FarmHeader, FarmsFormRoot } from './Farms.styles';
import { IconButton } from '@/components/atoms/Buttons';
import { useState } from 'react';
import FarmsList from './FarmsList/FarmsList';
import FarmForm from './FarmForm/FarmForm';
import type { Farm } from '@/types/producer';

interface FarmsFormProps {
	register: UseFormRegister<ProducerFormValues>;
	errors: FieldErrors<ProducerFormValues>;
}

const sampleFarmsData: Farm[] = [
	{
		id: 'f-1-1',
		name: 'Fazenda Boa Vista',
		city: 'Uberlândia',
		state: 'MG',
		areaTotal: 120.0,
		cultivableLand: 80.0,
		vegetatedArea: 30.0,
		safras: [
			{
				year: 2021,
				name: 'Safra 2021',
				cultures: [
					{ name: 'Soja', areaPlanted: 50.0 },
					{ name: 'Milho', areaPlanted: 20.0 },
				],
			},
			{
				year: 2022,
				name: 'Safra 2022',
				cultures: [{ name: 'Algodão', areaPlanted: 30.0 }],
			},
		],
	},
];

const FarmsForm = ({ register, errors }: FarmsFormProps) => {
	const [farms] = useState<Farm[]>(sampleFarmsData);
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
			{openFarmForm ? <FarmForm /> : <FarmsList farms={farms} />}
		</FarmsFormRoot>
	);
};

export default FarmsForm;
