const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATH_BUILD = path.join(__dirname, '..', 'build');
const PATH_PUBLIC = path.join(__dirname, '..', 'public')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
    stats: isDev ? 'errors-warnings' : 'normal',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        "@": path.resolve('./src'),
        'react-dom': '@hot-loader/react-dom',
      }
    },
    output: {
      path: PATH_BUILD,
      filename: '[name].[hash].bundle.js'
    },
    devtool: isDev ? 'cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/i,
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
                  'babel-plugin-styled-components',
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
            transpileOnly: true,
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
        template: path.join(PATH_PUBLIC, 'index.html'),
        favicon: path.join(PATH_PUBLIC, 'icon.svg'),
      }),
      // extracts CSS into separate files.
      // It creates a CSS file per JS file which contains CSS.
      new MiniCssExtractPlugin(),
      new ForkTsCheckerWebpackPlugin({
        async: true,
      }),
      ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
    }},
    devServer: {
      open: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
      contentBase: PATH_BUILD,
      proxy: {
        '/api': 'http://localhost:3001'
      },
      clientLogLevel: 'silent'
    }
  }
