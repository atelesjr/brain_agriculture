import Input from '@/components/atoms/Input';
import { Field, Row } from '../ProducerForm.styles';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ProducerFormValues } from '../ProducerForm';

interface FarmsFormProps {
	register: UseFormRegister<ProducerFormValues>;
	errors: FieldErrors<ProducerFormValues>;
}

const FarmsForm = ({ register, errors }: FarmsFormProps) => {
	return (
		<>
			<Row>
				<Field width={'250px'}>
					<Input
						label="Nome da propriedade"
						placeholder="Nome da propriedade"
						{...register('farms')}
						error={errors.farms?.message as string}
					/>
				</Field>
				{/*         
				<Field width={'250px'}>
					<Input
						label="Cidade"
						placeholder="Cidade"
						{...register('city')}
						error={errors.city?.message as string}
					/>
				</Field>
				<Field width={'70px'}>
					<Input
						label="Estado"
						placeholder="Estado"
						{...register('state')}
						error={errors.state?.message as string}
					/>
				</Field>
			</Row>

			<Row>
				<Field width={'250px'}>
					<Input
						label="Área total da fazenda (em hectares)"
						placeholder="Área total (ha)"
						{...register('area_total')}
						error={errors.area_total?.message as string}
					/>
				</Field>
				<Field width={'250px'}>
					<Input
						label="Área agricultável (em hectares)"
						placeholder="Área agricultável (ha)"
						{...register('cultivable_land')}
						error={errors.cultivable_land?.message as string}
					/>
				</Field>
				<Field width={'250px'}>
					<Input
						label="Área de vegetação (em hectares)"
						placeholder="Área de vegetação (ha)"
						{...register('area_vegetation')}
						error={errors.area_vegetation?.message as string}
					/>
				</Field> */}
			</Row>
		</>
	);
};

export default FarmsForm;
