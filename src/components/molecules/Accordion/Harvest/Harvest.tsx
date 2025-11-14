import type { Safra } from '@/types/producer';
import { HarvestRoot } from './Harvest.styles';

interface HarvestProps {
	harvests: Safra[];
}

const Harvest = ({ harvests }: HarvestProps) => {
	if (harvests.length === 0) {
		return <div>Nenhuma safra cadastrada.</div>;
	}

	return (
		<HarvestRoot>
			{harvests.map((harvest) => (
				<div>
					<div>{harvest.year}</div>
				</div>
			))}
		</HarvestRoot>
	);
};
export default Harvest;
