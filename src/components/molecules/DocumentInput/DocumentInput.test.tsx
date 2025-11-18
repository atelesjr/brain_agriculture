import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import DocumentInput from './DocumentInput';

function TestForm({ onSubmit }: { onSubmit: (data: Record<string, string>) => void }) {
  const { control, handleSubmit } = useForm({ defaultValues: { documento: '' } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DocumentInput control={control} name="documento" />
      <button type="submit">Enviar</button>
    </form>
  );
}

describe('DocumentInput', () => {
  it('shows required error when submitted empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(data: Record<string, string>) => void>();

    render(
      <ThemeProvider theme={theme}>
        <TestForm onSubmit={onSubmit} />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('button', { name: /enviar/i }));

    expect(await screen.findByText('Documento é obrigatório')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('formats CPF while typing and submits digits-only value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(data: Record<string, string>) => void>();

    render(
      <ThemeProvider theme={theme}>
        <TestForm onSubmit={onSubmit} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/cpf ou cnpj/i) as HTMLInputElement;

    // type valid CPF digits
    await user.type(input, '52998224725');

    // display should be masked as CPF
    expect(input.value).toBe('529.982.247-25');

    // ensure data-doc-type attribute indicates cpf
    expect(input.getAttribute('data-doc-type')).toBe('cpf');

    // submit and assert onSubmit received digits-only value
    await user.click(screen.getByRole('button', { name: /enviar/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    // handleSubmit may call the handler with (data, event) so assert on the first call's first arg
    const firstCallFirstArg = (onSubmit as unknown as { mock: unknown[][] }).mock[0][0] as Record<string, string>;
    expect(firstCallFirstArg).toEqual(expect.objectContaining({ documento: '52998224725' }));
  });

  it('identifies cnpj type when more than 11 digits', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(data: Record<string, string>) => void>();

    render(
      <ThemeProvider theme={theme}>
        <TestForm onSubmit={onSubmit} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/cpf ou cnpj/i) as HTMLInputElement;
    // type 12 digits to force cnpj branch (display will be CNPJ-like)
    await user.type(input, '123456789012');

    expect(input.getAttribute('data-doc-type')).toBe('cnpj');
  });
});
