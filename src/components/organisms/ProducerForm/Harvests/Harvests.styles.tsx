import { styled } from 'styled-components';

export const HarvestsRoot = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const HarvestItem = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	gap: 8px;
	padding-bottom: 4px;
`;

export const HarvestsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryHover};
`;

export const CultureSection = styled.div``;

export const CultureField = styled.div`
	display: flex;
	gap: 8px;
`;

export const CultureLabel = styled.div``;
export const CultureValue = styled.div`
	font-weight: 600;
`;
