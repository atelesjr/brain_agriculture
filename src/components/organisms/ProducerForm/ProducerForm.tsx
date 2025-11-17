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
import { useEffect } from 'react';
import { producerSchema } from './ProducerFromScheme';
import type z from 'zod';
import Farms from './Farms/Farms';
import { Button } from '@/components/atoms';

export type ProducerFormValues = z.infer<typeof producerSchema>;

const ProducerFormComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		control,
	} = useForm<ProducerFormValues>({
		resolver: zodResolver(producerSchema),
		defaultValues: { name: '' },
	});

	// trigger validation on mount so the error UI is visible for review
	useEffect(() => {
		// run validation for 'nome' to populate errors on first render
		//trigger('nome');
	}, [trigger]);

	const onSubmit = (data: ProducerFormValues) => {
		// TODO: replace with real submission logic
		console.log('Producer submit:', data);
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
					<Farms />
				</FarmsSection>
				<ButtonsSection>
					<Button role="submit" variant="primary" size="sm">
						Salvar Produtor
					</Button>
					<Button
						role="button"
						variant="secondary"
						size="sm"
						onClick={() => {}}
					>
						Cancelar
					</Button>
				</ButtonsSection>
			</form>
		</ProducerForm>
	);
};

export default ProducerFormComponent;
