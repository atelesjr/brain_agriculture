
import styled from 'styled-components';

const HEADER_HEIGHT = '64px';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	min-width: 37rem;
	height: 100vh;

	/* reserve space for fixed header */
	padding-top: ${HEADER_HEIGHT};

	& > main {
		flex: 1 1 auto;
		width: 100%;
		overflow: auto;
	}
`;
