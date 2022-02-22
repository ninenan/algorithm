const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base')

    it('entry', () => {
        assert.equal(baseConfig.entry.home, '/Users/ninenan/NNN/study_code/algorithm/builder-webpack/test/smoke/template/src/study-webpack/home/index.js')
        assert.equal(baseConfig.entry.search, '/Users/ninenan/NNN/study_code/algorithm/builder-webpack/test/smoke/template/src/study-webpack/search/index.js')
    })
})