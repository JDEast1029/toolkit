import { dirname, join, normalize, relative, resolve } from 'pathe'
import typescript from '@rollup/plugin-typescript';
import rollupConfig from '../../rollup.config.js';
import dts from "rollup-plugin-dts";

const dstEntires = [
	'src/index.ts',
]
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
	{
		...rollupConfig,
		input: dstEntires,
		output: {
			dir: "lib",
			entryFileNames: chunk => `${normalize(chunk.name).replace('src/', '')}.d.ts`,
			format: 'esm',
		},
		plugins: [
			dts({ respectExternal: true }),
		]
	}
];