import styled from 'styled-components';

export const DropdownRoot = styled.div`
	position: relative;
	display: inline-block;
	width: fit-content;
`;

export const Toggle = styled.button<{ open?: boolean }>`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 4px 8px;
	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	background: ${({ theme }) => theme.colors.ghost};
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 150ms ease;

	&:hover {
		background: ${({ theme }) => theme.colors.secondaryHover};
	}
`;

export const Menu = styled.div`
	position: absolute;
	left: 0;
	top: 95%;
	min-width: 100%;
	background: ${({ theme }) => theme.colors.background_main ?? '#fff'};
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	border-radius: 8px;
	box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);
	padding: 8px 0;
	z-index: 40;
`;

export const MenuItem = styled.button`
	display: block;
	width: 100%;
	text-align: left;
	padding: 6px 8px;
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.text};
	cursor: pointer;
	font-size: 12px;

	&:hover {
		background: ${({ theme }) => theme.colors.secondaryHover};
	}
`;

export const ArrowIcon = styled.svg<{ open?: boolean }>`
	width: 14px;
	height: 14px;
	flex: 0 0 auto;
	transition: transform 180ms ease;
	transform: rotate(${(p) => (p.open ? '90deg' : '0deg')});
	color: ${({ theme }) => theme.colors.text};
`;

export default DropdownRoot;
