type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
interface StyledButtonProps {
    $variant: Variant;
    $size: Size;
    $fullWidth?: boolean;
    disabled?: boolean;
}
export declare const StyledButton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, StyledButtonProps>> & string;
export {};
