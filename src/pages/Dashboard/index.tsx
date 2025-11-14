import { Button, LeafIcon } from '@/components/atoms';
import IconButton from '@/components/molecules/IconButton';
const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					flexWrap: 'wrap',
					marginTop: '20px',
				}}
			>
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
					icon={<LeafIcon />}
					aria-label="Adicionar"
				/>
				<IconButton
					variant="ghost"
					size="md"
					icon={<LeafIcon />}
					label="Adicionar"
				/>
			</div>
		</div>
	);
};

export default Dashboard;
