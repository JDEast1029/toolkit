import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from "@rollup/plugin-terser";
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dts from "rollup-plugin-dts";

const env = process.env.NODE_ENV
const config = {
	plugins: [
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
	]
};

if (env === 'production') {
	config.plugins.push(terser())
	dts({ respectExternal: true })
}

export default config