import { AppRoutes } from '@/routes';
import Header from '@/components/organisms/Header';
import { Container, Content } from './components/atoms';
import Modal from '@/components/organisms/Modal/Modal';

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
			<Modal />
		</Container>
	);
};

export default App;
