import { HarvestsFormRoot } from '../FarmsList/FarmsList.styles';
import { useState } from 'react';
import HarvestItem from './HarvestItem';
import type { Harvest } from './HarvestItem';

const HarvestsForm = () => {
	const [harvests, setHarvests] = useState<Harvest[]>([
		{ year: '', crop: '', area: '' },
	]);

	const addHarvest = () =>
		setHarvests((prev) => [...prev, { year: '', crop: '', area: '' }]);

	const removeHarvest = (index: number) => {
		setHarvests((prev) => {
			// if there's only one harvest, clear its fields but keep one item
			if (prev.length <= 1) {
				return [{ year: '', crop: '', area: '' }];
			}

			return prev.filter((_, i) => i !== index);
		});
	};

	const handleChange = (index: number, field: keyof Harvest, value: string) => {
		setHarvests((prev) =>
			prev.map((harvest, i) =>
				i === index ? { ...harvest, [field]: value } : harvest
			)
		);
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
