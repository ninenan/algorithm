module.exports = class MyPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log('myPlugin');
        console.log('myPlugin options: ', this.options);
        // console.log('compiler :>> ', compiler);
    }
};
