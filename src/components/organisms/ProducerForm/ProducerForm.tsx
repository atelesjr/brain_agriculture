import {
	FarmsSection,
	Field,
	ProducerForm,
	Row,
	ButtonsSection,
} from './ProducerForm.styles';
import Input from '@/components/atoms/Input';
import DocumentInput from '@/components/molecules/DocumentInput/DocumentInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { producerCreateSchema } from './ProducerFromScheme';
import type z from 'zod';
import Farms from './Farms/Farms';
import type { Farm } from '@/types/producer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { createProducer } from '@/store/producersSlice';
import { closeModal } from '@/store/modalSlice';
import { Button } from '@/components/atoms';

export type ProducerFormValues = z.infer<typeof producerCreateSchema>;
import { useTheme } from 'styled-components';

const ProducerFormComponent = () => {
	const theme = useTheme();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm<ProducerFormValues>({
		resolver: zodResolver(producerCreateSchema),
		defaultValues: { name: '', document: '', farms: [] },
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	const dispatch = useDispatch<AppDispatch>();

	const [farms, setFarms] = useState<Farm[]>([]);
	const [farmFormOpen, setFarmFormOpen] = useState<boolean>(false);

	const watchedName = watch('name');
	const watchedDocument = watch('document');

	const canAddProperty = Boolean(
		watchedName && String(watchedName).trim().length > 0 &&
			watchedDocument && String(watchedDocument).trim().length > 0 &&
			!errors.name && !errors.document
	);

	const onSubmit = async (data: ProducerFormValues) => {
		console.log('ProducerForm submit values (form):', data);
		console.log('ProducerForm local farms state:', farms);
		setSubmitError(null);
		try {
			const payload: Omit<import('@/types/producer').Farmer, 'id'> = {
				document: data.document,
				// Farmer.documentType is required in the domain type; ensure we pass a string
				documentType: data.documentType ?? '',
				name: data.name,
				farms,
			};
			// dispatch createProducer thunk
			await dispatch(createProducer(payload)).unwrap();
			dispatch(closeModal());
		} catch (err) {
			console.error('Failed to create producer', err);
			setSubmitError(String((err as Error)?.message || err));
		}
	};

	const [submitError, setSubmitError] = useState<string | null>(null);

	return (
		<ProducerForm>
			<h2>Formulário de Produtor</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Nome do produtor using Input atom (registered via react-hook-form) */}
				<Row>
					<Field width={'500px'}>
							<Input
								label="Nome do produtor"
								placeholder="Digite o nome completo"
								required
								error={errors.name?.message ?? ''}
								{...register('name')}
							/>
					</Field>
					<Field width={'200px'}>
						<DocumentInput control={control} name="document" />
					</Field>
				</Row>
				<FarmsSection>
					<Farms
						farms={farms}
						setFarms={setFarms}
						onOpenForm={() => setFarmFormOpen(true)}
						onCloseForm={() => setFarmFormOpen(false)}
						canAddProperty={canAddProperty}
					/>
				</FarmsSection>

				{!farmFormOpen && (
					<ButtonsSection>
						<Button type="submit" variant="primary" size="sm" disabled={!canAddProperty}>
							Salvar Produtor
						</Button>
						<Button
							role="button"
							variant="secondary"
							size="sm"
							onClick={() => dispatch(closeModal())}
						>
							Cancelar
						</Button>

						{submitError && (
							<div style={{ color: theme.colors.alert, marginTop: 8 }}>{submitError}</div>
						)}
					</ButtonsSection>
				)}
			</form>
		</ProducerForm>
	);
};

export default ProducerFormComponent;
