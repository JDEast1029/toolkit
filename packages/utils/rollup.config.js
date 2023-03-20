import { dirname, join, normalize, relative, resolve } from 'pathe'
import tsPlugin from '@rollup/plugin-typescript';
import rollupConfig from '../../rollup.config.js';

export default {
	// ...rollupConfig,
	input: './src/index.ts',
	output: [{
		file: 'lib/index.cjs',
		format: 'cjs',
	},{
		file: 'lib/index.js',
		format: 'esm',
	}],
	plugins: [
		...rollupConfig.plugins,
		tsPlugin({
			tsconfig: "./tsconfig.json",
			exclude: process.env.NODE_ENV === 'production' ? [
				"node_modules", 
				"lib",
				"**/*.test.ts",
				"**/__tests__/**"
			]: [
				"node_modules", 
				"lib",
			]
		}),
	]
}
