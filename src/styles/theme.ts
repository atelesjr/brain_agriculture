export const theme = {
	colors: {
		primary: '#2563EB', // azul
		primaryHover: '#1D4ED8',
		secondary: '#10B981', // verde
		secondaryHover: '#059669',
		ghost: 'transparent',
		textOnPrimary: '#FFFFFF',
		text: '#0F172A',
		disabledBg: '#E6EDF8',
		disabledText: '#9CA3AF',
	},
	spacing: {
		sm: '8px',
		md: '12px',
		lg: '16px',
	},
	radius: {
		sm: '6px',
		md: '8px',
		round: '9999px',
	},
	fontSize: {
		sm: '0.875rem',
		md: '1rem',
		lg: '1.125rem',
	},
} as const;

export type Theme = typeof theme;
