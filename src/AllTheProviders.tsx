import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { Provider } from 'react-redux';
import { store } from '@/store';

interface AllTheProvidersProps {
	children: React.ReactNode;
}

export function AllTheProviders({ children }: AllTheProvidersProps) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</Provider>
	);
}
