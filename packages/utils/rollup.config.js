import { dirname, join, normalize, relative, resolve } from 'pathe'
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from "@rollup/plugin-terser";
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dts from "rollup-plugin-dts";
// import rollupConfig from '../../rollup.config.js';

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
		// ...rollupConfig.plugins,
		commonjs(), 
		nodeResolve({
			extensions:['.js', '.ts']
		}),
		babel({ 
			babelHelpers: 'bundled',
			exclude: '**/node_modules/**'
		}),
		replace({
			exclude: 'node_modules/**',
			preventAssignment: true,
			ENV: JSON.stringify(process.env.NODE_ENV),
		}),
		typescript(),
	]
}
