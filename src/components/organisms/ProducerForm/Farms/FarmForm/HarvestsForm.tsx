import Input from '@/components/atoms/Input';
import {
	BottomSection,
	FarmField,
	HarvestsFormRoot,
	Row,
} from '../FarmsList/FarmsList.styles';
import { IconButton } from '@/components/atoms/Buttons';
import addIcon from '@/assets/add.svg';
import garbageIcon from '@/assets/garbage.svg';
import { useState } from 'react';

const HarvestsForm = () => {
	const [harvests, setHarvests] = useState([]);

	const addHarvest = () => {};

	const removeHarvest = () => {};

	return (
		<HarvestsFormRoot>
			<h5>Safras:</h5>
			<Row>
				<FarmField width="80px">
					<Input placeholder="Ano" label="Ano:" />
				</FarmField>
				<FarmField width="150px">
					<Input placeholder="Digite a cultura" label="Cultura:" />
				</FarmField>
				<FarmField width="100px">
					<Input label="Área plantada:" />
				</FarmField>
				<BottomSection>
					<IconButton
						variant="primary"
						size="sm"
						icon={addIcon}
						aria-label="Adicionar"
						onClick={addHarvest}
					/>
					<IconButton
						variant="primary"
						size="sm"
						icon={garbageIcon}
						aria-label="Excluir"
						onClick={removeHarvest}
					/>
				</BottomSection>
			</Row>
		</HarvestsFormRoot>
	);
};

export default HarvestsForm;
