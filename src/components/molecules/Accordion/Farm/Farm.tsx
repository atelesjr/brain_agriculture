import type { Farm } from '@/types/producer';
import {
	FarmRoot,
	FarmProperty,
	FarmValue,
	FarmLabel,
	FarmInfo,
	FarmName,
	FarmDetails,
	FarmCity,
	FarmHeader,
} from './Farm.styles';
import Harvest from '../Harvest/Haverst';

interface FarmsProps {
	farms: Farm[];
}

const Farms = ({ farms }: FarmsProps) => {
	if (farms.length === 0) {
		return <div>Nenhuma propriedade cadastrada.</div>;
	}

	return (
		<FarmRoot>
			{farms.map((farm) => (
				<FarmProperty>
					<FarmHeader>
						<FarmName>{farm?.name || 'N/A'}</FarmName> -{' '}
						<FarmCity>
							{`${farm?.city || 'N/A'} - ${farm?.state || 'N/A'}`}
						</FarmCity>
					</FarmHeader>

					<FarmDetails>
						<FarmInfo>
							<FarmLabel>Área total:</FarmLabel>
							<FarmValue>{farm?.areaTotal || 'N/A'} ha</FarmValue>
						</FarmInfo>
						<FarmInfo>
							<FarmLabel>Área cultivável:</FarmLabel>{' '}
							<FarmValue>{farm?.cultivableLand || 'N/A'} ha</FarmValue>
						</FarmInfo>
						<FarmInfo>
							<FarmLabel>Área vegetada:</FarmLabel>{' '}
							<FarmValue>{farm?.vegetatedArea || 'N/A'} ha</FarmValue>
						</FarmInfo>
					</FarmDetails>
					<Harvest />
				</FarmProperty>
			))}
		</FarmRoot>
	);
};

export default Farms;
