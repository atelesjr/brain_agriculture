import { HarvestsFormRoot } from '../FarmsList/FarmsList.styles';
import HarvestItem from './HarvestItem';
import type { Harvest } from './HarvestItem';
import useHarvestsForm from './useHarvestsForm';

interface HarvestsFormProps {
	initial?: Harvest[];
	onChange?: (harvests: Harvest[]) => void;
}

const HarvestsForm = ({ initial = [{ year: '', crop: '', area: '' }], onChange }: HarvestsFormProps) => {
	const { harvests, addHarvest, removeHarvest, handleChange } = useHarvestsForm(initial, onChange);

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
