import React, { useState } from 'react';
import {
	AccordionRoot,
	AccordionHeader,
	ArrowIcon,
	HeaderText,
	Highlight,
	DocumentText,
	AccordionContent,
	HeaderLeft,
} from './Accordion.styles';
import { IconButton } from '@/components/atoms/Buttons';
import type { Farmer } from '@/types/producer';
import Farms from './Farm/Farm';

const Accordion: React.FC<{ item: Farmer }> = ({ item }) => {
	const [open, setOpen] = useState(false);
	const [resetCounter, setResetCounter] = useState(0);

	return (
		<AccordionRoot>
			<AccordionHeader
				role="button"
				tabIndex={0}
				onClick={() => {
					setOpen((s) => {
						const next = !s;
						if (!next) {
							// accordion is closing -> bump reset counter to instruct children to reset
							setResetCounter((c) => c + 1);
						}
						return next;
					});
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((s) => {
							const next = !s;
							if (!next) setResetCounter((c) => c + 1);
							return next;
						});
					}
				}}
				aria-expanded={open}
				open={open}
			>
				<HeaderLeft>
					<ArrowIcon
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="18"
						height="18"
						open={open}
						aria-hidden="true"
					>
						{/* filled triangle pointing down by default; we rotate it to point right when closed */}
						<polygon points="4,6 20,6 12,18" fill="currentColor" />
					</ArrowIcon>

					<HeaderText>
						<Highlight>{`id: "${item.id}" - ${item.name}`}</Highlight>
						<DocumentText>{`${item.documentType}: ${item.document}`}</DocumentText>
					</HeaderText>
				</HeaderLeft>

				<IconButton
					action="edit"
					label="Editar"
					variant="primary"
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						console.log('Editar', item.id);
					}}
				/>
				<IconButton
					action="delete"
					label="Excluir"
					variant="primary"
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						console.log('Excluir', item.id);
					}}
				/>
			</AccordionHeader>

			<AccordionContent hidden={!open} aria-hidden={!open}>
				<Farms
					farms={(item.farms || []).map((f) => ({
						...f,
						safras: f.safras || [],
					}))}
					resetCounter={resetCounter}
				/>
			</AccordionContent>
		</AccordionRoot>
	);
};

export default Accordion;
