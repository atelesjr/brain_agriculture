import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		// enable hanging-process reporter to diagnose hanging handles/processes
		reporters: ['default', 'hanging-process'],
		globals: true,
		environment: 'jsdom',
		setupFiles: path.resolve(__dirname, 'src/setupTests.ts'),
		include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
		// force single-process mode to avoid forks/timeouts on Windows/OneDrive
		threads: false,
		// also disable the worker pool forks explicitly (Vitest >4 uses a pool)
		pool: {
			fork: false,
		},
	},
});
