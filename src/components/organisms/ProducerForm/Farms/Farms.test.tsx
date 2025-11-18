import { render, screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import Farms from './Farms';
import { useState } from 'react';
import type { Farm } from '@/types/producer';

describe('Farms', () => {
  it('renders empty state when no farms', () => {
    const setFarms = vi.fn();
    render(<Farms farms={[]} setFarms={setFarms} canAddProperty={false} />);

    expect(screen.getByText(/nenhuma propriedade cadastrada/i)).toBeInTheDocument();
    // add button should be present but disabled
    const add = screen.getByRole('button', { name: /adicionar propriedade/i });
    expect(add).toBeDisabled();
  });

  it('allows adding a new farm when canAddProperty is true', async () => {
    const Wrapper = () => {
      const [farms, setFarms] = useState<Farm[]>([]);
      return <Farms farms={farms} setFarms={setFarms} canAddProperty={true} />;
    };

    const user = userEvent.setup();
    render(<Wrapper />);

    // initially empty
    expect(screen.getByText(/nenhuma propriedade cadastrada/i)).toBeInTheDocument();

    const add = screen.getByRole('button', { name: /adicionar propriedade/i });
    expect(add).toBeEnabled();

    await user.click(add);

    // FarmForm header should appear
    expect(screen.getByRole('heading', { name: /adicionar nova propriedade/i })).toBeInTheDocument();

    // fill name input and save
    const nameInput = screen.getByPlaceholderText(/digite o nome da propriedade/i);
    await user.type(nameInput, 'Fazenda Teste');

    const save = screen.getByRole('button', { name: /salvar propriedade/i });
    await user.click(save);

    // after save, the FarmsList should render the new farm
    await waitFor(() => {
      expect(screen.getByText(/fazenda teste/i)).toBeInTheDocument();
    });
  });
});
