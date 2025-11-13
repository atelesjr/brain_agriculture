import { AppRoutes } from '@/routes';
import Header from '@/components/organisms/Header';

const App = () => {
	const nav = [
		{ to: '/', label: 'Início' },
		{ to: '/dashboard', label: 'Painel' },
	];

	return (
		<div>
			<Header title="Brain Agriculture" nav={nav} />
			<main>
				<AppRoutes />
			</main>
		</div>
	);
};

export default App;
