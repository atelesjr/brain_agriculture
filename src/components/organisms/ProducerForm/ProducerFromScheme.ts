import { z } from 'zod';

export const producerSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	document: z.string().optional(),
	farms: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	area_total: z.string().optional(),
	cultivable_land: z.string().optional(),
	area_vegetation: z.string().optional(),
});
