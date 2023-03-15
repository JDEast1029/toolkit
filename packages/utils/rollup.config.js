import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import terser from "@rollup/plugin-terser";
import rollupConfig from '../../rollup.config.js';

const env = process.env.NODE_ENV
const config = {
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
		babel({ 
			babelHelpers: 'bundled',
			exclude: '**/node_modules/**'
		}),
		replace({
            exclude: 'node_modules/**',
			preventAssignment: true,
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
	]
};

if (env === 'production') {
	config.plugins.push(terser())
}

export default config