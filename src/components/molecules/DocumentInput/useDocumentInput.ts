import { useMemo } from 'react';
import {
	formatDocument,
	isValidCNPJ,
	isValidCPF,
	onlyDigits,
} from './utils/validations';

type ValidateFn = (val: unknown) => true | string;

export type UseDocumentInputResult = {
	display: string;
	digits: string;
	type: 'cpf' | 'cnpj';
	rules: { required: string; validate: ValidateFn };
	handleChange: (value: string, onChange: (v: string) => void) => void;
};

type x = {
	format: (raw?: string) => string;
	detectType: (raw?: string) => 'cpf' | 'cnpj';
};

interface useDocumentInputProps extends UseDocumentInputResult, x {}

export function useDocumentInput(rawValue?: string): useDocumentInputProps {
	const digits = useMemo(() => onlyDigits(String(rawValue ?? '')), [rawValue]);

	const display = useMemo(() => formatDocument(digits), [digits]);

	const type: 'cpf' | 'cnpj' = digits.length > 11 ? 'cnpj' : 'cpf';

	const rules = useMemo(
		() => ({
			required: 'Documento é obrigatório',
			validate: (val: unknown) => {
				const d = onlyDigits(String(val ?? ''));
				if (d.length === 11) return isValidCPF(d) || 'CPF inválido';
				if (d.length === 14) return isValidCNPJ(d) || 'CNPJ inválido';
				return 'Documento deve ser CPF (11 dígitos) ou CNPJ (14 dígitos)';
			},
		}),
		[] as const
	);

	const handleChange = (value: string, onChange: (v: string) => void) => {
		const newDigits = onlyDigits(value).slice(0, 14);
		onChange(newDigits);
	};

	const format = (raw?: string) => {
		const d = onlyDigits(String(raw ?? ''));
		return formatDocument(d);
	};

	const detectType = (raw?: string): 'cpf' | 'cnpj' => {
		const d = onlyDigits(String(raw ?? ''));
		return d.length > 11 ? 'cnpj' : 'cpf';
	};

	return {
		display,
		digits,
		type,
		rules,
		handleChange,
		format,
		detectType,
	};
}
