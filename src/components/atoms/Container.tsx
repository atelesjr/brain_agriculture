import styled from 'styled-components';

const HEADER_HEIGHT = '64px';

export const Container = styled.div`
	display: flex;

	width: 100%;
	min-width: 360px;
	max-width: 1552px;
	height: 100vh;
	margin: 0 auto;

	/* reserve space for fixed header */
	padding-top: ${HEADER_HEIGHT};

	& > main {
		flex: 1 1 auto;
		width: 100%;
		overflow: auto;
	}
`;
