const {override, addWebpackAlias} = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@global-components': path.resolve(__dirname, './src/utils/global-components'),
        '@playground': path.resolve(__dirname, './src/game/playground')
    })
)