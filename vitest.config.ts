import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@utils': resolve(__dirname, './packages/utils/src/index.ts'),
		},
	},
	test: {
		globals: true, // test文件不需要在单独引入vitest的api，需要在tsconfig.json内增加配置
		coverage: {
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './tests/unit/coverage',
		},
	},
});
