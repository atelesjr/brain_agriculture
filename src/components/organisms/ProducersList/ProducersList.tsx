import Accordion from '@/components/molecules/Accordion/Accordion';
import type { Farmer } from '@/types/producer';
import ProducersListSkeleton from './ProducersListSkeleton/ProducersListSkeleton';
import { ProducersListMessages } from './ProducersList.styles';

interface ProducersListProps {
	producersState: {
		items: Farmer[];
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
	};
}

const ProducersList = ({ producersState }: ProducersListProps) => {
	return (
		<>
			{producersState.status === 'loading' ? (
				<ProducersListSkeleton count={11} />
			) : producersState.status === 'failed' ? (
				<ProducersListMessages>
					Falha ao carregar produtores: {producersState.error}
				</ProducersListMessages>
			) : producersState.items && producersState.items.length > 0 ? (
				// Render all producers
				producersState.items.map((producer: Farmer) => (
					<Accordion key={producer.id} item={producer} />
				))
			) : (
				<ProducersListMessages>
					Nenhum produtor cadastrado.
				</ProducersListMessages>
			)}
		</>
	);
};

export default ProducersList;
