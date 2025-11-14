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
	action: IconAction;
	label?: string;
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
	({ action, label, variant = 'primary', size = 'sm', ...rest }, ref) => {
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

			const maybeOnClick = (
				rest as React.ButtonHTMLAttributes<HTMLButtonElement>
			).onClick;
			if (maybeOnClick) maybeOnClick(e);
		};

		const icon = iconMap[action];

		return (
			<StyledButton
				ref={ref as unknown as React.Ref<HTMLButtonElement>}
				$variant={variant}
				$size={size}
				aria-label={label ?? defaultLabels[action]}
				{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
				onClick={handleClick}
			>
				<Img
					src={icon}
					alt={label ?? defaultLabels[action]}
					aria-hidden="true"
				/>
				<span>
					{done && action === 'delete'
						? 'Excluído'
						: label ?? defaultLabels[action]}
				</span>
			</StyledButton>
		);
	}
);

IconButton.displayName = 'IconButton';

export default IconButton;
