import styled from 'styled-components';

export const Content = styled.main`
	display: flex;

	width: 100%;
	min-width: 32rem;
	padding: 1rem 5rem;
	${({ theme }) => theme?.media?.maxTablet} {
		padding: 10px 20px;
	}
`;
