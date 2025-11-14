import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
	$variant: Variant;
	$size: Size;
	$fullWidth?: boolean;
	disabled?: boolean;
}

const variantStyles = {
	primary: css`
		background: ${({ theme }) => theme.colors.ghost};
		color: ${({ theme }) => theme.colors.primary};
		&:hover:not(:disabled) {
			background: ${({ theme }) => theme.colors.primaryHover};
		}
	`,
	secondary: css`
		background: ${({ theme }) => theme.colors.secondary};
		color: ${({ theme }) => theme.colors.textOnPrimary};
		&:hover:not(:disabled) {
			background: ${({ theme }) => theme.colors.secondaryHover};
		}
	`,
	ghost: css`
		background: ${({ theme }) => theme.colors.ghost};
		color: ${({ theme }) => theme.colors.text};
		border: 1px solid rgba(15, 23, 42, 0.08);
		&:hover:not(:disabled) {
			filter: brightness(0.95);
		}
	`,
};

const sizeStyles = {
	sm: css`
		padding: 6px 10px;
		font-size: ${({ theme }) => theme.fontSize.sm};
	`,
	md: css`
		padding: 8px 14px;
		font-size: ${({ theme }) => theme.fontSize.md};
	`,
	lg: css`
		padding: 12px 18px;
		font-size: ${({ theme }) => theme.fontSize.lg};
	`,
};

export const StyledButton = styled.button<StyledButtonProps>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: none;
	border-radius: ${({ theme }) => theme.radius.md};
	cursor: pointer;
	transition: background-color 120ms ease, transform 80ms ease;
	user-select: none;
	line-height: 1;
	font-weight: 600;

	${({ $variant }) => variantStyles[$variant]}
	${({ $size }) => sizeStyles[$size]}

  ${({ $fullWidth }) =>
		$fullWidth &&
		css`
			width: 100%;
		`}

  &:active:not(:disabled) {
		transform: translateY(1px);
	}

	/* & span {
		color: ${({ theme }) => theme.colors.primary};
	} */
	/* 
	&:hover {
		background: ${({ theme }) => theme.colors.primaryHover};
	} */

	&:disabled {
		cursor: not-allowed;
		background: ${({ theme }) => theme.colors.disabledBg};
		color: ${({ theme }) => theme.colors.disabledText};
		box-shadow: none;
		transform: none;
	}
`;
