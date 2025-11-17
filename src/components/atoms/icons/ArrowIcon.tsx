import styled from 'styled-components';

export const ArrowIconStyle = styled.svg<{ open?: boolean }>`
	color: ${({ theme }) => theme?.colors?.primary ?? '#0F172A'};
	transition: transform 180ms ease;
	transform-origin: center;
	transform: rotate(${(p) => (p.open ? '0deg' : '-90deg')});
	flex: 0 0 auto;
`;

interface ArrowIconProps {
	open?: boolean;
	width?: string;
	height?: string;
}

const ArrowIcon = ({ open, width, height }: ArrowIconProps) => {
	return (
		<ArrowIconStyle
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={width ?? '12'}
			height={height ?? '12'}
			open={open}
			aria-hidden="true"
		>
			{/* filled triangle pointing down by default; we rotate it to point right when closed */}
			<polygon points="4,6 20,6 12,18" fill="currentColor" />
		</ArrowIconStyle> // SVG content
	);
};

export default ArrowIcon;
