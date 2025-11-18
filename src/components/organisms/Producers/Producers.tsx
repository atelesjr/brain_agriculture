import Accordion from '@/components/molecules/Accordion/Accordion';
import type { Farmer } from '@/types/producer';
import ProducersSkeleton from './ProducersSkeleton/ProducersSkeleton';

interface ProducersProps {
	producersState: {
		items: Farmer[];
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
	};
}

const Producers = ({ producersState }: ProducersProps) => {
	return (
		<>
			{producersState.status === 'loading' ? (
				<ProducersSkeleton count={11} />
			) : producersState.status === 'failed' ? (
				<p>Falha ao carregar produtores: {producersState.error}</p>
			) : producersState.items && producersState.items.length > 0 ? (
				// Render all producers
				producersState.items.map((producer: Farmer) => (
					<Accordion key={producer.id} item={producer} />
				))
			) : (
				<p>Nenhum produtor cadastrado.</p>
			)}
		</>
	);
};

export default Producers;
