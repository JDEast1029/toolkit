import typescript from '@rollup/plugin-typescript';
import rollupConfig from '../../rollup.config.js';

export default [
	{
		...rollupConfig,
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
			typescript({
				tsconfig: './tsconfig.json',
			}),
		]
	},
];