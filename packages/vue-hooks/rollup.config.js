import rollupConfig from '../../rollup.config.js';
import typescript from '@rollup/plugin-typescript';

export default [
	{
		...rollupConfig,
		input: './src/index.ts',
		output: [{
			file: 'lib/index.cjs',
			format: 'cjs',
		},{
			file: 'lib/index.mjs',
			format: 'esm',
		}],
		plugins: [
			...rollupConfig.plugins,
			typescript({
				tsconfig: '../tsconfig.json',
			}),
		]
	},
];