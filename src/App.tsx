import { AppRoutes } from '@/routes';
import { Link } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<header>
				<h1>Brain Agriculture</h1>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/dashboard">Dashboard</Link>
				</nav>
			</header>
			<main>
				<AppRoutes />
			</main>
		</div>
	);
};

export default App;
