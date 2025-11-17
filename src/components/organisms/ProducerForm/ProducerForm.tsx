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
import { producerSchema } from './ProducerFromScheme';
import type z from 'zod';
import Farms from './Farms/Farms';
import type { Farm } from '@/types/producer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import producersService from '@/services/producers';
import { closeModal } from '@/store/modalSlice';
import { Button } from '@/components/atoms';

export type ProducerFormValues = z.infer<typeof producerSchema>;

const ProducerFormComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ProducerFormValues>({
		resolver: zodResolver(producerSchema),
		defaultValues: { name: '', document: '', farms: [] },
	});

	const dispatch = useDispatch<AppDispatch>();

	const [farms, setFarms] = useState<Farm[]>([]);
	const [farmFormOpen, setFarmFormOpen] = useState<boolean>(false);

	const onSubmit = async (data: ProducerFormValues) => {
		try {
			const payload = { ...(data as any), farms };
			await producersService.createProducer(payload as any);
			dispatch(closeModal());
		} catch (err) {
			console.error('Failed to create producer', err);
		}
	};

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
							error={errors.name?.message as string}
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
					/>
				</FarmsSection>

				{!farmFormOpen && (
					<ButtonsSection>
						<Button role="submit" variant="primary" size="sm">
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
					</ButtonsSection>
				)}
			</form>
		</ProducerForm>
	);
};

export default ProducerFormComponent;
