import styled from 'styled-components';

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 320px 1fr;
	gap: 1rem;
	width: 100%;
	margin-top: 1rem;

	${({ theme }) => theme?.media?.maxTablet} {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
	}
`;

export const TextAreaSection = styled.div``;

export const StatsColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	${({ theme }) => theme?.media?.maxTablet} {
		flex-direction: row;
	}
`;

export const ChartsGrid = styled.div`
	display: grid;
	/* make each chart occupy its own row for better readability */
	grid-template-columns: 1fr;
	gap: 1rem;
	width: 100%;
`;

export const StatCard = styled.div`
	background: ${({ theme }) => theme.colors.background_secondary};
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

export const StatNumber = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.primary};
`;

export const StatLabel = styled.div`
	font-size: 0.9rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text_secondary};
`;

export const ChartCard = styled(StatCard)`
	min-height: 440px;
	display: flex;
	flex-direction: column;
`;

export const LegendWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-top: 22px;
`;

export const LegendItem = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.text};
`;

export const LegendSwatch = styled.span<{ color?: string }>`
	width: 12px;
	height: 12px;
	border-radius: 2px;
	display: inline-block;
	background: ${({ color }) => color || 'transparent'};
`;
