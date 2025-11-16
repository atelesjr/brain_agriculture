import { styled } from 'styled-components';

export const ProducerForm = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	padding: 24px;
`;

interface FieldSectionProps {
	width?: string;
}

export const Row = styled.div`
	display: flex;
	gap: 16px;
	margin-bottom: 8px;
`;

export const Field = styled.div<FieldSectionProps>`
	width: ${(props) => props.width || '100%'};
`;
