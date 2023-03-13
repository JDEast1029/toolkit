import rollupConfig from '../../rollup.config.js';

export default  {
	...rollupConfig,
	input: './src/index.ts',
	output: [
		{
			file: 'dist/index-es.js',
			format: 'es',
		},
		{
			file: 'dist/index-cjs.js',
			format: 'cjs',
		},
	],
};