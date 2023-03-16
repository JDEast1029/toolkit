import rollupConfig from '../../rollup.config.js';

export default {
	...rollupConfig,
	input: './src/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
	},
};