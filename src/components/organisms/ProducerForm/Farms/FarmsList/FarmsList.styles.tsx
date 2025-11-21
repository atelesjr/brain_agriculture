import { styled } from 'styled-components';

export const FarmListRoot = styled.div`
	font-size: 14px;
`;

export const FarmItem = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	gap: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
	padding-bottom: 4px;
`;

export const FarmListHeader = styled.div`
	display: flex;
	gap: 12px;
	align-items: flex-start;
	cursor: pointer;
	user-select: none;
`;

export const FarmField = styled.div<{ width?: string }>`
	display: flex;
	gap: 8px;
	width: ${({ width }) => (width ? width : 'auto')};
`;

export const FarmFieldLabel = styled.div`
	font-size: 14px;

	${({ theme }) => theme?.media?.maxMobile} {
		font-size: 12px;
	}
`;

export const FarmFieldValue = styled.div<{ $highlight?: boolean }>`
	color: ${({ theme, $highlight }) =>
		$highlight ? theme.colors.primary : theme.colors.textSecondary};
	font-weight: 600;

	${({ theme }) => theme?.media?.maxMobile} {
		font-size: 12px;
	}
`;

export const FarmInfo = styled.div`
	display: flex;

	${({ theme }) => theme?.media?.maxMobile} {
		flex-direction: column;
		gap: 8px;
	}
`;

export const FarmInfoContent = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;

	${({ theme }) => theme?.media?.maxMobile} {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const FarmAreaContent = styled.div<{ isOpen?: boolean }>`
	display: flex;
	flex-flow: wrap;
	gap: 8px;

	${({ theme }) => theme?.media?.maxMobile} {
		${({ isOpen }) => (isOpen ? 'display: flex;' : 'display: none;')}
		flex-direction: column;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 8px;
`;

export const HarvestSection = styled.div<{ hidden?: boolean }>`
	display: flex;
	display: ${({ hidden }) => (hidden ? 'none' : 'flex')};

	${({ theme }) => theme?.media?.maxTablet} {
		padding-left: 20px;
	}
`;

export const HarvestsFormRoot = styled.div`
	display: flex;
	margin-right: 16px;

	& > h5 {
		margin-right: 24px;
	}
`;

export const BottomSection = styled.div`
	margin-top: 28px;
`;
