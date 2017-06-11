/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/6/11
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['webpack-hot-middleware/client?path=http://localhost:8888/__webpack_hmr&reload=true'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.ts',
    publicPath: '/dist/'
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
            loader: 'react-hot-loader/webpack'
          },
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

      // can't hot-load when use extract-text-webpack-plugin
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.glsl$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
//             emitFile: false
//             name: 'static/images/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 5000,
//             emitFile: false
//             name: 'static/font/[name].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({})
  ]
};
