import styled from 'styled-components';

export const FarmRoot = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FarmProperty = styled.div`
	display: flex;
	align-items: flex-start;

	border-bottom: 1px solid
		${({ theme }) => theme?.colors?.secondary ?? '#0F172A'};
	padding: 12px 0px;
`;

export const FarmInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 24px;
	width: 490px;
`;

export const FarmHeader = styled.div`
	display: flex;
`;
export const FarmContent = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
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
	font-size: 14px;
`;

export const FarmLabel = styled.div`
	font-weight: 400;
	margin-right: 8px;
`;

export const FarmValue = styled.div`
	font-weight: 600;
	margin-right: 16px;
`;

export const FarmCol = styled.div`
	display: flex;
	gap: 8px;
`;

export const FarmHarvest = styled.div``;
