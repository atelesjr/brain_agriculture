import { styled } from 'styled-components';

export const FarmsFormRoot = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const FarmHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 0 8px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
	margin-bottom: 16px;
`;
