import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';

const PlusIcon = (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
		<path
			d="M12 5v14M5 12h14"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				<p>
					<h2>Exemplos de Botões (Atom)</h2>

					<Button variant="primary" size="md">
						Primary
					</Button>
					<Button variant="secondary" size="md">
						Secondary
					</Button>
					<Button variant="ghost" size="md">
						Ghost
					</Button>

					<Button variant="primary" size="lg" fullWidth>
						Full width
					</Button>

					<IconButton
						variant="primary"
						size="sm"
						icon={PlusIcon}
						aria-label="Adicionar"
					/>
					<IconButton
						variant="ghost"
						size="md"
						icon={PlusIcon}
						label="Adicionar"
					/>
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
