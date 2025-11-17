import Input from '@/components/atoms/Input';
import { FarmsFormRoot, ButtonsSection } from '../Farms.styles';
import { FarmField, HarvestSection, Row } from '../FarmsList/FarmsList.styles';
import HarvestsForm from './HarvestsForm';
import { Button } from '@/components/atoms';
import { useState, useEffect } from 'react';
import type { Farm } from '@/types/producer';

interface FarmFormProps {
	closeForm: () => void;
	index: number;
	farms: Farm[];
	setFarms: React.Dispatch<React.SetStateAction<Farm[]>>;
}

const FarmForm = ({ closeForm, index, farms, setFarms }: FarmFormProps) => {
	const initial = farms[index] || {
		id: `f-${Date.now()}`,
		name: '',
		city: '',
		state: '',
		areaTotal: 0,
		cultivableLand: 0,
		vegetatedArea: 0,
		safras: [],
	};

	const [form, setForm] = useState({
		name: initial.name,
		city: initial.city,
		state: initial.state,
		areaTotal: String(initial.areaTotal || ''),
		cultivableLand: String(initial.cultivableLand || ''),
		vegetatedArea: String(initial.vegetatedArea || ''),
	});

	const [harvests, setHarvests] = useState(initial.safras || []);

	useEffect(() => {
		setForm({
			name: initial.name,
			city: initial.city,
			state: initial.state,
			areaTotal: String(initial.areaTotal || ''),
			cultivableLand: String(initial.cultivableLand || ''),
			vegetatedArea: String(initial.vegetatedArea || ''),
		});
		setHarvests(initial.safras || []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index]);

	const handleSave = () => {
		const updated: Farm = {
			id: initial.id,
			name: form.name,
			city: form.city,
			state: form.state,
			areaTotal: Number(form.areaTotal) || 0,
			cultivableLand: Number(form.cultivableLand) || 0,
			vegetatedArea: Number(form.vegetatedArea) || 0,
			safras: harvests as any,
		};

		setFarms((prev) => prev.map((f, i) => (i === index ? updated : f)));
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
						value={form.name}
						onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
					/>
				</FarmField>
				<FarmField width="200px">
					<Input
						placeholder="Digite o nome do município"
						label="Município:"
						value={form.city}
						onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
					/>
				</FarmField>
				<FarmField width="80px">
					<Input
						placeholder="Estado"
						label="Estado:"
						value={form.state}
						onChange={(e) => setForm((s) => ({ ...s, state: e.target.value }))}
					/>
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área total"
						label="Área total:"
						value={form.areaTotal}
						onChange={(e) => setForm((s) => ({ ...s, areaTotal: e.target.value }))}
					/>
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área cultivável"
						label="Área cultivável:"
						value={form.cultivableLand}
						onChange={(e) => setForm((s) => ({ ...s, cultivableLand: e.target.value }))}
					/>
				</FarmField>
				<FarmField width="100px">
					<Input
						placeholder="Digite a área vegetada"
						label="Área vegetada:"
						value={form.vegetatedArea}
						onChange={(e) => setForm((s) => ({ ...s, vegetatedArea: e.target.value }))}
					/>
				</FarmField>
			</Row>
			<HarvestSection>
				<HarvestsForm initial={harvests} onChange={(h) => setHarvests(h as any)} />
			</HarvestSection>

			<ButtonsSection>
				<Button role="button" variant="primary" size="sm" onClick={handleSave}>
					Salvar propriedade
				</Button>
				<Button
					role="button"
					variant="secondary"
					size="sm"
					onClick={() => closeForm()}
				>
					Cancelar
				</Button>
			</ButtonsSection>
		</FarmsFormRoot>
	);
};
export default FarmForm;
