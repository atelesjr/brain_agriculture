import { AppRoutes } from '@/routes';
import Header from '@/components/organisms/Header';
import { Container, Content } from './components/atoms';

const App = () => {
	const nav = [
		{ to: '/', label: 'Início' },
		{ to: '/dashboard', label: 'Painel' },
	];

	return (
		<Container>
			<Header title="Brain Agriculture" nav={nav} />
			<Content>
				<AppRoutes />
			</Content>
		</Container>
	);
};

export default App;
