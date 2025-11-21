// Breakpoints
export const breakpoints = {
	mdMobile: '375px',
	mobile: '425px',
	tablet: '768px',
	desktop: '1024px',
	wide: '1440px',
} as const;

// Media queries helpers
export const media = {
	mdMobile: `@media (min-width: ${breakpoints.mdMobile})`,
	mobile: `@media (min-width: ${breakpoints.mobile})`,
	tablet: `@media (min-width: ${breakpoints.tablet})`,
	desktop: `@media (min-width: ${breakpoints.desktop})`,
	wide: `@media (min-width: ${breakpoints.wide})`,
	// Max-width queries
	maxSmMobile: `@media (max-width: ${breakpoints.mobile})`,
	maxMobile: `@media (max-width: ${breakpoints.tablet})`,
	maxTablet: `@media (max-width: ${breakpoints.desktop})`,
	maxDesktop: `@media (max-width: ${breakpoints.wide})`,
} as const;
