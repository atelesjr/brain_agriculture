import Input from '@/components/atoms/Input';
import { FarmsFormRoot, ButtonsSection } from '../Farms.styles';
import { FarmField, HarvestSection, Row } from '../FarmsList/FarmsList.styles';
import HarvestsForm from './HarvestsForm';
import { Button } from '@/components/atoms';

interface FarmFormProps {
	closeForm: () => void;
}

const FarmForm = ({ closeForm }: FarmFormProps) => {
	const handleClose = () => {
		closeForm();
	};

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

			<ButtonsSection>
				<Button role="submit" variant="primary" size="sm">
					Salvar propriedade
				</Button>
				<Button
					role="button"
					variant="secondary"
					size="sm"
					onClick={() => handleClose()}
				>
					Cancelar
				</Button>
			</ButtonsSection>
		</FarmsFormRoot>
	);
};
export default FarmForm;
