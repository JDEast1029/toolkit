import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@tests-utils': resolve(__dirname, './tests/utils/index.ts'),
		},
	},
	test: {
		globals: true, // test文件不需要在单独引入vitest的api，需要在tsconfig.json内增加配置
		coverage: {
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './tests/unit/coverage',
		},
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/lib/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
		],
	},
});
