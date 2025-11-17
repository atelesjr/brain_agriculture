import { styled } from 'styled-components';

export const FarmListRoot = styled.div`
	font-size: 14px;
`;

export const FarmItem = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	gap: 8px;

	border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
	padding-bottom: 4px;
`;

export const FarmListHeader = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
`;

export const HarvestSection = styled.div``;

export const FarmField = styled.div`
	display: flex;
	gap: 8px;
`;

export const FarmFieldLabel = styled.div``;
export const FarmFieldValue = styled.div`
	font-weight: 600;
`;
