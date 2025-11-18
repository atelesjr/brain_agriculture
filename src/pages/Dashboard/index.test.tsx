import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import producersReducer from '@/store/producersSlice';
import modalReducer from '@/store/modalSlice';
import { theme } from '@/styles/theme';
import Dashboard from './index';
import { describe, it, expect } from 'vitest';

describe('Dashboard page', () => {
  it('renders totals and charts when producers state is populated', () => {
    const items = [
      {
        id: '1',
        name: 'Farmer 1',
        document: '',
        documentType: '',
        farms: [
          {
            id: 'f1',
            state: 'SP',
            areaTotal: 10,
            cultivableLand: 5,
            vegetatedArea: 2,
            safras: [{ id: 's1', cultures: [{ name: 'Soja', areaPlanted: 50 }] }],
          },
        ],
      },
      {
        id: '2',
        name: 'Farmer 2',
        document: '',
        documentType: '',
        farms: [
          {
            id: 'f2',
            state: 'MG',
            areaTotal: 8,
            cultivableLand: 3,
            vegetatedArea: 1,
            safras: [{ id: 's2', cultures: [{ name: 'Trigo', areaPlanted: 10 }] }],
          },
        ],
      },
    ];

    const preloadedState = {
      producers: { items, status: 'succeeded', error: null },
      modal: { isOpen: false, content: null },
    };

    const store = configureStore({
      reducer: { producers: producersReducer, modal: modalReducer },
      preloadedState,
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </Provider>
    );

    // check that labels are present
    expect(screen.getByText(/Total de propriedades cadastradas:/i)).toBeInTheDocument();
    expect(screen.getByText(/Total de hectares registrados:/i)).toBeInTheDocument();

    // totals should reflect provided items: 2 producers with 2 farms total
    expect(screen.getByText('2')).toBeInTheDocument();

    // a legend label from ChartsPanel should be rendered
    expect(screen.getByText('Soja')).toBeInTheDocument();
  });
});

export {};
