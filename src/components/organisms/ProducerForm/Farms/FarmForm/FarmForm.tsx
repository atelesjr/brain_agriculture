import Input from '@/components/atoms/Input';
import {
	FarmsFormRoot,
	ButtonsSection,
	FarmsListSection,
} from '../Farms.styles';
import { FarmField, HarvestSection, Row } from '../FarmsList/FarmsList.styles';
import HarvestsForm from './HarvestsForm';
import { Button } from '@/components/atoms';
import FarmsList from '../FarmsList/FarmsList';
import type { Farm } from '@/types/producer';
import { useState } from 'react';

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

const FarmForm = () => {
	const [farms] = useState<Farm[]>(sampleFarmsData);
	return (
		<FarmsFormRoot>
			<h4>Adicionar Nova Propriedade</h4>
			<Row>
				<FarmField width="250px">
					<Input
						placeholder="Digite o nome da propriedade"
						label="Nome da propriedade:"
					/>
				</FarmField>
				<FarmField width="200px">
					<Input placeholder="Digite o nome do município" label="Município:" />
				</FarmField>
				<FarmField width="80px">
					<Input placeholder="Estado" label="Estado:" />
				</FarmField>
				<FarmField width="100px">
					<Input placeholder="Digite a área total" label="Área total:" />
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área cultivável"
						label="Área cultivável:"
					/>
				</FarmField>
				<FarmField width="100px">
					<Input placeholder="Digite a área vegetada" label="Área vegetada:" />
				</FarmField>
			</Row>
			<HarvestSection>
				<HarvestsForm />
			</HarvestSection>

			<FarmsListSection>
				<h5>Propriedades Cadastradas</h5>
				<FarmsList farms={farms} />
			</FarmsListSection>

			<ButtonsSection>
				<Button variant="primary" size="sm">
					Salvar propriedade
				</Button>
				<Button variant="secondary" size="sm">
					Cancelar
				</Button>
			</ButtonsSection>
		</FarmsFormRoot>
	);
};
export default FarmForm;
