import { producerSchema } from './ProducerFromScheme';
import type z from 'zod';
export type ProducerFormValues = z.infer<typeof producerSchema>;
declare const ProducerFormComponent: () => import("react/jsx-runtime").JSX.Element;
export default ProducerFormComponent;
