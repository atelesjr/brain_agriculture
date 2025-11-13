import React from 'react';
import Button, { type ButtonProps } from '../atoms/Buttons';

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
	icon: React.ReactNode;
	label?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
	icon,
	label,
	...rest
}) => {
	const ariaLabel = rest['aria-label'] ?? label;
	return (
		<Button {...rest} aria-label={ariaLabel}>
			{icon}
			{label ? <span style={{ marginLeft: 6 }}>{label}</span> : null}
		</Button>
	);
};

export default IconButton;
