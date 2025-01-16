const config = require('@rancher/shell/vue.config'); // eslint-disable-line @typescript-eslint/no-var-requires
const path = require('path')

const baseConfig = config(__dirname, {
  excludes: [],
});

// Add custom rules and plugins
if (typeof baseConfig.configureWebpack === 'function') {
  const configureWebpack = baseConfig.configureWebpack;

  baseConfig.configureWebpack = (webpackConfig) => {
    configureWebpack(webpackConfig);

    webpackConfig.module.rules.push({
      test: /\.js$/i,
      include: path.resolve(__dirname, 'pkg/my-app/react_app'),
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: { presets: ['veaury/babel/ReactPreset'] }
    });

    // webpackConfig.module.rules.push({
    //   test: /\.less$/,
    //   include: path.resolve(__dirname, 'pkg/my-app/react_app'),
    //   exclude: [
    //     /node_modules/,
    //     path.resolve(__dirname, 'pkg/my-app/react_app/longhorn-ui')
    //   ],
    //   use: [
    //     {
    //       loader: 'style-loader',
    //     },
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         sourceMap: true,
    //         importLoaders: 1,
    //         modules: true
    //       },
    //     },
    //     {
    //       loader: 'less-loader',
    //     },
    //   ],
    // });

    // webpackConfig.module.rules.push({
    //   test: /\.less$/,
    //   exclude: /pkg/,
    //   use: [
    //     'style-loader',
    //     {
    //       loader: "css-loader",
    //       options: {
    //         sourceMap: true,
    //         importLoaders: 1
    //       }
    //     },
    //     {
    //       loader: "less-loader",
    //       options: {
    //         sourceMap: true,
    //         javascriptEnabled: true,
    //         modifyVars: theme()
    //       }
    //     }
    //   ],
    // });

    // webpackConfig.plugins.push(new MiniCssExtractPlugin())
  };
}

baseConfig.css.loaderOptions = {
  ...baseConfig.css.loaderOptions,
  less: {
    ...baseConfig.css.loaderOptions.less,
    lessOptions: {
      javascriptEnabled: true,
    },
  }
}

// baseConfig.devServer = {
//   ...baseConfig.devServer,
//   // allowedHosts: 'all',
//   proxy: {
//     // "/v1/ws/**": {
//     //   target: process.env.VUE_APP_LONGHORN_MANAGER_IP,
//     //   changeOrigin: true,
//     //   ws: true,
//     //   secure: false,
//     // },
//     "/v1/": {
//       target: process.env.VUE_APP_LONGHORN_MANAGER_IP,
//       changeOrigin: true,
//       secure: false,
//     }
//   }
// }

module.exports = baseConfig
