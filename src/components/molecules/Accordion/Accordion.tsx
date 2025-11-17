import React, { useState } from 'react';
import {
	AccordionRoot,
	AccordionHeader,
	HeaderText,
	Highlight,
	DocumentText,
	AccordionContent,
	HeaderLeft,
} from './Accordion.styles';
import ArrowIcon from '@/components/atoms/icons/ArrowIcon';
import { IconButton } from '@/components/atoms/Buttons';
import { openModal } from '@/store/modalSlice';
import ProducerForm from '@/components/organisms/ProducerForm/ProducerForm';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { deleteProducer as deleteProducerAction } from '@/store/producersSlice';
import type { Farmer } from '@/types/producer';
import Farms from './Farm/Farm';

const Accordion: React.FC<{ item: Farmer }> = ({ item }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [open, setOpen] = useState(false);
	const [resetCounter, setResetCounter] = useState(0);

	const handleOnClick = () => {
		setOpen((s) => {
			const next = !s;
			if (!next) {
				// accordion is closing -> bump reset counter to instruct children to reset
				setResetCounter((c) => c + 1);
			}
			return next;
		});
	};

	return (
		<AccordionRoot>
			<AccordionHeader
				role="button"
				tabIndex={0}
				onClick={() => handleOnClick()}
				aria-expanded={open}
				open={open}
			>
				<HeaderLeft>
					<ArrowIcon open={open} width="12" height="12" />
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
						// open modal with ProducerForm in edit mode (pass initialProducer)
						const EditForm = <ProducerForm initialProducer={item} />;
						void dispatch(openModal(EditForm));
					}}
				/>
				<IconButton
					action="delete"
					label="Excluir"
					variant="primary"
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						void dispatch(deleteProducerAction(item.id));
					}}
				/>
			</AccordionHeader>

			<AccordionContent hidden={!open} aria-hidden={!open}>
				<Farms farms={item.farms} resetCounter={resetCounter} />
			</AccordionContent>
		</AccordionRoot>
	);
};

export default Accordion;
