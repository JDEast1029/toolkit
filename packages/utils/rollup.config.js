import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import rollupConfig from '../../rollup.config.js';

export default  {
	...rollupConfig,
	input: './src/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
	},
	plugins: [
		nodeResolve({
			extensions:['.js', '.ts']
		}),
		typescript(),
		babel({ babelHelpers: 'bundled' })
	]
};