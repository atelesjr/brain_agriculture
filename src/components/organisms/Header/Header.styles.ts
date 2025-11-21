import styled from 'styled-components';

export const HeaderRoot = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px 40px;
	background: ${({ theme }) => theme.colors?.background_main ?? '#fff'};
	border-bottom: 1px solid ${({ theme }) => theme.colors?.muted ?? '#eee'};
	margin: 0 auto;

	/* keep header fixed at top */
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 64px;
	z-index: 1000;

	${({ theme }) => theme?.media?.maxTablet} {
		padding-inline: 20px;
	}
`;
export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: 1552px;
	margin: 0 auto;
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
