module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
    },
    extends: 'airbnb-base',
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    rules: {
        indent: ['error', 4],
    },
};
