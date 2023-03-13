import path from 'node:path'
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default  {
	plugins: [
		commonjs(), 
		nodeResolve(), 
		typescript({
			tsconfig: './tsconfig.json',
		}),
	],
};