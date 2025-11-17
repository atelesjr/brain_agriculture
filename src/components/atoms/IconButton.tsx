import React, { forwardRef, useState } from 'react';
import type { IconButtonProps } from './Buttons/IconButton';
import { Img, StyledButton } from './Buttons/styles';

const iconMap = {
	add: '+',
	edit: '✎',
	delete: '×',
} as const;

type IconButtonRef = HTMLButtonElement;
type IconButtonComponent = React.ForwardRefExoticComponent<
	IconButtonProps & React.RefAttributes<IconButtonRef>
>;

const IconButton = forwardRef<IconButtonRef, IconButtonProps>(
	({ action, label, variant = 'primary', size = 'sm', ...rest }, ref) => {
		const [done, setDone] = useState(false);

		// changed: make a const object and narrow `action` before indexing
		const defaultLabels = {
			add: 'Adicionar',
			edit: 'Alterar',
			delete: 'Excluir',
		} as const;

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

		const icon =
			// prefer explicit prop if provided
			rest && (rest as { icon?: React.ReactNode }).icon
				? (rest as { icon?: React.ReactNode }).icon
				: action
				? iconMap[action]
				: undefined;

		// compute a default label only when action is defined
		const computedDefaultLabel = action
			? defaultLabels[action as keyof typeof defaultLabels]
			: undefined;

		const restProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
		const typeProp = restProps.type ?? 'button';

		return (
			<StyledButton
				ref={ref as unknown as React.Ref<HTMLButtonElement>}
				$variant={variant}
				$size={size}
				type={typeProp}
				aria-label={label ?? computedDefaultLabel}
				{...restProps}
				onClick={handleClick}
			>
				{typeof icon === 'string' ? (
					<Img
						src={icon}
						alt={label ?? computedDefaultLabel}
						aria-hidden="true"
					/>
				) : (
					// allow passing a React node (SVG component)
					icon ?? null
				)}
				<span>
					{done && action === 'delete'
						? 'Excluído'
						: label ?? computedDefaultLabel}
				</span>
			</StyledButton>
		);
	}
) as IconButtonComponent;

export default IconButton;

// ...existing code
