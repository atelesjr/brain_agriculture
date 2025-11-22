import React from 'react';
import { PageContent } from '@/components/atoms/PageContent';
import {
	Grid,
	StatsColumn,
	ChartsGrid,
	StatCard,
	StatLabel,
	StatNumber,
} from './styles';
import ChartsPanel from './ChartsPanel/ChartsPanel';
import { COLORS } from './constants';
import useDashboardData from './useDashboardData';

const Dashboard: React.FC = () => {
	const { totalFarms, totalHectares, byState, byCulture, landUse } =
		useDashboardData();

	// Charts are rendered by ChartsPanel component

	return (
		<PageContent>
			<h1>Painel</h1>

			<Grid>
				<StatsColumn>
					<StatCard>
						<StatLabel>Total de propriedades cadastradas:</StatLabel>
						<StatNumber>{totalFarms}</StatNumber>
					</StatCard>

					<StatCard>
						<StatLabel>Total de hectares registrados:</StatLabel>
						<StatNumber>{totalHectares}</StatNumber>
					</StatCard>
				</StatsColumn>

				<ChartsGrid>
					<ChartsPanel
						byCulture={byCulture}
						landUse={landUse}
						byState={byState}
						colors={COLORS}
					/>
				</ChartsGrid>
			</Grid>
		</PageContent>
	);
};

export default Dashboard;
