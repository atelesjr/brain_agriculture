import React, { useEffect } from 'react';
import { PageContent } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchProducers } from '@/store/producersSlice';
import Producers from '@/components/organisms/Producers/Producers';
import { IconButton } from '@/components/atoms/Buttons';
import { HomeAddProducer, ProducerListContainer } from './Home.styles';
import { openModal } from '@/store/modalSlice';
import ProducerForm from '@/components/organisms/ProducerForm/ProducerForm';

const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const producersState = useSelector((s: RootState) => s.producers);

	const addNewProducer = <ProducerForm />;

	useEffect(() => {
		if (producersState.status === 'idle') {
			void dispatch(fetchProducers());
		}
	}, [dispatch, producersState.status]);

	return (
		<PageContent>
			<h1>Cadastro de Produtores Rurais</h1>

			<HomeAddProducer>
				<IconButton
					action="add"
					label="Adicionar Produtor"
					variant="primary"
					size="md"
					onClick={(e) => {
						e.stopPropagation();
						dispatch(openModal(addNewProducer));
					}}
				/>
			</HomeAddProducer>

			<ProducerListContainer>
				<Producers producersState={producersState} />
			</ProducerListContainer>
		</PageContent>
	);
};

export default Home;
