const {override, addWebpackAlias} = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@adam': path.resolve(__dirname, './src/App.js')
    })
)