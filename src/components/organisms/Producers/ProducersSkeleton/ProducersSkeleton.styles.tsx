import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonRoot = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const SkeletonItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 12px;
	border-radius: 8px;
	background: ${(p) => p.theme.colors.surface || '#f3f3f3'};
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`;

export const Bar = styled.div<{ width?: string; height?: string }>`
	width: ${(p) => p.width || '100%'};
	height: ${(p) => p.height || '12px'};
	border-radius: 6px;
	background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.06) 25%,
			rgba(255, 255, 255, 0.12) 50%,
			rgba(255, 255, 255, 0.06) 75%
		),
		${(p) => p.theme.colors.surface || '#eee'};
	background-size: 800px 100%;
	animation: ${shimmer} 1.2s linear infinite;
`;
