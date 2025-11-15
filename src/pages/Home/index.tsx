import React, { useEffect } from 'react';
import { PageContent } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchProducers } from '@/store/producersSlice';
import Producers from '@/components/organisms/Producers/Producers';
import { IconButton } from '@/components/atoms/Buttons';
import { HomeAddProducer } from './Home.styles';
import { openModal } from '@/store/modalSlice';

const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const producersState = useSelector((s: RootState) => s.producers);

	const addNewProducer = <h2>Adicionar Novo Produtor</h2>;

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

			<Producers producersState={producersState} />
		</PageContent>
	);
};

export default Home;
