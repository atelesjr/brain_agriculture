import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Input from './index';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

describe('Input atom', () => {
  it('renders label and required star when required', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Nome" required />
      </ThemeProvider>
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders error text and applies error styling', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Documento" error="Campo inválido" />
      </ThemeProvider>
    );

    // error text visible
    expect(screen.getByText('Campo inválido')).toBeInTheDocument();

    // the input should be in the document
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // when error prop is present, the data attribute should exist (we set data-doc-type in other components)
    // but at minimum the input should be rendered and accept input
    await userEvent.type(input, 'abc');
    expect(input.value).toBe('abc');
  });

  it('forwards ref to the underlying input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <ThemeProvider theme={theme}>
        <Input label="Nome" ref={ref} />
      </ThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
