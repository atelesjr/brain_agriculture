import { z } from 'zod';

export const producerSchema = z.object({
	nome: z.string().min(1, 'Nome é obrigatório'),
	documento: z.string().optional(),
	propriedade: z.string().optional(),
	cidade: z.string().optional(),
	estado: z.string().optional(),
});
