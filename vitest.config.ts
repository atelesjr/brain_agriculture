import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		globals: true,
		// use a lighter DOM for faster environment setup
		environment: 'happy-dom',
		setupFiles: path.resolve(__dirname, 'src/setupTests.ts'),
		include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
		// force single-process mode (stable and reliable); parallel workers caused queued runs
		// @ts-expect-error: some Vitest versions' types don't include `threads` on InlineConfig
		threads: false,
		// global timeout for tests (ms) to reduce false negatives on slow filesystems
		timeout: 20000,
	},
});
