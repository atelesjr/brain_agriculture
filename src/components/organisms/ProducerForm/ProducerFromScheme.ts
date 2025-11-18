import { z } from 'zod';
import type { Farmer } from '../../../types/producer';
import {
	onlyDigits,
	isValidCPF,
	isValidCNPJ,
} from '@/components/molecules/DocumentInput/utils/validations';

export const producerSchema = z.object({
	id: z.number(),
	document: z.string(),
	documentType: z.string(),
	name: z.string().min(1, 'Nome é obrigatório'),
	farms: z
		.array(
			z.object({
				id: z.string(),
				name: z.string(),
				city: z.string(),
				state: z.string(),
				areaTotal: z.number(),
				cultivableLand: z.number(),
				vegetatedArea: z.number(),
				safras: z
					.array(
						z.object({
							year: z.number(),
							name: z.string(),
							cultures: z.array(
								z.object({
									name: z.string(),
									areaPlanted: z.number(),
								})
							),
						})
					)
					.optional(),
			})
		)
		.optional(),
});

export type FarmerFromSchema = z.infer<typeof producerSchema>;

// Compile-time check: fails if `Farmer` (from src/types/producer) differs from schema-derived type
type AssertEqual<A, B> = A extends B ? (B extends A ? true : never) : never;
type _SchemaMatchesFarmer = AssertEqual<Farmer, FarmerFromSchema>;
export type _Assert<T extends true> = T;
export type _ = _Assert<_SchemaMatchesFarmer>;

// Schema for create/update form (no `id` required, documentType optional)
export const producerCreateSchema = z.object({
	document: z.string().refine((val) => {
		const digits = onlyDigits(String(val ?? ''));
		if (digits.length === 11) return isValidCPF(digits);
		if (digits.length === 14) return isValidCNPJ(digits);
		return false;
	}, 'Documento deve ser CPF (11 dígitos) ou CNPJ (14 dígitos) válido'),
	documentType: z.string().optional(),
	name: z.string().min(1, 'Nome é obrigatório'),
	farms: producerSchema.shape.farms.optional(),
});

export type ProducerCreateValues = z.infer<typeof producerCreateSchema>;
