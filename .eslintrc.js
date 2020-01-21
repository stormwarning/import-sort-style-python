module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['@zazen/eslint-config'],
    rules: {
        // eslint doesn't think my vars are used ¯\_(ツ)_/¯
        'no-unused-vars': 'off',
        'prefer-const': 'off',
    },
}
