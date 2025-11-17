import React, { forwardRef, useState } from 'react';
import { StyledButton } from './styles';
import type { ButtonProps } from './index';
import styled from 'styled-components';
import addIcon from '@/assets/add.svg';
import editIcon from '@/assets/edit.svg';
import garbageIcon from '@/assets/garbage.svg';

const Img = styled.img`
	display: inline-block;
	width: 14px;
	height: 14px;
`;

export type IconAction = 'add' | 'edit' | 'delete';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
	action?: IconAction;
	label?: string;
	/** optional icon override: either a string URL (imported svg) or a React node */
	icon?: string | React.ReactNode;
}

const iconMap: Record<IconAction, string> = {
	add: addIcon,
	edit: editIcon,
	delete: garbageIcon,
};

/**
 * IconButton atom — small button with icon + label
 * - Keeps a local "done" state when action is `delete` so the UI reflects the change
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ action, label, variant = 'primary', size = 'sm', icon, ...rest }, ref) => {
		const [done, setDone] = useState(false);

		const defaultLabels: Record<IconAction, string> = {
			add: 'Adicionar',
			edit: 'Alterar',
			delete: 'Excluir',
		};

		const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
			if (action === 'delete') {
				// mark as done and keep the state
				setDone(true);
			}

			const restProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
			const maybeOnClick = restProps.onClick;
			if (maybeOnClick) maybeOnClick(e);
		};

		const resolvedIcon =
			// prefer explicit prop if provided
			icon ? icon : action ? iconMap[action] : undefined;

		const ariaLabel = label ?? (action ? defaultLabels[action] : undefined);
		const displayLabel = done && action === 'delete' ? 'Excluído' : label ?? (action ? defaultLabels[action] : undefined);

		const { type, ...otherRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
		const typeProp = type ?? 'button';

		return (
			<StyledButton
				ref={ref as unknown as React.Ref<HTMLButtonElement>}
				$variant={variant}
				$size={size}
				type={typeProp}
				aria-label={ariaLabel}
				{...(otherRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
				onClick={handleClick}
			>
				{typeof resolvedIcon === 'string' ? (
					<Img src={resolvedIcon} alt={ariaLabel} aria-hidden="true" />
				) : (
					// allow passing a React node (SVG component)
					resolvedIcon ?? null
				)}
				<span>{displayLabel}</span>
			</StyledButton>
		);
	}
);

IconButton.displayName = 'IconButton';

export default IconButton;
