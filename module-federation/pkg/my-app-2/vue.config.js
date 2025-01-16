const baseConfig = require('./.shell/pkg/vue.config')(__dirname);
const webpack = require('webpack');

const remoteURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

if (typeof baseConfig.configureWebpack === 'function') {
  const configureWebpack = baseConfig.configureWebpack;

  baseConfig.configureWebpack = (webpackConfig) => {
    configureWebpack(webpackConfig);

    webpackConfig.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        name: 'longhorn-hack',
        remotes: {
          longhornUI: `longhornUI@${remoteURL}/remoteEntry.js`
        }
      }),
    )
  };
}

baseConfig.devServer = {
  ...baseConfig.devServer,
  proxy: {
    '/longhorn-hack/c/_/v1': {
      target: remoteURL,
      changeOrigin: true,
      pathRewrite: {
        '^/longhorn-hack/c/_/v1': '/v1',
      },
    },
  },
}

module.exports = baseConfig