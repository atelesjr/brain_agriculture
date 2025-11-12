import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

interface AllTheProvidersProps {
	children: React.ReactNode;
}

export function AllTheProviders({ children }: AllTheProvidersProps) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
