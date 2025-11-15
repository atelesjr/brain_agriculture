import { z } from 'zod';

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

export default producerSchema;
