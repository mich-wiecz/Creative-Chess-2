const {override, addWebpackAlias} = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@global-components': path.resolve(__dirname, './src/utils/global-components'),
        'Playground': path.resolve(__dirname, './src/game/playground'),
        '@global-functions':  path.resolve(__dirname, './src/utils/global-functions'),
        '@figures': path.resolve(__dirname, './src/chess/figures'),
        '@chess': path.resolve(__dirname, './src/chess')
    })
)