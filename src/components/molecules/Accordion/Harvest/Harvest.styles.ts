import styled from 'styled-components';

export const HarvestRoot = styled.div`
	display: flex;
	gap: 16px;
`;

export const HarvestProperty = styled.div`
	display: flex;
	flex-direction: column;

	border-right: 1px solid
		${({ theme }) => theme?.colors?.secondary ?? '#0F172A'};
	padding: 12px 0px;
`;

export const FarmHeader = styled.div`
	display: flex;
`;

export const FarmName = styled.div`
	font-weight: 600;
	color: ${({ theme }) => theme?.colors?.primary ?? '#0F172A'};
	margin-right: 8px;
`;

export const FarmCity = styled.div`
	font-weight: 400;
`;

export const FarmDetails = styled.div`
	display: flex;
	gap: 12px;
`;

export const HarvestLabel = styled.div`
	font-weight: 400;
	margin-right: 8px;
`;

export const HarvestValue = styled.div`
	font-weight: 600;
	margin-right: 16px;
`;

export const HarvestInfo = styled.div`
	display: flex;
	gap: 8px;
	margin-right: 16px;
`;
