import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@utils': resolve(__dirname, './packages/utils/src/index.ts'),
		},
	},
	test: {
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './tests/unit/coverage',
		},
	},
});
