/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const theme = require("./src/theme");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const endpoint = process.env.LONGHORN_MANAGER_IP || 'http://54.223.25.181:9500/';
const versionText = require('fs').readFileSync('./version', 'utf8');
const longhornVersion = versionText ? versionText.trim().substring(1).split('-')[0]: '1.7.0';
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    host: "0.0.0.0",
    port: 8080,
    open: false,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: 'info',
      overlay: true,
    },
    proxy: [
      {
        context: ['/v1/ws/**'],
        target: endpoint,
        changeOrigin: true,
        ws: true,
        secure: false,
      },
      {
        context: ['/v1/'],
        target: endpoint,
        changeOrigin: true,
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: 'auto',
    chunkFilename: "[name].async.js",
    library: "[name]_dll"
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      layouts: path.resolve(__dirname, "src/layouts/"),
      utils: path.resolve(__dirname, "src/utils/"),
      services: path.resolve(__dirname, "src/services/"),
      routes: path.resolve(__dirname, "src/routes/"),
      models: path.resolve(__dirname, "src/models/")
    },
    fallback: {
      path: require.resolve('path-browserify'),  // Polyfill for 'path'
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]_[local]-[hash:base64:5]"
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: theme()
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: theme()
            }
          }
        ],
        exclude: /src/
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  externals: {
    jquery: "jQuery"
  },
  devtool: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.(css|less)/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        LH_UI_VERSION: JSON.stringify(longhornVersion),
      }
    }),
    new ProgressBarPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: '[id].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.ejs"),
      filename: "index.html",
      hash: true
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    new ModuleFederationPlugin({
      name: "longhornUI",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/index.js",
        './Components': "./src/components/index.js",
        './DashboardComponents': "./src/routes/dashboard/components/index.js",
      },
      shared: {
        react: { singleton: true, eager: true},
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ]
};
