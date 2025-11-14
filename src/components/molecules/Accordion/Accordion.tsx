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

type Item = {
	id: string | number;
	name: string;
	documentType: string;
	document: string;
};

const Accordion: React.FC<{ item: Item }> = ({ item }) => {
	const [open, setOpen] = useState(false);

	return (
		<AccordionRoot>
			<AccordionHeader
				role="button"
				tabIndex={0}
				onClick={() => setOpen((s) => !s)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((s) => !s);
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
				<p>Conteúdo do acordeão para {item.name}.</p>
			</AccordionContent>
		</AccordionRoot>
	);
};

export default Accordion;
