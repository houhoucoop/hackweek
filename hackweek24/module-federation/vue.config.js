const config = require('@rancher/shell/vue.config'); // eslint-disable-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

const baseConfig = config(__dirname, {
  excludes: [],
  // excludes: ['fleet', 'example']
});

const remoteURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

if (typeof baseConfig.configureWebpack === 'function') {
  const configureWebpack = baseConfig.configureWebpack;

  baseConfig.configureWebpack = (webpackConfig) => {
    configureWebpack(webpackConfig);

    webpackConfig.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        name: 'longhorn',
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