import styled from 'styled-components';
import type { Theme } from '@/styles/theme';

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
	border-bottom: ${(p) =>
		p.open
			? `1px solid ${(p.theme as unknown as Theme).colors.primary ?? '#eee'}`
			: 'none'};
`;

export const HeaderText = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

export const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	flex: 1 1 auto;
`;

export const IconButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	background: transparent;
	border: none;
	color: ${(p) => (p.theme as unknown as Theme).colors.text ?? '#0F172A'};
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
	font-size: 0.9rem;
	color: ${({ theme }) => theme?.colors?.textSecondary ?? '#0F172A'};
`;

export const AccordionContent = styled.div`
	padding: 0 16px 12px 46px; /* leave space for arrow */
`;

export default AccordionRoot;
