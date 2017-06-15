/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/6/15
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, `./demo/main.tsx`),
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'main.bundle.js',
    publicPath: '/'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          },
          {
            loader: 'tslint-loader',
            query: {
              configFile: path.resolve(__dirname, './tslintConfig.js')
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'postcss-loader']
        }),
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'main.bundle.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({}),
    new webpack.DefinePlugin({
      'globalEnv': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true),
        PLAT: JSON.stringify(process.env.PLAT)
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
