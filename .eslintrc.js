module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2021,
		"sourceType": "module",
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"mocha": true
	},
	// 四个级别： base/essential/strongly-recommended/recommended, 使用最高约束
	"extends": [
		"eslint:recommended",
		'plugin:node/recommended',
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"prettier/@typescript-eslint"
	],
	"plugins": [
		"@typescript-eslint",
		"prettier"
	],
	"settings": {
	},
	"globals": {

	},
	"rules": {
		'node/no-missing-import': [
			'error',
			{
				allowModules: ['types', 'estree', 'less', 'sass', 'stylus'],
				tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts'],
			}
		],
		'node/no-missing-require': [
			'error',
			{
				// for try-catching yarn pnp
				allowModules: ['pnpapi', 'vite'],
				tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts'],
			}
		],
		'node/no-extraneous-import': [
			'error',
			{
				allowModules: ['vite', 'less', 'sass', 'vitest'],
			}
		],
		'node/no-extraneous-require': [
			'error',
			{
				allowModules: ['vite'],
			}
		],
		'node/no-deprecated-api': 'off',
		'node/no-unpublished-import': 'off',
		'node/no-unpublished-require': 'off',
		'node/no-unsupported-features/es-syntax': 'off',
		'eqeqeq': ['warn', 'always', { null: 'never' }],
		'no-debugger': ['error'],
		'no-empty': ['warn', { allowEmptyCatch: true }],
		'no-process-exit': 'off',
		'no-useless-escape': 'off',
		'prefer-const': [
			'warn',
			{
				destructuring: 'all',
			}
		],
		"prettier/prettier": "error",
	}
};