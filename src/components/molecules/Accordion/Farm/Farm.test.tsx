import { render, screen } from '@/test-utils';
import Farms from './Farm';
import type { Farm as FarmType, Safra } from '@/types/producer';

const makeFarm = (id = 'farm-1'): FarmType & { safras: Safra[] } => ({
  id,
  name: 'Fazenda Teste',
  city: 'Cidade',
  state: 'ST',
  areaTotal: 100,
  cultivableLand: 80,
  vegetatedArea: 20,
  safras: [],
});

describe('Farms component', () => {
  test('shows message when no farms are provided', () => {
    render(<Farms farms={[]} />);
    expect(screen.getByText(/Nenhuma propriedade cadastrada/i)).toBeInTheDocument();
  });

  test('renders farm details and harvest placeholder', () => {
    const farm = makeFarm();
    render(<Farms farms={[farm]} />);

    // basic info
    expect(screen.getByText(/Fazenda Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade - ST/i)).toBeInTheDocument();

    // areas should show values with 'ha' suffix
    expect(screen.getByText(/100ha/)).toBeInTheDocument();
    expect(screen.getByText(/80ha/)).toBeInTheDocument();
    expect(screen.getByText(/20ha/)).toBeInTheDocument();

    // Harvests placeholder should be present when no safras
    expect(screen.getByText(/Selecione uma safra/i)).toBeInTheDocument();
  });

  test('renders multiple farms', () => {
    const f1 = makeFarm('farm-1');
    const f2 = { ...makeFarm('farm-2'), name: 'Fazenda Dois' };
    render(<Farms farms={[f1, f2]} />);

    expect(screen.getByText(/Fazenda Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Fazenda Dois/i)).toBeInTheDocument();
  });
});
