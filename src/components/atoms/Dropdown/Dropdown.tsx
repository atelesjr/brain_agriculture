import React, { useState, useRef } from 'react';
import {
	DropdownRoot,
	Toggle,
	Menu,
	MenuItem,
	ArrowIcon,
} from './Dropdown.styles';
import useClickOutside from '@/hooks/useClickOutside';

export type DropdownItem = {
	id: string | number;
	label: string;
	onSelect?: (id: string | number) => void;
};

export interface DropdownProps {
	label?: string;
	items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ label = 'Opções', items }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useClickOutside(ref, () => setOpen(false));

	return (
		<DropdownRoot ref={ref}>
			<Toggle
				type="button"
				onClick={() => setOpen((s) => !s)}
				aria-expanded={open}
				open={open}
			>
				{label}
				<ArrowIcon viewBox="0 0 24 24" open={open} aria-hidden="true">
					<path
						d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"
						fill="currentColor"
					/>
				</ArrowIcon>
			</Toggle>

			{open && (
				<Menu role="menu">
					{items.map((it) => (
						<MenuItem
							key={String(it.id)}
							role="menuitem"
							onClick={(e) => {
								e.stopPropagation();
								setOpen(false);
								if (it.onSelect) it.onSelect(it.id);
							}}
						>
							{it.label}
						</MenuItem>
					))}
				</Menu>
			)}
		</DropdownRoot>
	);
};

export default Dropdown;
