import React, { useEffect } from 'react';
import { PageContent } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchProducers } from '@/store/producersSlice';
import Producers from '../../components/organisms/Producers/producers';

const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const producersState = useSelector((s: RootState) => s.producers);

	useEffect(() => {
		if (producersState.status === 'idle') {
			void dispatch(fetchProducers());
		}
	}, [dispatch, producersState.status]);

	return (
		<PageContent>
			<h1>Cadastro de Produtores Rurais</h1>

			<Producers producersState={producersState} />
		</PageContent>
	);
};

export default Home;
