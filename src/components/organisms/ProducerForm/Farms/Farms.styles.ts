import { styled } from 'styled-components';

export const FarmsFormRoot = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const FarmHeader = styled.div<{ open?: boolean }>`
	display: flex;
	justify-content: space-between;
	padding: 0 0 8px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
	margin-bottom: 16px;
`;

export const FarmContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const FarmFormHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 8px;

	${({ theme }) => theme.media.maxTablet} {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
`;

export const FarmFormLocation = styled.div`
	display: flex;
	gap: 16px;
`;

export const FarmFormAreaContent = styled.div`
	display: flex;
	gap: 16px;
`;

export const ButtonsSection = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`;

export const FarmsListSection = styled.div``;
