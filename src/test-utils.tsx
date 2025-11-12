
/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { AllTheProviders } from './AllTheProviders';

function customRender(
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) {
	return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export tudo do @testing-library/react
export * from '@testing-library/react';

// Override do render
export { customRender as render };
