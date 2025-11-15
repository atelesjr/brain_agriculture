import type { Farmer } from '@/types/producer';
interface ProducersProps {
    producersState: {
        items: Farmer[];
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
}
declare const Producers: ({ producersState }: ProducersProps) => import("react/jsx-runtime").JSX.Element;
export default Producers;
