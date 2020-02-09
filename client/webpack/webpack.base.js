const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATH_BUILD = path.join(__dirname, '..', 'build');

module.exports = isDev => {
  return {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
    stats: isDev ? 'errors-warnings' : 'normal',
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: PATH_BUILD,
      filename: '[name].[hash].bundle.js'
    },
    devtool: isDev ? 'eval' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: isDev
                ? [
                  '@babel/plugin-syntax-dynamic-import',
                  'react-hot-loader/babel'
                ]
                : ['@babel/plugin-syntax-dynamic-import'],
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in Fork TS Checker Webpack Plugin
            transpileOnly: true
          }
        }
      ]
    },
    plugins: [
      // clean build folder
      new CleanWebpackPlugin(),
      // cause hashes to be based on the relative path of the module
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '..', 'public', 'index.html')
      }),
      // extracts CSS into separate files.
      // It creates a CSS file per JS file which contains CSS.
      new MiniCssExtractPlugin(),
      ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),
      new ForkTsCheckerWebpackPlugin({
        async: true
      })
    ],
    // splits node_modules by package
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    },
    devServer: {
      open: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
      contentBase: PATH_BUILD,
      proxy: {
        '/api': 'http://localhost:3001'
      }
    }
  };
};
