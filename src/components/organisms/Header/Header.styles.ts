import styled from 'styled-components';

export const HeaderRoot = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.25rem;
	background: ${({ theme }) => theme.colors?.background_main ?? '#fff'};
	border-bottom: 1px solid ${({ theme }) => theme.colors?.muted ?? '#eee'};
`;

export const Brand = styled.h1`
	font-size: 1.25rem;
	margin: 0;
	color: ${({ theme }) => theme.colors?.primary ?? '#000'};
`;

export const Nav = styled.nav`
	display: flex;
	gap: 1rem;

	a {
		color: ${({ theme }) => theme.colors?.primary ?? '#000'};
		text-decoration: none;
		font-weight: 500;
	}
`;
