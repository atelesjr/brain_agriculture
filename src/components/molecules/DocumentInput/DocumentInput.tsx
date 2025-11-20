import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, FieldPath } from 'react-hook-form';
import Input from '@/components/atoms/Input';
import { useDocumentInput } from './useDocumentInput';

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
	// Hook encapsulates mask/validation/change logic
	const hook = useDocumentInput();

	return (
		<Controller<TFieldValues, TName>
			control={control}
			name={name}
			rules={hook.rules}
			render={({ field, fieldState }) => {
				// Use hook helper functions
				const display = hook.format(field.value);
				const type = hook.detectType(field.value);

				return (
					<Input
						label="Documento do proprietário"
						required
						placeholder="CPF ou CNPJ"
						value={display}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							hook.handleChange(e.target.value, field.onChange)
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
