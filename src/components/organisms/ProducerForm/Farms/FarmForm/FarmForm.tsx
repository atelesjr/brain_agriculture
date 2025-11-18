import Input from '@/components/atoms/Input';
import { FarmsFormRoot, ButtonsSection } from '../Farms.styles';
import { FarmField, HarvestSection, Row } from '../FarmsList/FarmsList.styles';
import HarvestsForm from './HarvestsForm';
import { Button } from '@/components/atoms';
import useFarmForm from './useFarmForm';
import type { Farm } from '@/types/producer';

interface FarmFormProps {
	closeForm: () => void;
	index: number;
	farms: Farm[];
	setFarms: React.Dispatch<React.SetStateAction<Farm[]>>;
}

const FarmForm = ({ closeForm, index, farms, setFarms }: FarmFormProps) => {
	const initial = farms[index];

	const onSave = (updated: Farm, i: number) => {
		setFarms((prev) => {
			if (i >= prev.length) return [...prev, updated];
			return prev.map((f, idx) => (idx === i ? updated : f));
		});
		closeForm();
	};

	const {
		form,
		setField,
		harvests,
		setHarvests,
		handleSave,
		handleCancel,
		isValid,
	} = useFarmForm({
		initial,
		index,
		onSave,
		onCancel: closeForm,
	});

	return (
		<FarmsFormRoot>
			<h4>Adicionar Nova Propriedade</h4>
			<Row>
				<FarmField width="250px">
					<Input
						placeholder="Digite o nome da propriedade"
						label="Nome da propriedade:"
						value={form.name}
						onChange={(e) => setField('name', e.target.value)}
					/>
				</FarmField>
				<FarmField width="200px">
					<Input
						placeholder="Digite o nome do município"
						label="Município:"
						value={form.city}
						onChange={(e) => setField('city', e.target.value)}
					/>
				</FarmField>
				<FarmField width="80px">
					<Input
						placeholder="Estado"
						label="Estado:"
						value={form.state}
						onChange={(e) => setField('state', e.target.value)}
					/>
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área total"
						label="Área total:"
						value={form.areaTotal}
						onChange={(e) => setField('areaTotal', e.target.value)}
					/>
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área cultivável"
						label="Área cultivável:"
						value={form.cultivableLand}
						onChange={(e) => setField('cultivableLand', e.target.value)}
					/>
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área vegetada"
						label="Área vegetada:"
						value={form.vegetatedArea}
						onChange={(e) => setField('vegetatedArea', e.target.value)}
					/>
				</FarmField>
			</Row>
			<HarvestSection>
				<HarvestsForm initial={harvests} onChange={(h) => setHarvests(h)} />
			</HarvestSection>

			<ButtonsSection>
				<Button
					type="button"
					variant="primary"
					size="sm"
					onClick={handleSave}
					disabled={!isValid}
				>
					Salvar propriedade
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() => handleCancel()}
				>
					Cancelar
				</Button>
			</ButtonsSection>
		</FarmsFormRoot>
	);
};
export default FarmForm;
