import { defineConfig } from 'vitest/config';
import path from 'path';

// Reporters: include junit only in CI environments to avoid local OneDrive I/O locks
const reporters: any[] = ['default', 'hanging-process'];
if (process.env.CI === 'true' || process.env.CI === '1') {
	reporters.splice(1, 0, ['junit', { outputFile: 'test-results/junit.xml' }]);
}

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		// enable hanging-process reporter to diagnose hanging handles/processes
		// also add junit reporter writing to test-results/junit.xml so CI can consume it
		reporters,
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
		// global timeout for tests (ms) to reduce false negatives on slow filesystems
		timeout: 20000,
	},
});
