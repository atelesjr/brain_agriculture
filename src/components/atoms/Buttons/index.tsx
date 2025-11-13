import { forwardRef } from 'react';
import { StyledButton } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	children?: React.ReactNode;
	'aria-label'?: string;
}

/**
 * Atom: Button
 * - Simples, acessível, com variantes e tamanhos
 * - Usa forwardRef para compatibilidade com formulários e testes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const {
			variant = 'primary',
			size = 'md',
			fullWidth = false,
			children,
			...rest
		} = props;

		return (
			<StyledButton
				ref={ref}
				$variant={variant}
				$size={size}
				$fullWidth={fullWidth}
				{...rest}
			>
				{children}
			</StyledButton>
		);
	}
);

Button.displayName = 'Button';
export default Button;
