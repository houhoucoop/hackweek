const config = require('@rancher/shell/vue.config'); // eslint-disable-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

const baseConfig = config(__dirname, {
  excludes: [],
  // excludes: ['fleet', 'example']
});

const remoteURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

if (typeof baseConfig.configureWebpack === 'function') {
  const configureWebpack = baseConfig.configureWebpack;

  baseConfig.configureWebpack = (webpackConfig) => {
    configureWebpack(webpackConfig);

    webpackConfig.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        name: 'host',
        remotes: {
          backstageApp: `backstageApp@${remoteURL}/remoteEntry.js`
        },
        shared: {
          react: { singleton: true},
          'react-dom': { singleton: true},
        },
      }),
    )
  };
}

module.exports = baseConfig