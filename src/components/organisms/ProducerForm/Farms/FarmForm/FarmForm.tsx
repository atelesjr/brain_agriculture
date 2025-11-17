import Input from '@/components/atoms/Input';
import { FarmsFormRoot, ButtonsSection } from '../Farms.styles';
import { FarmField, HarvestSection, Row } from '../FarmsList/FarmsList.styles';
import HarvestsForm from './HarvestsForm';
import { Button } from '@/components/atoms';
import { useState, useEffect } from 'react';
import type { Farm, Safra } from '@/types/producer';
import type { Harvest } from './HarvestItem';

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

	const initialHarvests: Harvest[] = (initial.safras || []).flatMap((s) =>
		(s.cultures || []).map((c) => ({ year: String(s.year), crop: c.name, area: String(c.areaPlanted) }))
	);

	const [harvests, setHarvests] = useState<Harvest[]>(initialHarvests);

	useEffect(() => {
		setForm({
			name: initial.name,
			city: initial.city,
			state: initial.state,
			areaTotal: String(initial.areaTotal || ''),
			cultivableLand: String(initial.cultivableLand || ''),
			vegetatedArea: String(initial.vegetatedArea || ''),
		});
		setHarvests((initial.safras || []).flatMap((s) => (s.cultures || []).map((c) => ({ year: String(s.year), crop: c.name, area: String(c.areaPlanted) }))));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index]);

	const handleSave = () => {
		// convert local harvest rows (year:string, crop, area) into Safra[] grouped by year
		const map = new Map<number, Safra>();
		harvests.forEach((h) => {
			const yearNum = Number(h.year);
			if (Number.isNaN(yearNum)) return;
			const cultureName = h.crop ? String(h.crop).trim() : '';
			const areaPlanted = h.area ? Number(h.area) || 0 : 0;

			if (!map.has(yearNum)) {
				map.set(yearNum, { year: yearNum, name: `Safra ${yearNum}`, cultures: [] });
			}
			if (cultureName) {
				const safra = map.get(yearNum)!;
				safra.cultures.push({ name: cultureName, areaPlanted });
			}
		});

		const safrasArray = Array.from(map.values());

		const updated: Farm = {
			id: initial.id,
			name: form.name,
			city: form.city,
			state: form.state,
			areaTotal: Number(form.areaTotal) || 0,
			cultivableLand: Number(form.cultivableLand) || 0,
			vegetatedArea: Number(form.vegetatedArea) || 0,
			safras: safrasArray,
		};

		// compute next farms array for logging and state update
		setFarms((prev) => {
			// if index is beyond current list, append (new farm); otherwise replace
			let next: Farm[];
			if (index >= prev.length) {
				next = [...prev, updated];
			} else {
				next = prev.map((f, i) => (i === index ? updated : f));
			}
			console.log('FarmForm saved updated farm:', updated);
			console.log('FarmForm next farms array:', next);
			return next;
		});
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
				<HarvestsForm initial={harvests} onChange={(h) => setHarvests(h)} />
			</HarvestSection>

			<ButtonsSection>
				<Button type="button" variant="primary" size="sm" onClick={handleSave}>
					Salvar propriedade
				</Button>
				<Button
					type="button"
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
