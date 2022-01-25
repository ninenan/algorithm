module.exports = {
    parser: '@babel/eslint-parser',
    extends: 'airbnb',
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    rules: {
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        indent: ['error', 4],
        'react/jsx-indent': [2, 4, { checkAttributes: false, indentLogicalExpressions: false }],
        'jsx-a11y/no-noninteractive-element-interactions': [
            0,
            {
                handlers: [
                    'onClick',
                    'onMouseDown',
                    'onMouseUp',
                    'onKeyPress',
                    'onKeyDown',
                    'onKeyUp',
                ],
            },
        ],
        'jsx-a11y/click-events-have-key-events': [0],
    },
};
