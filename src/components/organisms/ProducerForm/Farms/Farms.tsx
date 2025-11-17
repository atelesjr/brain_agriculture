import { FarmContent, FarmHeader, FarmsFormRoot } from './Farms.styles';
import { IconButton } from '@/components/atoms/Buttons';
import { useState } from 'react';

import FarmForm from './FarmForm/FarmForm';
import FarmsList from './FarmsList/FarmsList';
import type { Farm } from '@/types/producer';

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

const Farms = () => {
	const [openFarmForm, setOpenFarmForm] = useState<boolean>(false);
	const [farms] = useState<Farm[]>([]);

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

			<FarmContent>
				{openFarmForm ? (
					<FarmForm closeForm={() => setOpenFarmForm(false)} />
				) : (
					<FarmsList farms={farms} />
				)}
			</FarmContent>
		</FarmsFormRoot>
	);
};

export default Farms;
