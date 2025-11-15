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
`;

export const Dialog = styled.div`
	width: 80%;
	max-width: calc(100% - 2rem);
	background: var(--surface, #fff);
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	position: relative;
`;

export const CloseBtn = styled.button`
	position: absolute;
	right: 12px;
	top: 12px;
	border: none;
	background: transparent;
	font-size: 20px;
	line-height: 1;
	cursor: pointer;
	color: #333;
	padding: 4px;
	border-radius: 4px;

	&:hover {
		background: rgba(0, 0, 0, 0.06);
	}
`;
