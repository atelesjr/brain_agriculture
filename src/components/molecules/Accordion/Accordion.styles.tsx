import styled from 'styled-components';

export const AccordionRoot = styled.div`
	border: 1px solid ${({ theme }) => theme?.colors?.primary ?? '#0F172A'};
	border-radius: 8px;
`;

export const AccordionHeader = styled.div<{ open?: boolean }>`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 16px;
	justify-content: space-between;
	cursor: pointer;
	user-select: none;
	background: transparent;
	border-bottom: ${({ open, theme }) =>
		open ? `1px solid ${theme.colors.primary ?? '#eee'}` : 'none'};
`;

export const Producer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	${({ theme }) => theme?.media?.maxMobile} {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const ProducerName = styled.div`
	display: flex;
	justify-content: center;
`;

export const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	flex: 1 1 auto;
`;

export const IconButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	background: transparent;
	border: none;
	color: ${({ theme }) => theme?.colors?.text ?? '#0F172A'};
	padding: 6px 8px;
	border-radius: 6px;
	cursor: pointer;

	&:hover {
		background: rgba(0, 0, 0, 0.03);
	}
`;

export const Highlight = styled.span`
	font-weight: 700;
	color: ${({ theme }) => theme?.colors?.text ?? '#0F172A'};
`;

export const DocumentText = styled.span`
	font-size: 12px;
	color: ${({ theme }) => theme?.colors?.textSecondary ?? '#0F172A'};
`;

export const ProducerId = styled.div`
	width: 50px;
	font-size: 12px;
`;

export const AccordionContent = styled.div`
	padding: 0 16px 12px 40px; /* leave space for arrow */
`;

export default AccordionRoot;
