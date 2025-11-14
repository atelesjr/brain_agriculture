import React, { useEffect } from 'react';
import producersService from '@/services/producers';

const Home: React.FC = () => {
	useEffect(() => {
		producersService
			.listProducers()
			.then((data) => {
				// apenas logar o resultado da API no console
				// você pode abrir as devtools para ver o array de produtores
				console.log('producers:', data);
			})
			.catch((err) => {
				console.error('failed to load producers', err);
			});
	}, []);

	return (
		<div>
			<p>Welcome to the Brain Agriculture app!</p>

			<div className="accordion">
				<div className="header">Header</div>
				<div className="content"></div>
			</div>
		</div>
	);
};

export default Home;
