module.exports = {
    "parser": "@babel/eslint-parser",
    extends: 'airbnb',
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    rules: {
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
        // indent: [2, 4],
        // linebreakStyle: [3, 'unix'],
    },
};
