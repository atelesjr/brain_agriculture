import { ProducerForm } from './ProducerForm.styles';
import Input from '@/components/atoms/Input';
import DocumentInput from '@/components/molecules/DocumentInput/DocumentInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { producerSchema } from './ProducerFromScheme';
import type z from 'zod';

type ProducerFormValues = z.infer<typeof producerSchema>;

const ProducerFormComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		control,
	} = useForm<ProducerFormValues>({
		resolver: zodResolver(producerSchema),
		defaultValues: { nome: '' },
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
				<Input
					label="Nome do produtor"
					placeholder="Digite o nome completo"
					required
					error={errors.nome?.message as string}
					{...register('nome')}
				/>

				{/* componente DocumentInput */}
				<DocumentInput control={control} name="documento" />
				<div className="label">Nome da propriedade:</div>
				<div className="label">Cidade</div>
				<div className="label">Estado</div>
				<div className="label">Área total da fazenda (em hectares)</div>
				<div className="label">Área agricultável (em hectares)</div>
				<div className="label">Área de vegetação (em hectares)</div>

				<div className="label">Safras (ex: Safra 2021, Safra 2022)</div>
				<div className="label">
					Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café
					na Safra 2022)
				</div>

				<button type="submit">Salvar</button>
			</form>
		</ProducerForm>
	);
};

export default ProducerFormComponent;
