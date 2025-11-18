import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { producerCreateSchema } from './ProducerFromScheme';
import type { ProducerFormValues } from './ProducerForm';
import type { Farm, Farmer } from '@/types/producer';
import type { AppDispatch } from '@/store';
import { createProducer, updateProducer } from '@/store/producersSlice';
import { closeModal } from '@/store/modalSlice';
import { onlyDigits, isValidCPF, isValidCNPJ } from '@/components/molecules/DocumentInput/utils/validations';

export function useProducerForm(initialProducer?: Farmer) {
	const dispatch = useDispatch<AppDispatch>();

	const form = useForm<ProducerFormValues>({
		resolver: zodResolver(producerCreateSchema),
		defaultValues: {
			name: initialProducer?.name ?? '',
			document: initialProducer?.document ?? '',
			documentType: initialProducer?.documentType ?? '',
			farms: initialProducer?.farms ?? [],
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	const { watch, formState } = form;
	const { errors, isValid } = formState;
	const watchedName = watch('name');
	const watchedDocument = watch('document');

	const [farms, setFarms] = useState<Farm[]>(initialProducer?.farms ?? []);
	const [farmFormOpen, setFarmFormOpen] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	// rely on react-hook-form's validation state (mode: 'onChange')
	// to decide whether the user can add properties or submit the form.
	// this ensures zod/resolver validation (including document rules)
	// is the single source of truth for form validity.
	const canAddProperty = Boolean(isValid);

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

				if (initialProducer && typeof initialProducer.id === 'number') {
					// update
					await dispatch(
						updateProducer({ id: initialProducer.id, payload })
					).unwrap();
				} else {
					await dispatch(createProducer(payload)).unwrap();
				}

				dispatch(closeModal());
			} catch (err) {
				setSubmitError(String((err as Error)?.message || err));
			}
		},
		[dispatch, farms, initialProducer]
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
