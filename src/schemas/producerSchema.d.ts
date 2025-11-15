import { z } from 'zod';
export declare const producerSchema: z.ZodObject<{
    id: z.ZodNumber;
    document: z.ZodString;
    documentType: z.ZodString;
    name: z.ZodString;
    farms: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        areaTotal: z.ZodNumber;
        cultivableLand: z.ZodNumber;
        vegetatedArea: z.ZodNumber;
        safras: z.ZodOptional<z.ZodArray<z.ZodObject<{
            year: z.ZodNumber;
            name: z.ZodString;
            cultures: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                areaPlanted: z.ZodNumber;
            }, z.core.$strip>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type FarmerFromSchema = z.infer<typeof producerSchema>;
export default producerSchema;
