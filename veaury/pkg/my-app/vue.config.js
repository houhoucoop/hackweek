const baseConfig = require('./.shell/pkg/vue.config')(__dirname);

// add custom loader
if (typeof baseConfig.configureWebpack === 'function') {
  const configureWebpack = baseConfig.configureWebpack;

  baseConfig.configureWebpack = (config) => {
    configureWebpack(config);

    config.module.rules.push({
      test: /\.js$/i,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: { presets: ['veaury/babel/ReactPreset'] }
    });
  };
}

module.exports = baseConfig;
