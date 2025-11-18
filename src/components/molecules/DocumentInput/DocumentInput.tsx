import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, FieldPath } from 'react-hook-form';
import Input from '@/components/atoms/Input';
import {
	formatDocument,
	isValidCNPJ,
	isValidCPF,
	onlyDigits,
} from './utils/validations';

type DocumentInputProps<
	TFieldValues extends FieldValues = { documento?: string },
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	control: Control<TFieldValues>;
	name: TName;
};

const DocumentInput = <
	TFieldValues extends FieldValues = { documento?: string },
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	control,
	name,
}: DocumentInputProps<TFieldValues, TName>) => {
	const rules = {
		required: 'Documento é obrigatório',
		validate: (val: unknown) => {
			const digits = String(val ?? '').replace(/\D/g, '');
			// only accept exact lengths: CPF = 11, CNPJ = 14
			if (digits.length === 11) {
				return isValidCPF(digits) || 'CPF inválido';
			}
			if (digits.length === 14) {
				return isValidCNPJ(digits) || 'CNPJ inválido';
			}
			return 'Documento deve ser CPF (11 dígitos) ou CNPJ (14 dígitos)';
		},
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldOnChange: (value: string) => void
	) => {
		// accept only digits and limit to 14 characters (max for CNPJ)
		const newDigits = onlyDigits(e.target.value).slice(0, 14);
		fieldOnChange(newDigits);
	};

	return (
		<Controller<TFieldValues, TName>
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => {
				const raw = String(field.value ?? '');
				const digits = onlyDigits(raw);
				const display = formatDocument(digits);

				// identify type: 'cpf' or 'cnpj'
				const type = digits.length > 11 ? 'cnpj' : 'cpf';

				return (
					<Input
						label="Documento do proprietário"
						required
						placeholder="CPF ou CNPJ"
						value={display}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange(e, field.onChange)
						}
						onBlur={field.onBlur}
						error={fieldState.error?.message}
						data-doc-type={type}
					/>
				);
			}}
		/>
	);
};

export default DocumentInput;
