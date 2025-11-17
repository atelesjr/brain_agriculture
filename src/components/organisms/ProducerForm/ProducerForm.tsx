import {
	FarmsSection,
	Field,
	ProducerForm,
	Row,
	ButtonsSection,
} from './ProducerForm.styles';
import Input from '@/components/atoms/Input';
import DocumentInput from '@/components/molecules/DocumentInput/DocumentInput';
import { producerCreateSchema } from './ProducerFromScheme';
import type z from 'zod';
import Farms from './Farms/Farms';

import { useProducerForm } from './useProducerForm';
import { closeModal } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { Button } from '@/components/atoms';

export type ProducerFormValues = z.infer<typeof producerCreateSchema>;
import { useTheme } from 'styled-components';

const ProducerFormComponent: React.FC = () => {
	const theme = useTheme();

	// use the reusable hook to encapsulate form and domain logic
	const {
		form,
		farms,
		setFarms,
		farmFormOpen,
		handleOpenFarmForm,
		handleCloseFarmForm,
		canAddProperty,
		submitError,
		onSubmit,
	} = useProducerForm();

	const dispatch = useDispatch<AppDispatch>();

	const { register, handleSubmit, control, formState: { errors } } = form;

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
						onOpenForm={handleOpenFarmForm}
						onCloseForm={handleCloseFarmForm}
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
