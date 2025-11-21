import styled from 'styled-components';

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.35);
	backdrop-filter: blur(6px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;

	${({ theme }) => theme?.media?.maxTablet} {
		align-items: normal;
	}
`;

export const Dialog = styled.div`
	width: 80%;
	max-width: 1152px;
	background: var(--surface, #fff);
	border-radius: 8px;
	padding: 20px;
	box-sizing: border-box;

	overflow: auto;
	display: flex;
	flex-direction: column;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	position: relative;

	${({ theme }) => theme?.media?.maxTablet} {
		width: 90%;
		max-width: 90%;
	}

	${({ theme }) => theme?.media?.maxMobile} {
		width: 95%;
		max-width: 95%;
	}
`;

export const CloseBtn = styled.button`
	/* keep visible while dialog content scrolls */
	position: sticky;
	top: 12px;
	align-self: flex-end;
	border: none;
	background: transparent;
	font-size: 20px;
	line-height: 1;
	cursor: pointer;
	color: #333;
	padding: 4px;
	border-radius: 4px;
	z-index: 2;

	&:hover {
		background: rgba(0, 0, 0, 0.06);
	}
`;
