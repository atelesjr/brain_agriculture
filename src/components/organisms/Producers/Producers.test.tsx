import { render, screen } from '@/test-utils';
import Producers from './Producers';
import { describe, expect, test, vi } from 'vitest';

// Mock the ProducersSkeleton to render a test id
vi.mock('./ProducersSkeleton/ProducersSkeleton', () => ({
	default: () => <div data-testid="producers-skeleton" />,
}));

// Mock Accordion to render a simple identifiable element
vi.mock('@/components/molecules/Accordion/Accordion', () => ({
	default: ({ item }: { item: { id: number; name: string } }) => (
		<div data-testid={`accordion-${item.id}`}>{item.name}</div>
	),
}));

describe('Producers component', () => {
	test('renders skeleton when loading', () => {
		render(
			<Producers
				producersState={{ items: [], status: 'loading', error: null }}
			/>
		);

		expect(screen.getByTestId('producers-skeleton')).toBeInTheDocument();
	});

	test('renders error message when failed', () => {
		render(
			<Producers
				producersState={{ items: [], status: 'failed', error: 'boom' }}
			/>
		);

		expect(
			screen.getByText(/Falha ao carregar produtores: boom/i)
		).toBeInTheDocument();
	});

	test('renders empty message when no producers', () => {
		render(
			<Producers
				producersState={{ items: [], status: 'succeeded', error: null }}
			/>
		);

		expect(screen.getByText(/Nenhum produtor cadastrado/i)).toBeInTheDocument();
	});

	test('renders an accordion for each producer', () => {
		const items = [
			{ id: 1, name: 'P1', document: '1', documentType: 'CPF', farms: [] },
			{ id: 2, name: 'P2', document: '2', documentType: 'CPF', farms: [] },
		];

		render(
			<Producers producersState={{ items, status: 'succeeded', error: null }} />
		);

		// both mocked accordions should appear
		expect(screen.getByTestId('accordion-1')).toBeInTheDocument();
		expect(screen.getByTestId('accordion-2')).toBeInTheDocument();
	});
});
