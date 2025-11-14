import React, { useEffect, useState } from 'react';
import producersService from '@/services/producers';
import Accordion from '@/components/molecules/Accordion/Accordion';
import type { Farmer } from '@/types/producer';
import { PageContent } from '@/components/atoms';

const Home: React.FC = () => {
	const [producers, setProducers] = useState<Farmer[] | null>(null);

	useEffect(() => {
		producersService
			.listProducers()
			.then((data) => {
				// apenas logar o resultado da API no console
				console.log('producers:', data);
				setProducers(Array.isArray(data) ? data : []);
			})
			.catch((err) => {
				console.error('failed to load producers', err);
				setProducers([]);
			});
	}, []);

	const example = producers && producers.length > 1 ? producers[1] : null;

	return (
		<PageContent>
			<h1>Cadastro de Produtores Rurais</h1>
			{/* Render apenas um exemplo (data[1]) conforme solicitado */}
			{example ? (
				<Accordion item={example} />
			) : (
				<p>Carregando exemplo do produtor (data[1])...</p>
			)}
		</PageContent>
	);
};

export default Home;
