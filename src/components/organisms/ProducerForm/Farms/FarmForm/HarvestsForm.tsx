import { HarvestsFormRoot } from '../FarmsList/FarmsList.styles';
import { useState, useEffect } from 'react';
import HarvestItem from './HarvestItem';
import type { Harvest } from './HarvestItem';

interface HarvestsFormProps {
	initial?: Harvest[];
	onChange?: (harvests: Harvest[]) => void;
}

const HarvestsForm = ({ initial = [{ year: '', crop: '', area: '' }], onChange }: HarvestsFormProps) => {
	const [harvests, setHarvests] = useState<Harvest[]>(initial.length ? initial : [{ year: '', crop: '', area: '' }]);

	useEffect(() => {
		setHarvests(initial.length ? initial : [{ year: '', crop: '', area: '' }]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(initial)]);

	useEffect(() => {
		if (onChange) onChange(harvests);
	}, [harvests, onChange]);

	const addHarvest = () =>
		setHarvests((prev) => [...prev, { year: '', crop: '', area: '' }]);

	const removeHarvest = (index: number) => {
		setHarvests((prev) => {
			if (prev.length <= 1) {
				return [{ year: '', crop: '', area: '' }];
			}
			return prev.filter((_, i) => i !== index);
		});
	};

	const handleChange = (index: number, field: keyof Harvest, value: string) => {
		setHarvests((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)));
	};

	return (
		<HarvestsFormRoot>
			<h5>Safras:</h5>
			<div>
				{harvests.map((harvest, index) => (
					<HarvestItem
						key={index}
						index={index}
						harvest={harvest}
						isLast={index === harvests.length - 1}
						onChange={handleChange}
						addHarvest={addHarvest}
						removeHarvest={removeHarvest}
					/>
				))}
			</div>
		</HarvestsFormRoot>
	);
};

export default HarvestsForm;
