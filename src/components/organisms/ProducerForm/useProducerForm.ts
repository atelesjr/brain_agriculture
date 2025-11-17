import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { producerCreateSchema } from './ProducerFromScheme';
import type { ProducerFormValues } from './ProducerForm';
import type { Farm, Farmer } from '@/types/producer';
import type { AppDispatch } from '@/store';
import { createProducer } from '@/store/producersSlice';
import { closeModal } from '@/store/modalSlice';

export function useProducerForm(initialFarms: Farm[] = []) {
	const dispatch = useDispatch<AppDispatch>();

	const form = useForm<ProducerFormValues>({
		resolver: zodResolver(producerCreateSchema),
		defaultValues: { name: '', document: '', farms: [] },
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	const { watch, formState } = form;
	const { errors } = formState;
	const watchedName = watch('name');
	const watchedDocument = watch('document');

	const [farms, setFarms] = useState<Farm[]>(initialFarms);
	const [farmFormOpen, setFarmFormOpen] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const canAddProperty = Boolean(
		watchedName &&
			String(watchedName).trim().length > 0 &&
			watchedDocument &&
			String(watchedDocument).trim().length > 0 &&
			!errors.name &&
			!errors.document
	);

	const inferDocumentType = (doc?: string): string => {
		if (!doc) return '';
		const digits = String(doc).replace(/\D/g, '');
		if (digits.length === 11) return 'CPF';
		if (digits.length === 14) return 'CNPJ';
		return '';
	};

	const handleOpenFarmForm = useCallback(() => setFarmFormOpen(true), []);
	const handleCloseFarmForm = useCallback(() => setFarmFormOpen(false), []);

	const onSubmit = useCallback(
		async (data: ProducerFormValues) => {
			setSubmitError(null);
			try {
				const payload: Omit<Farmer, 'id'> = {
					document: data.document,
					documentType: data.documentType ?? inferDocumentType(data.document),
					name: data.name,
					farms,
				};

				await dispatch(createProducer(payload)).unwrap();
				dispatch(closeModal());
			} catch (err) {
				setSubmitError(String((err as Error)?.message || err));
			}
		},
		[dispatch, farms]
	);

	return {
		form,
		farms,
		setFarms,
		farmFormOpen,
		handleOpenFarmForm,
		handleCloseFarmForm,
		canAddProperty,
		submitError,
		setSubmitError,
		inferDocumentType,
		onSubmit,
	} as const;
}
