export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Button;
export { default as IconButton } from './IconButton';
