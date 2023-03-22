import { dirname, join, normalize, relative, resolve } from 'pathe'
import tsPlugin from '@rollup/plugin-typescript';
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
			tsPlugin({
				tsconfig: "./tsconfig.json",
				exclude: process.env.NODE_ENV === 'production' ? [
					"node_modules", 
					"lib",
					"**/*.test.ts",
					"**/tests/**"
				]: [
					"node_modules", 
					"lib",
				]
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