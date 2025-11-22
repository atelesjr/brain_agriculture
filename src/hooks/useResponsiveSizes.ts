import { useEffect, useState } from 'react';

type Sizes = {
	width: number;
	isMobile: boolean;
	isTablet: boolean;
	smallHeight: number;
	mediumHeight: number;
	smallOuter: number;
	smallInner: number;
	largeOuter: number;
	largeInner: number;
};

/**
 * Returns responsive size values used by charts and layouts.
 * Keeps logic in one place and is safe for SSR (uses fallback width).
 */
export default function useResponsiveSizes(): Sizes {
	const [width, setWidth] = useState<number>(
		typeof window !== 'undefined' ? window.innerWidth : 1200
	);

	useEffect(() => {
		const onResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	// Responsive sizes (tune to your theme breakpoints if desired)
	const isMobile = width <= 480;
	const isTablet = width > 480 && width <= 992;

	const smallHeight = isMobile ? 320 : isTablet ? 380 : 420;
	const mediumHeight = isMobile ? 420 : isTablet ? 480 : 520;
	const smallOuter = isMobile ? 90 : isTablet ? 130 : 150;
	const smallInner = isMobile ? 40 : isTablet ? 60 : 70;
	const largeOuter = isMobile ? 120 : isTablet ? 160 : 200;
	const largeInner = isMobile ? 60 : isTablet ? 80 : 100;

	return {
		width,
		isMobile,
		isTablet,
		smallHeight,
		mediumHeight,
		smallOuter,
		smallInner,
		largeOuter,
		largeInner,
	};
}
