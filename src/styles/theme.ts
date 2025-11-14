import { breakpoints, media } from './media_queries';

export const theme = {
	colors: {
		primary: '#00793cff',
		primaryHover: 'rgba(0, 121, 61, 0.1)',
		secondary: '#a19700ff',
		secondaryHover: '#aaa4565b',
		ghost: 'transparent',
		textOnPrimary: '#FFFFFF',
		text: '#0F172A',
		textSecondary: '#353535ff',
		disabledBg: '#E6EDF8',
		disabledText: '#9CA3AF',
		background_main: '#dadada',
		muted: '#a7a7a7ff',
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
	breakpoints,
	media,
} as const;

export type Theme = typeof theme;
