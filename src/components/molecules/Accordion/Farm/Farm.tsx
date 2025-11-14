import type { Farm } from '@/types/producer';
import {
	FarmRoot,
	FarmProperty,
	FarmValue,
	FarmLabel,
	FarmInfo,
	FarmCol,
	FarmName,
	FarmDetails,
	FarmCity,
	FarmHeader,
	FarmContent,
} from './Farm.styles';
import Harvest from '../Harvests/Harvests';

interface FarmsProps {
	farms: Farm[];
}

const Farms = ({ farms }: FarmsProps) => {
	if (farms.length === 0) {
		return <FarmRoot>Nenhuma propriedade cadastrada.</FarmRoot>;
	}

	return (
		<FarmRoot>
			{farms.map((farm) => (
				<FarmProperty key={farm.id}>
					<FarmInfo>
						<FarmHeader>
							<FarmName>{farm?.name || 'N/A'}</FarmName> -{' '}
							<FarmCity>
								{`${farm?.city || 'N/A'} - ${farm?.state || 'N/A'}`}
							</FarmCity>
						</FarmHeader>

						<FarmContent>
							<FarmDetails>
								<FarmCol>
									<FarmLabel>Área total:</FarmLabel>
									<FarmValue>{farm?.areaTotal || 'N/A'}ha</FarmValue>
								</FarmCol>

								<FarmCol>
									<FarmLabel>Área cultivável:</FarmLabel>{' '}
									<FarmValue>{farm?.cultivableLand || 'N/A'}ha</FarmValue>
								</FarmCol>

								<FarmCol>
									<FarmLabel>Área vegetada:</FarmLabel>{' '}
									<FarmValue>{farm?.vegetatedArea || 'N/A'}ha</FarmValue>
								</FarmCol>
							</FarmDetails>
						</FarmContent>
					</FarmInfo>

					<Harvest farm={farm} />
				</FarmProperty>
			))}
		</FarmRoot>
	);
};

export default Farms;
