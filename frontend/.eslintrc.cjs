module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react', 'react-refresh'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-definitions': 'error',
		'@typescript-eslint/no-explicit-any': 0,
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		indent: ['error', 2],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/no-unescaped-entities': 'off',
	},
}
